package com.linkedin.dto.requests;

import lombok.Data;

@Data
public class DeleteEducationRequest {
    private String userId;
    private int index;
}
