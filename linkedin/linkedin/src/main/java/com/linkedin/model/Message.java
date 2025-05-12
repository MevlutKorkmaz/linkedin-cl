package com.linkedin.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    private String id;

    private String senderId;
    private String receiverId;

    private String content;
    private boolean isSeen;
    private LocalDateTime sentAt;
}
