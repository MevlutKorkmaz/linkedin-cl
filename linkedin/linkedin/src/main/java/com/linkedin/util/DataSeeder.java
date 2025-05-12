package com.linkedin.util;

import com.linkedin.model.*;
import com.linkedin.model.enums.ConnectionStatus;
import com.linkedin.model.enums.Role;
import com.linkedin.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final CompanyRepository companyRepo;
    private final AdminRepository adminRepo;
    private final PostRepository postRepo;
    private final JobRepository jobRepo;
    private final ConnectionRepository connectionRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0 || companyRepo.count() > 0) {
            System.out.println("Seeder skipped: data already exists.");
            return;
        }

        // --- USERS ---
        User user1 = User.builder()
                .firstName("Ali")
                .lastName("Tarımcı")
                .email("ali@example.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.USER)
                .bio("Farmer and content creator")
                .skills(List.of("Irrigation", "Crop rotation"))
                .createdAt(LocalDateTime.now())
                .build();

        User user2 = User.builder()
                .firstName("Zeynep")
                .lastName("Çiftçi")
                .email("zeynep@example.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.USER)
                .bio("Organic agriculture specialist")
                .skills(List.of("Permaculture", "Composting"))
                .createdAt(LocalDateTime.now())
                .build();

        userRepo.saveAll(List.of(user1, user2));

        // --- COMPANIES ---
        Company company1 = Company.builder()
                .companyName("AgriTech Inc.")
                .email("agritech@example.com")
                .password(passwordEncoder.encode("password"))
                .role(Role.COMPANY)
                .description("Innovative solutions for smart farming.")
                .createdAt(LocalDateTime.now())
                .build();

        companyRepo.save(company1);

        // --- ADMIN ---
        Admin admin = Admin.builder()
                .name("Ezgi")
                .email("admin@platform.com")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build();

        adminRepo.save(admin);

        // --- POSTS ---
        Post post1 = Post.builder()
                .userId(user1.getId())
                .content("Check out my greenhouse setup!")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .likedByUserIds(List.of(user2.getId()))
                .commentIds(List.of())
                .build();

        postRepo.save(post1);

        // --- JOBS ---
        Job job1 = Job.builder()
                .companyId(company1.getId())
                .title("Field Technician")
                .description("Responsible for deploying sensors in the field.")
                .location("Konya, Turkey")
                .category("Technology")
                .isRemote(false)
                .postedAt(LocalDateTime.now())
                .build();

        jobRepo.save(job1);

        // --- CONNECTIONS ---
        Connection connection = Connection.builder()
                .requesterId(user1.getId())
                .receiverId(user2.getId())
                .status(ConnectionStatus.ACCEPTED)
                .requestedAt(LocalDateTime.now().minusDays(2))
                .respondedAt(LocalDateTime.now().minusDays(1))
                .build();

        connectionRepo.save(connection);

        System.out.println("✔ Sample data seeded.");
    }
}
