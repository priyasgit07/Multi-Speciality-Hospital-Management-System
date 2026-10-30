package com.hms.service;

import com.hms.entity.Department;
import com.hms.exception.BadRequestException;
import com.hms.exception.ConflictException;
import com.hms.exception.ResourceNotFoundException;
import com.hms.repository.DepartmentRepository;
import com.hms.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with ID: " + id));
    }

    @Transactional
    public Department saveDepartment(Department department) {
        if (department.getName() == null || department.getName().trim().isEmpty()) {
            throw new BadRequestException("Department name is required");
        }
        if (departmentRepository.existsByName(department.getName())) {
            throw new ConflictException("Department with name '" + department.getName() + "' already exists");
        }
        if (department.getBeds() == null) department.setBeds(0);
        if (department.getOccupancy() == null) department.setOccupancy(0);
        return departmentRepository.save(department);
    }

    @Transactional
    public Department updateDepartment(Long id, Department updatedData) {
        Department existing = getDepartmentById(id);

        if (updatedData.getName() != null && !updatedData.getName().trim().isEmpty()) {
            if (!existing.getName().equalsIgnoreCase(updatedData.getName()) && departmentRepository.existsByName(updatedData.getName())) {
                throw new ConflictException("Department name already in use");
            }
            existing.setName(updatedData.getName());
        }
        if (updatedData.getHead() != null) existing.setHead(updatedData.getHead());
        if (updatedData.getBeds() != null) existing.setBeds(updatedData.getBeds());
        if (updatedData.getOccupancy() != null) existing.setOccupancy(updatedData.getOccupancy());
        if (updatedData.getSpecialties() != null) existing.setSpecialties(updatedData.getSpecialties());

        return departmentRepository.save(existing);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id);

        if (doctorRepository.existsByDepartmentId(id)) {
            throw new ConflictException("Cannot delete department because doctors are assigned to it");
        }

        departmentRepository.delete(department);
    }
}
