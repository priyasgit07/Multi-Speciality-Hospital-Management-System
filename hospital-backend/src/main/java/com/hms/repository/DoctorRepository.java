package com.hms.repository;

import com.hms.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmail(String email);
    List<Doctor> findByDepartment(String department);
    List<Doctor> findByDepartmentId(Long departmentId);
    List<Doctor> findByAvailable(Boolean available);
    boolean existsByDepartmentId(Long departmentId);
}
