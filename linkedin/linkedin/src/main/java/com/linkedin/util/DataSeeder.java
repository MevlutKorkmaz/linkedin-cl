package com.linkedin.util;

import com.linkedin.model.*;
import com.linkedin.model.enums.Role;
import com.linkedin.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final AdminRepository adminRepo;
    private final JobRepository jobRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) {
            System.out.println("Seeder skipped: data already exists.");
            return;
        }



        // --- ADMIN ---
        Admin admin = Admin.builder()
                .name("Ezgi")
                .email("admin@platform.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build();
        adminRepo.save(admin);


        System.out.println("✔ Seeded 1 admin,");
    }




}
