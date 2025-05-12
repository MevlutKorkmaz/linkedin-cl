package com.linkedin.dto.requests;

import lombok.Data;

@Data
public class DeleteExperienceRequest {
    private String userId;
    private int index;
}
