package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id", unique = true)
    private String patientId;

    @Column(nullable = false)
    private String name;

    private Integer age;
    private String gender;
    private String dateOfBirth;
    private String phone;
    private String email;
    private String address;
    private String bloodGroup;
    private String emergencyContact;

    @Column(length = 1000)
    private String medicalHistory;

    private String lastVisit;
    private String status;
    private String insurance;
}