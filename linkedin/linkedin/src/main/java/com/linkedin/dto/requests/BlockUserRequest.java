package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlockUserRequest {
    @NotBlank
    private String userId;

    private boolean block; // true = block, false = unblock
}
