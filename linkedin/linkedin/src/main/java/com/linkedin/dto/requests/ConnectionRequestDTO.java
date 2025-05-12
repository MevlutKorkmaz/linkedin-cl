package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConnectionRequestDTO {
    @NotBlank
    private String requesterId;

    @NotBlank
    private String receiverId;
}
