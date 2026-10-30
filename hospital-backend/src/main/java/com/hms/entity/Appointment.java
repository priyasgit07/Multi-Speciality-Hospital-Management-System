package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appointments", indexes = {
    @Index(name = "idx_doctor_datetime", columnList = "doctor_id, date, time")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column(nullable = false)
    private String date; // YYYY-MM-DD

    @Column(nullable = false)
    private String time; // HH:mm

    @Builder.Default
    private String type = "Consultation";

    @Builder.Default
    private String status = "Scheduled"; // Scheduled, Confirmed, Completed, Cancelled

    private String reason;

    @Column(length = 1000)
    private String notes;
}
