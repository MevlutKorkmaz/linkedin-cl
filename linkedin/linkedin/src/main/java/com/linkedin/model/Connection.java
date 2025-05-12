package com.linkedin.model;

import com.linkedin.model.enums.ConnectionStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "connections")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Connection {
    @Id
    private String id;

    private String requesterId;
    private String receiverId;
    private ConnectionStatus status;

    private LocalDateTime requestedAt;
    private LocalDateTime respondedAt;
}
