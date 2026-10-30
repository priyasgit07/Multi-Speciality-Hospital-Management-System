package com.hms.service;

import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.exception.BadRequestException;
import com.hms.exception.ConflictException;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> filterAppointments(Long doctorId, Long patientId, String date, String status) {
        return appointmentRepository.filterAppointments(doctorId, patientId, date, status);
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + id));
    }

    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Transactional
    public Appointment createAppointment(Appointment appointment) {
        validateAppointment(appointment, null);

        if (appointment.getStatus() == null || appointment.getStatus().trim().isEmpty()) {
            appointment.setStatus("Scheduled");
        }
        if (appointment.getType() == null || appointment.getType().trim().isEmpty()) {
            appointment.setType("Consultation");
        }

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment updateAppointment(Long id, Appointment updatedData) {
        Appointment existing = getAppointmentById(id);

        if (updatedData.getDoctorId() != null) existing.setDoctorId(updatedData.getDoctorId());
        if (updatedData.getPatientId() != null) existing.setPatientId(updatedData.getPatientId());
        if (updatedData.getDate() != null) existing.setDate(updatedData.getDate());
        if (updatedData.getTime() != null) existing.setTime(updatedData.getTime());
        if (updatedData.getType() != null) existing.setType(updatedData.getType());
        if (updatedData.getStatus() != null) existing.setStatus(updatedData.getStatus());
        if (updatedData.getReason() != null) existing.setReason(updatedData.getReason());
        if (updatedData.getNotes() != null) existing.setNotes(updatedData.getNotes());

        // Validate conflicts excluding current appointment id
        validateAppointment(existing, id);

        return appointmentRepository.save(existing);
    }

    @Transactional
    public Appointment cancelAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointment.setStatus("Cancelled");
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public void deleteAppointment(Long id) {
        Appointment appointment = getAppointmentById(id);
        appointmentRepository.delete(appointment);
    }

    private void validateAppointment(Appointment appointment, Long excludeId) {
        if (appointment.getPatientId() == null) {
            throw new BadRequestException("Patient ID is required");
        }
        if (!patientRepository.existsById(appointment.getPatientId())) {
            throw new ResourceNotFoundException("Patient not found with ID: " + appointment.getPatientId());
        }

        if (appointment.getDoctorId() == null) {
            throw new BadRequestException("Doctor ID is required");
        }
        Doctor doctor = doctorRepository.findById(appointment.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + appointment.getDoctorId()));

        if (Boolean.FALSE.equals(doctor.getAvailable())) {
            throw new BadRequestException("Dr. " + doctor.getName() + " is currently unavailable for appointments");
        }

        if (appointment.getDate() == null || appointment.getDate().trim().isEmpty()) {
            throw new BadRequestException("Appointment date is required");
        }
        if (appointment.getTime() == null || appointment.getTime().trim().isEmpty()) {
            throw new BadRequestException("Appointment time is required");
        }

        // Server-side conflict check: doctor cannot have two active appointments at the same date and time
        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                appointment.getDoctorId(),
                appointment.getDate(),
                appointment.getTime(),
                excludeId
        );

        if (!conflicts.isEmpty()) {
            throw new ConflictException("Dr. " + doctor.getName() + " is already booked for " +
                    appointment.getDate() + " at " + appointment.getTime() + ". Please select another time slot.");
        }
    }
}
