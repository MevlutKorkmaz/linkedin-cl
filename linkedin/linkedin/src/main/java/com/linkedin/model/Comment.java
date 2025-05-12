package com.linkedin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "comments")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Comment {
    @Id
    private String id;

    private String postId;
    private String userId;
    private String content;
    private List<String> likedByUserIds;

    private LocalDateTime createdAt;
}
