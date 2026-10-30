package com.hms;

import com.hms.entity.Appointment;
import com.hms.entity.Doctor;
import com.hms.entity.Patient;
import com.hms.exception.ConflictException;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import com.hms.service.AppointmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AppointmentServiceTest {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private Patient patient;
    private Doctor doctor;

    @BeforeEach
    void setup() {
        patient = patientRepository.save(Patient.builder()
                .patientId("P999")
                .name("Test Patient")
                .age(30)
                .gender("Male")
                .phone("1234567890")
                .email("testpatient@hospital.com")
                .status("Active")
                .build());

        doctor = doctorRepository.save(Doctor.builder()
                .name("Test Doctor")
                .specialization("General")
                .department("Medicine")
                .available(true)
                .email("testdoc@hospital.com")
                .build());
    }

    @Test
    void testCreateAppointmentSuccess() {
        Appointment appointment = Appointment.builder()
                .patientId(patient.getId())
                .doctorId(doctor.getId())
                .date("2026-11-01")
                .time("10:00")
                .reason("Regular Checkup")
                .build();

        Appointment saved = appointmentService.createAppointment(appointment);
        assertNotNull(saved.getId());
        assertEquals("Scheduled", saved.getStatus());
        assertEquals("Consultation", saved.getType());
    }

    @Test
    void testConflictPreventionSameDoctorDateTime() {
        Appointment apt1 = Appointment.builder()
                .patientId(patient.getId())
                .doctorId(doctor.getId())
                .date("2026-11-01")
                .time("10:00")
                .build();

        appointmentService.createAppointment(apt1);

        // Attempting to book the same doctor at the same date and time slot
        Appointment apt2 = Appointment.builder()
                .patientId(patient.getId())
                .doctorId(doctor.getId())
                .date("2026-11-01")
                .time("10:00")
                .build();

        assertThrows(ConflictException.class, () -> appointmentService.createAppointment(apt2));
    }

    @Test
    void testCancelAppointmentAllowsNewBooking() {
        Appointment apt1 = Appointment.builder()
                .patientId(patient.getId())
                .doctorId(doctor.getId())
                .date("2026-11-02")
                .time("11:00")
                .build();

        Appointment saved = appointmentService.createAppointment(apt1);
        appointmentService.cancelAppointment(saved.getId());

        // Since apt1 is cancelled, a new appointment at the same slot should now be permitted
        Appointment apt2 = Appointment.builder()
                .patientId(patient.getId())
                .doctorId(doctor.getId())
                .date("2026-11-02")
                .time("11:00")
                .build();

        Appointment rebooked = appointmentService.createAppointment(apt2);
        assertNotNull(rebooked.getId());
    }
}
