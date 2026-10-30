package com.hms;

import com.hms.entity.Patient;
import com.hms.exception.BadRequestException;
import com.hms.repository.PatientRepository;
import com.hms.service.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class PatientServiceTest {

    @Autowired
    private PatientService patientService;

    @Autowired
    private PatientRepository patientRepository;

    @Test
    void testSavePatientAutoGeneratesPatientId() {
        Patient patient = Patient.builder()
                .name("Alice Wonder")
                .age(28)
                .gender("Female")
                .phone("555-0199")
                .email("alice@test.com")
                .build();

        Patient saved = patientService.savePatient(patient);
        assertNotNull(saved.getId());
        assertNotNull(saved.getPatientId());
        assertTrue(saved.getPatientId().startsWith("P"));
        assertEquals("Active", saved.getStatus());
    }

    @Test
    void testSavePatientValidation() {
        Patient emptyName = Patient.builder().name("").build();
        assertThrows(BadRequestException.class, () -> patientService.savePatient(emptyName));
    }

    @Test
    void testUpdatePatient() {
        Patient patient = patientService.savePatient(Patient.builder()
                .name("Bob Builder")
                .age(40)
                .gender("Male")
                .phone("555-0123")
                .email("bob@test.com")
                .build());

        Patient updateData = Patient.builder()
                .name("Robert Builder")
                .phone("555-9999")
                .status("Inactive")
                .build();

        Patient updated = patientService.updatePatient(patient.getId(), updateData);
        assertEquals("Robert Builder", updated.getName());
        assertEquals("555-9999", updated.getPhone());
        assertEquals("Inactive", updated.getStatus());
        assertEquals(40, updated.getAge()); // preserved
    }

    @Test
    void testDeletePatient() {
        Patient patient = patientService.savePatient(Patient.builder()
                .name("Charlie Delete")
                .age(50)
                .build());

        Long id = patient.getId();
        patientService.deletePatient(id);
        assertFalse(patientRepository.existsById(id));
    }
}
