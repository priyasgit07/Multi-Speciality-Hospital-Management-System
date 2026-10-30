package com.hms.dto;

import lombok.*;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {
    private long totalPatients;
    private long activePatients;
    private long totalDoctors;
    private long activeDoctors;
    private long totalDepartments;
    private long todayAppointments;
    private long totalAppointments;
    private Map<String, Long> appointmentsByStatus;
}
