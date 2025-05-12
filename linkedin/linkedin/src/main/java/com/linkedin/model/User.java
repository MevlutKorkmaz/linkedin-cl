package com.linkedin.model;

import com.linkedin.model.enums.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    private String profilePhotoId; // image reference
    private String bio;
    private List<String> skills;
    private List<Experience> experiences;
    private List<Education> education;
    private List<String> accomplishmentIds;
    private List<String> recommendationIds;

    private List<String> connectionIds;
    private List<String> messageIds;
    private List<String> postIds;

    private Role role = Role.USER;
    private boolean isActive = true;
    private LocalDateTime createdAt;
}
