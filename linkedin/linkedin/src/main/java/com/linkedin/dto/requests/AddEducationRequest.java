package com.linkedin.dto.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddEducationRequest {
    private String userId;
    private String school;
    private String degree;
    private String field;
    private LocalDate startDate;
    private LocalDate endDate;
}
