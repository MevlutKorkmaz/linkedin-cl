package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendMessageRequest {

    @NotBlank(message = "Sender ID cannot be blank")
    private String senderId;

    @NotBlank(message = "Receiver ID cannot be blank")
    private String receiverId;

    @NotBlank(message = "Content cannot be blank")
    private String content;
}
