package com.hms.service;

import com.hms.entity.Doctor;
import com.hms.exception.BadRequestException;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with ID: " + id));
    }

    public List<Doctor> getDoctorsByDepartment(String department) {
        return doctorRepository.findByDepartment(department);
    }

    public List<Doctor> getAvailableDoctors() {
        return doctorRepository.findByAvailable(true);
    }

    @Transactional
    public Doctor saveDoctor(Doctor doctor) {
        if (doctor.getName() == null || doctor.getName().trim().isEmpty()) {
            throw new BadRequestException("Doctor name is required");
        }
        if (doctor.getAvailable() == null) {
            doctor.setAvailable(true);
        }
        return doctorRepository.save(doctor);
    }

    @Transactional
    public Doctor updateDoctor(Long id, Doctor updatedData) {
        Doctor existing = getDoctorById(id);

        if (updatedData.getName() != null) existing.setName(updatedData.getName());
        if (updatedData.getSpecialization() != null) existing.setSpecialization(updatedData.getSpecialization());
        if (updatedData.getDepartment() != null) existing.setDepartment(updatedData.getDepartment());
        if (updatedData.getDepartmentId() != null) existing.setDepartmentId(updatedData.getDepartmentId());
        if (updatedData.getAvailable() != null) existing.setAvailable(updatedData.getAvailable());
        if (updatedData.getPhone() != null) existing.setPhone(updatedData.getPhone());
        if (updatedData.getEmail() != null) existing.setEmail(updatedData.getEmail());
        if (updatedData.getSchedule() != null) existing.setSchedule(updatedData.getSchedule());

        return doctorRepository.save(existing);
    }

    @Transactional
    public Doctor updateAvailability(Long id, Boolean available) {
        Doctor doctor = getDoctorById(id);
        doctor.setAvailable(available);
        return doctorRepository.save(doctor);
    }

    @Transactional
    public void deleteDoctor(Long id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }
}
