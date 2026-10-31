package com.hms.config;

import com.hms.entity.*;
import com.hms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Component

public class DataInitializer implements CommandLineRunner {

    @Value("${app.enable-demo-accounts:false}")
    private boolean enableDemoAccounts;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!enableDemoAccounts) {
            return;
        }
        seedUsers();
        seedDepartments();
        seedDoctors();
        seedPatients();
        seedAppointments();
        seedMedicalRecords();
    }

    
private void seedUsers() {

    if (!userRepository.existsByEmail("admin@hospital.com")) {
        User admin = User.builder()
                .email("admin@hospital.com")
                .password(passwordEncoder.encode("admin123"))
                .name("Dr. Administrator")
                .role("ADMIN")
                .avatar("https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face")
                .build();

        userRepository.save(admin);
    }

    if (!userRepository.existsByEmail("doctor@hospital.com")) {
        User doctor = User.builder()
                .email("doctor@hospital.com")
                .password(passwordEncoder.encode("doctor123"))
                .name("Dr. Michael Chen")
                .role("DOCTOR")
                .specialization("Interventional Cardiology")
                .departmentId(1L)
                .avatar("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face")
                .build();

        userRepository.save(doctor);
    }

    if (!userRepository.existsByEmail("receptionist@hospital.com")) {
        User receptionist = User.builder()
                .email("receptionist@hospital.com")
                .password(passwordEncoder.encode("reception123"))
                .name("Sarah Wilson")
                .role("RECEPTIONIST")
                .avatar("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face")
                .build();

        userRepository.save(receptionist);
    }
}


    private void seedDepartments() {
        if (departmentRepository.count() == 0) {
            List<Department> departments = Arrays.asList(
                Department.builder().name("Cardiology").head("Dr. Michael Chen").beds(25).occupancy(18)
                    .specialties(Arrays.asList("Interventional Cardiology", "Electrophysiology", "Cardiac Surgery")).build(),
                Department.builder().name("Neurology").head("Dr. Emily Rodriguez").beds(20).occupancy(12)
                    .specialties(Arrays.asList("Stroke Care", "Epilepsy", "Movement Disorders")).build(),
                Department.builder().name("Orthopedics").head("Dr. David Wilson").beds(30).occupancy(22)
                    .specialties(Arrays.asList("Joint Replacement", "Sports Medicine", "Spine Surgery")).build(),
                Department.builder().name("Emergency").head("Dr. Lisa Park").beds(15).occupancy(8)
                    .specialties(Arrays.asList("Trauma Care", "Critical Care", "Emergency Medicine")).build(),
                Department.builder().name("Pediatrics").head("Dr. Maria Garcia").beds(35).occupancy(28)
                    .specialties(Arrays.asList("General Pediatrics", "Pediatric Cardiology", "Neonatology")).build(),
                Department.builder().name("Gynecology").head("Dr. Jennifer Brown").beds(28).occupancy(19)
                    .specialties(Arrays.asList("Obstetrics", "Gynecologic Oncology", "Reproductive Medicine")).build(),
                Department.builder().name("General Medicine").head("Dr. Thomas Anderson").beds(40).occupancy(32)
                    .specialties(Arrays.asList("Internal Medicine", "Family Medicine", "Geriatrics")).build(),
                Department.builder().name("Radiology").head("Dr. Steven Clark").beds(8).occupancy(5)
                    .specialties(Arrays.asList("Diagnostic Radiology", "Interventional Radiology", "Nuclear Medicine")).build(),
                Department.builder().name("ICU").head("Dr. Daniel Harris").beds(20).occupancy(16)
                    .specialties(Arrays.asList("Critical Care Medicine", "Pulmonary Critical Care", "Cardiac ICU")).build(),
                Department.builder().name("Laboratory").head("Dr. Christopher Young").beds(0).occupancy(0)
                    .specialties(Arrays.asList("Clinical Pathology", "Hematology", "Microbiology")).build()
            );
            departmentRepository.saveAll(departments);
        }
    }

    private void seedDoctors() {
        if (doctorRepository.count() == 0) {
            List<Doctor> doctors = Arrays.asList(
                Doctor.builder().name("Michael Chen").specialization("Interventional Cardiology").department("Cardiology")
                    .departmentId(1L).available(true).phone("+1 (555) 111-2222").email("doctor@hospital.com")
                    .schedule(Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")).build(),
                Doctor.builder().name("Sarah Williams").specialization("Electrophysiology").department("Cardiology")
                    .departmentId(1L).available(true).phone("+1 (555) 111-2223").email("swilliams@hospital.com")
                    .schedule(Arrays.asList("Monday", "Wednesday", "Friday")).build(),
                Doctor.builder().name("Emily Rodriguez").specialization("Stroke Care").department("Neurology")
                    .departmentId(2L).available(true).phone("+1 (555) 333-4444").email("erodriguez@hospital.com")
                    .schedule(Arrays.asList("Monday", "Wednesday", "Friday")).build(),
                Doctor.builder().name("James Thompson").specialization("Epilepsy").department("Neurology")
                    .departmentId(2L).available(false).phone("+1 (555) 333-4445").email("jthompson@hospital.com")
                    .schedule(Arrays.asList("Tuesday", "Thursday", "Saturday")).build(),
                Doctor.builder().name("David Wilson").specialization("Joint Replacement").department("Orthopedics")
                    .departmentId(3L).available(true).phone("+1 (555) 555-6666").email("dwilson@hospital.com")
                    .schedule(Arrays.asList("Tuesday", "Thursday", "Saturday")).build(),
                Doctor.builder().name("Lisa Park").specialization("Emergency Medicine").department("Emergency")
                    .departmentId(4L).available(true).phone("+1 (555) 777-8888").email("lpark@hospital.com")
                    .schedule(Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")).build(),
                Doctor.builder().name("Maria Garcia").specialization("General Pediatrics").department("Pediatrics")
                    .departmentId(5L).available(true).phone("+1 (555) 999-1111").email("mgarcia@hospital.com")
                    .schedule(Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")).build(),
                Doctor.builder().name("Thomas Anderson").specialization("Internal Medicine").department("General Medicine")
                    .departmentId(7L).available(true).phone("+1 (555) 444-5555").email("tanderson@hospital.com")
                    .schedule(Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")).build()
            );
            doctorRepository.saveAll(doctors);
        }
    }

    private void seedPatients() {
        if (patientRepository.count() <= 3) {
            // If only preliminary rows exist or empty, ensure standard complete demo patients exist
            if (!patientRepository.existsByPatientId("P001")) {
                patientRepository.save(Patient.builder()
                        .patientId("P001")
                        .name("John Smith")
                        .age(45)
                        .gender("Male")
                        .phone("+1 (555) 123-4567")
                        .email("john.smith@email.com")
                        .address("123 Main St, City, State 12345")
                        .bloodGroup("O+")
                        .emergencyContact("Jane Smith - +1 (555) 987-6543")
                        .medicalHistory("Hypertension, Diabetes Type 2")
                        .lastVisit("2024-01-15")
                        .status("Active")
                        .dateOfBirth("1979-03-15")
                        .insurance("Blue Cross Blue Shield")
                        .build());
            }
            if (!patientRepository.existsByPatientId("P002")) {
                patientRepository.save(Patient.builder()
                        .patientId("P002")
                        .name("Sarah Johnson")
                        .age(32)
                        .gender("Female")
                        .phone("+1 (555) 234-5678")
                        .email("sarah.johnson@email.com")
                        .address("456 Oak Ave, City, State 12345")
                        .bloodGroup("A+")
                        .emergencyContact("Mike Johnson - +1 (555) 876-5432")
                        .medicalHistory("Asthma, Allergies (Peanuts)")
                        .lastVisit("2024-01-20")
                        .status("Active")
                        .dateOfBirth("1992-07-22")
                        .insurance("Aetna")
                        .build());
            }
        }
    }

    private void seedAppointments() {
        if (appointmentRepository.count() == 0) {
            List<Patient> patients = patientRepository.findAll();
            List<Doctor> doctors = doctorRepository.findAll();
            if (!patients.isEmpty() && !doctors.isEmpty()) {
                String today = LocalDate.now().toString();
                Appointment apt1 = Appointment.builder()
                        .patientId(patients.get(0).getId())
                        .doctorId(doctors.get(0).getId())
                        .date(today)
                        .time("10:00")
                        .type("Consultation")
                        .status("Scheduled")
                        .reason("Regular cardiac checkup")
                        .notes("Follow-up on blood pressure")
                        .build();

                Appointment apt2 = Appointment.builder()
                        .patientId(patients.size() > 1 ? patients.get(1).getId() : patients.get(0).getId())
                        .doctorId(doctors.get(0).getId())
                        .date(today)
                        .time("14:30")
                        .type("Follow-up")
                        .status("Confirmed")
                        .reason("Asthma review")
                        .notes("Inhaler prescription review")
                        .build();

                appointmentRepository.saveAll(Arrays.asList(apt1, apt2));
            }
        }
    }

    private void seedMedicalRecords() {
        if (medicalRecordRepository.count() == 0) {
            List<Patient> patients = patientRepository.findAll();
            List<Doctor> doctors = doctorRepository.findAll();
            if (!patients.isEmpty() && !doctors.isEmpty()) {
                MedicalRecord record = MedicalRecord.builder()
                        .patientId(patients.get(0).getId())
                        .doctorId(doctors.get(0).getId())
                        .date(LocalDate.now().minusDays(5).toString())
                        .diagnosis("Hypertension monitoring")
                        .treatment("Blood pressure medication adjustment")
                        .prescription("Lisinopril 10mg daily")
                        .visitNotes("Patient responding well to treatment. BP measured 128/82.")
                        .department("Cardiology")
                        .build();
                medicalRecordRepository.save(record);
            }
        }
    }
}
