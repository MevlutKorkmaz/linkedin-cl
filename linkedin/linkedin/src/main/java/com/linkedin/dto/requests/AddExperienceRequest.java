package com.linkedin.dto.requests;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddExperienceRequest {
    private String userId;
    private String companyName;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
