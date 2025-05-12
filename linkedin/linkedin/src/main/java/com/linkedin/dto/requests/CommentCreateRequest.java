package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentCreateRequest {
    @NotBlank
    private String postId;

    @NotBlank
    private String userId;

    @NotBlank
    private String content;
}
