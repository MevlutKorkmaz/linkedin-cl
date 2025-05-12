package com.linkedin.service;

import com.linkedin.dto.requests.LoginRequest;
import com.linkedin.dto.requests.RegisterRequest;
import com.linkedin.dto.responses.AuthResponse;
import com.linkedin.model.*;
import com.linkedin.model.enums.Role;
import com.linkedin.repository.*;
import com.linkedin.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final CompanyRepository companyRepo;
    private final AdminRepository adminRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        Role role = Role.valueOf(request.getRole().toUpperCase());
        String encodedPassword = passwordEncoder.encode(request.getPassword());

        if (role == Role.USER) {
            if (userRepo.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email is already registered.");
            }

            User user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(encodedPassword)
                    .role(role)
                    .createdAt(LocalDateTime.now())
                    .isActive(true)
                    .build();

            userRepo.save(user);
            return new AuthResponse(jwtUtil.generateToken(user), user.getId(), role.name());
        }

        if (role == Role.COMPANY) {
            if (companyRepo.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email is already registered.");
            }

            Company company = Company.builder()
                    .companyName(request.getFirstName() + " " + request.getLastName()) // Or use dedicated field
                    .email(request.getEmail())
                    .password(encodedPassword)
                    .role(role)
                    .createdAt(LocalDateTime.now())
                    .isActive(true)
                    .build();

            companyRepo.save(company);
            return new AuthResponse(jwtUtil.generateToken(company), company.getId(), role.name());
        }

        throw new IllegalArgumentException("Admin registration not allowed here");
    }

    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        var user = userRepo.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return new AuthResponse(jwtUtil.generateToken(user), user.getId(), user.getRole().name());
        }

        var company = companyRepo.findByEmail(email);
        if (company != null && passwordEncoder.matches(password, company.getPassword())) {
            return new AuthResponse(jwtUtil.generateToken(company), company.getId(), company.getRole().name());
        }

        var admin = adminRepo.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return new AuthResponse(jwtUtil.generateToken(admin), admin.getId(), admin.getRole().name());
        }

        throw new RuntimeException("Invalid credentials");
    }
}
