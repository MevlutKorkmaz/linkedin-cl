package com.linkedin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    private String id;

    private String userId;
    private String content;
    private List<String> imageIds; // image references

    private List<String> likedByUserIds;
    private List<String> sharedByUserIds;
    private List<String> commentIds;

    private boolean isPrivate;
    private String location;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
