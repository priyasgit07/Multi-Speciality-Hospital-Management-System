package com.hms.service;

import com.hms.dto.DashboardStatsDto;
import com.hms.entity.Appointment;
import com.hms.entity.Patient;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DepartmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public DashboardStatsDto getDashboardStats() {
        List<Patient> allPatients = patientRepository.findAll();
        long totalPatients = allPatients.size();
        long activePatients = allPatients.stream()
                .filter(p -> "Active".equalsIgnoreCase(p.getStatus()))
                .count();

        long totalDoctors = doctorRepository.count();
        long activeDoctors = doctorRepository.findByAvailable(true).size();
        long totalDepartments = departmentRepository.count();

        String today = LocalDate.now().toString();
        long todayAppointments = appointmentRepository.countByDate(today);
        long totalAppointments = appointmentRepository.count();

        List<Appointment> appointments = appointmentRepository.findAll();
        Map<String, Long> statusCounts = new HashMap<>();
        for (Appointment apt : appointments) {
            String status = apt.getStatus() != null ? apt.getStatus() : "Scheduled";
            statusCounts.put(status, statusCounts.getOrDefault(status, 0L) + 1);
        }

        return DashboardStatsDto.builder()
                .totalPatients(totalPatients)
                .activePatients(activePatients)
                .totalDoctors(totalDoctors)
                .activeDoctors(activeDoctors)
                .totalDepartments(totalDepartments)
                .todayAppointments(todayAppointments)
                .totalAppointments(totalAppointments)
                .appointmentsByStatus(statusCounts)
                .build();
    }
}
