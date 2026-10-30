package com.hms.service;

import com.hms.entity.MedicalRecord;
import com.hms.exception.BadRequestException;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.DoctorRepository;
import com.hms.repository.MedicalRecordRepository;
import com.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<MedicalRecord> getAllRecords() {
        return medicalRecordRepository.findAll();
    }

    public List<MedicalRecord> getRecordsByPatientId(Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId);
    }

    public MedicalRecord getRecordById(Long id) {
        return medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with ID: " + id));
    }

    @Transactional
    public MedicalRecord createRecord(MedicalRecord record) {
        if (record.getPatientId() == null) {
            throw new BadRequestException("Patient ID is required");
        }
        if (!patientRepository.existsById(record.getPatientId())) {
            throw new ResourceNotFoundException("Patient not found with ID: " + record.getPatientId());
        }

        if (record.getDiagnosis() == null || record.getDiagnosis().trim().isEmpty()) {
            throw new BadRequestException("Diagnosis is required");
        }

        if (record.getDate() == null || record.getDate().trim().isEmpty()) {
            record.setDate(LocalDate.now().toString());
        }

        if (record.getDoctorId() != null && (record.getDepartment() == null || record.getDepartment().trim().isEmpty())) {
            doctorRepository.findById(record.getDoctorId()).ifPresent(doc -> record.setDepartment(doc.getDepartment()));
        }

        return medicalRecordRepository.save(record);
    }

    @Transactional
    public MedicalRecord updateRecord(Long id, MedicalRecord updatedData) {
        MedicalRecord existing = getRecordById(id);

        if (updatedData.getDiagnosis() != null) existing.setDiagnosis(updatedData.getDiagnosis());
        if (updatedData.getTreatment() != null) existing.setTreatment(updatedData.getTreatment());
        if (updatedData.getPrescription() != null) existing.setPrescription(updatedData.getPrescription());
        if (updatedData.getVisitNotes() != null) existing.setVisitNotes(updatedData.getVisitNotes());
        if (updatedData.getDepartment() != null) existing.setDepartment(updatedData.getDepartment());

        return medicalRecordRepository.save(existing);
    }

    @Transactional
    public void deleteRecord(Long id) {
        MedicalRecord record = getRecordById(id);
        medicalRecordRepository.delete(record);
    }
}
