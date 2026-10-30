package com.hms.repository;

import com.hms.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByDate(String date);

    List<Appointment> findByStatus(String status);

    // Conflict detection: checks if another appointment exists for the same doctor, date, and time that is NOT cancelled
    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId AND a.date = :date AND a.time = :time AND a.status <> 'Cancelled' AND (:excludeId IS NULL OR a.id <> :excludeId)")
    List<Appointment> findConflictingAppointments(
        @Param("doctorId") Long doctorId,
        @Param("date") String date,
        @Param("time") String time,
        @Param("excludeId") Long excludeId
    );

    @Query("SELECT a FROM Appointment a WHERE " +
           "(:doctorId IS NULL OR a.doctorId = :doctorId) AND " +
           "(:patientId IS NULL OR a.patientId = :patientId) AND " +
           "(:date IS NULL OR a.date = :date) AND " +
           "(:status IS NULL OR :status = 'All' OR LOWER(a.status) = LOWER(:status))")
    List<Appointment> filterAppointments(
        @Param("doctorId") Long doctorId,
        @Param("patientId") Long patientId,
        @Param("date") String date,
        @Param("status") String status
    );

    long countByDate(String date);

    long countByStatus(String status);
}
