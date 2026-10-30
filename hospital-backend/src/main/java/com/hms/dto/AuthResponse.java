package com.hms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private Long id;
    private String email;
    private String name;
    private String role;
    private String avatar;
    private String specialization;
    private Long departmentId;
}
