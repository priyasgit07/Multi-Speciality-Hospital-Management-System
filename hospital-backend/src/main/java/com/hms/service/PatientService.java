package com.hms.service;

import com.hms.entity.Appointment;
import com.hms.entity.Patient;
import com.hms.exception.BadRequestException;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.MedicalRecordRepository;
import com.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public List<Patient> searchPatients(String search, String status) {
        if ((search == null || search.trim().isEmpty()) && (status == null || status.equals("All") || status.trim().isEmpty())) {
            return patientRepository.findAll();
        }
        return patientRepository.searchPatients(search, status);
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with ID: " + id));
    }

    public Patient getPatientByPatientId(String patientId) {
        return patientRepository.findByPatientId(patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with Patient ID: " + patientId));
    }

    @Transactional
    public Patient savePatient(Patient patient) {
        if (patient.getName() == null || patient.getName().trim().isEmpty()) {
            throw new BadRequestException("Patient name is required");
        }

        // Generate patientId if not provided or format correctly
        if (patient.getPatientId() == null || patient.getPatientId().trim().isEmpty()) {
            long count = patientRepository.count() + 1;
            String generatedId = String.format("P%03d", count);
            while (patientRepository.existsByPatientId(generatedId)) {
                count++;
                generatedId = String.format("P%03d", count);
            }
            patient.setPatientId(generatedId);
        }

        if (patient.getStatus() == null || patient.getStatus().trim().isEmpty()) {
            patient.setStatus("Active");
        }

        return patientRepository.save(patient);
    }

    @Transactional
    public Patient updatePatient(Long id, Patient updatedData) {
        Patient existing = getPatientById(id);

        if (updatedData.getName() != null && !updatedData.getName().trim().isEmpty()) {
            existing.setName(updatedData.getName());
        }
        if (updatedData.getAge() != null) {
            existing.setAge(updatedData.getAge());
        }
        if (updatedData.getGender() != null) {
            existing.setGender(updatedData.getGender());
        }
        if (updatedData.getDateOfBirth() != null) {
            existing.setDateOfBirth(updatedData.getDateOfBirth());
        }
        if (updatedData.getPhone() != null) {
            existing.setPhone(updatedData.getPhone());
        }
        if (updatedData.getEmail() != null) {
            existing.setEmail(updatedData.getEmail());
        }
        if (updatedData.getAddress() != null) {
            existing.setAddress(updatedData.getAddress());
        }
        if (updatedData.getBloodGroup() != null) {
            existing.setBloodGroup(updatedData.getBloodGroup());
        }
        if (updatedData.getEmergencyContact() != null) {
            existing.setEmergencyContact(updatedData.getEmergencyContact());
        }
        if (updatedData.getMedicalHistory() != null) {
            existing.setMedicalHistory(updatedData.getMedicalHistory());
        }
        if (updatedData.getLastVisit() != null) {
            existing.setLastVisit(updatedData.getLastVisit());
        }
        if (updatedData.getStatus() != null) {
            existing.setStatus(updatedData.getStatus());
        }
        if (updatedData.getInsurance() != null) {
            existing.setInsurance(updatedData.getInsurance());
        }

        return patientRepository.save(existing);
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);

        // Clean up associated appointments and medical records safely
        List<Appointment> appointments = appointmentRepository.findByPatientId(id);
        if (!appointments.isEmpty()) {
            appointmentRepository.deleteAll(appointments);
        }
        medicalRecordRepository.deleteByPatientId(id);

        patientRepository.delete(patient);
    }
}