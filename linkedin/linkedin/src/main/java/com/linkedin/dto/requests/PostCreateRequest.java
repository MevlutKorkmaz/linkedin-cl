package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class PostCreateRequest {
    @NotBlank
    private String userId;

    @NotBlank
    private String content;

    private List<String> imageIds;
    private boolean isPrivate;
    private String location;
}
