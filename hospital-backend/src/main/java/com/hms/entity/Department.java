package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String head;

    @Builder.Default
    private Integer beds = 0;

    @Builder.Default
    private Integer occupancy = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "department_specialties", joinColumns = @JoinColumn(name = "department_id"))
    @Column(name = "specialty")
    private List<String> specialties;
}
