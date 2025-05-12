package com.linkedin.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobCreateRequest {
    @NotBlank
    private String companyId;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String location;
    private String category;
    private boolean isRemote;
}
