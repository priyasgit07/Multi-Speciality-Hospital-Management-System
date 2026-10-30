package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medical_records", indexes = {
    @Index(name = "idx_patient_records", columnList = "patient_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private String diagnosis;

    @Column(length = 1000)
    private String treatment;

    @Column(length = 1000)
    private String prescription;

    @Column(name = "visit_notes", length = 1000)
    private String visitNotes;

    private String department;
}
