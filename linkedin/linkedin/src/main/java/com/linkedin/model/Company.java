package com.linkedin.model;

import com.linkedin.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {
    @Id
    private String id;
    private String companyName;
    private String email;
    private String password;

    private String logoImageId;
    private String description;
    private List<String> jobIds;

    private Role role = Role.COMPANY;
    private boolean isActive = true;
    private LocalDateTime createdAt;
}

