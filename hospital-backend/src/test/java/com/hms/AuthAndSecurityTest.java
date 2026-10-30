package com.hms;

import com.hms.dto.AuthResponse;
import com.hms.dto.LoginRequest;
import com.hms.dto.RegisterRequest;
import com.hms.exception.BadRequestException;
import com.hms.service.AuthService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class AuthAndSecurityTest {

    @Autowired
    private AuthService authService;

    @AfterEach
    void cleanSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void testRegisterAndLoginFlow() {
        // Public registration defaults to / permits PATIENT role
        RegisterRequest registerRequest = RegisterRequest.builder()
                .name("Jane Patient")
                .email("patient.test@hospital.com")
                .password("securePassword123")
                .role("PATIENT")
                .build();

        AuthResponse regResponse = authService.register(registerRequest);
        assertNotNull(regResponse.getToken());
        assertEquals("patient.test@hospital.com", regResponse.getEmail());
        assertEquals("patient", regResponse.getRole());

        // Test Login with correct credentials
        LoginRequest loginRequest = new LoginRequest("patient.test@hospital.com", "securePassword123");
        AuthResponse loginResponse = authService.login(loginRequest);
        assertNotNull(loginResponse.getToken());
        assertEquals("patient.test@hospital.com", loginResponse.getEmail());
    }

    @Test
    void testPublicRegistrationCannotRegisterAsPrivilegedRole() {
        // Unauthenticated caller attempting to register as ADMIN or DOCTOR must be rejected
        RegisterRequest adminRequest = RegisterRequest.builder()
                .name("Malicious User")
                .email("attacker@hospital.com")
                .password("attackPassword123")
                .role("ADMIN")
                .build();

        assertThrows(BadRequestException.class, () -> authService.register(adminRequest));

        RegisterRequest doctorRequest = RegisterRequest.builder()
                .name("Fake Doctor")
                .email("fakedoc@hospital.com")
                .password("attackPassword123")
                .role("DOCTOR")
                .build();

        assertThrows(BadRequestException.class, () -> authService.register(doctorRequest));
    }

    @Test
    void testAdminCanRegisterPrivilegedRoles() {
        // Mock authenticated ADMIN
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "admin@hospital.com",
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
                )
        );

        RegisterRequest doctorRequest = RegisterRequest.builder()
                .name("Dr. Valid Registration")
                .email("validdoc@hospital.com")
                .password("docPass1234")
                .role("DOCTOR")
                .specialization("Cardiology")
                .build();

        AuthResponse regResponse = authService.register(doctorRequest);
        assertNotNull(regResponse.getToken());
        assertEquals("validdoc@hospital.com", regResponse.getEmail());
        assertEquals("doctor", regResponse.getRole());
    }

    @Test
    void testLoginWithInvalidPasswordFails() {
        LoginRequest badRequest = new LoginRequest("admin@hospital.com", "wrongPassword");
        assertThrows(BadCredentialsException.class, () -> authService.login(badRequest));
    }
}
