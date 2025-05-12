package com.linkedin.dto.requests;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UpdateExperienceRequest {
    private String userId;
    private int index;
    private String companyName;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
