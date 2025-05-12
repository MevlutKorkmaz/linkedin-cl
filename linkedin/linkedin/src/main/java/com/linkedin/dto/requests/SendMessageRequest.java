package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendMessageRequest {
    @NotBlank
    private String senderId;

    @NotBlank
    private String receiverId;

    @NotBlank
    private String content;
}
