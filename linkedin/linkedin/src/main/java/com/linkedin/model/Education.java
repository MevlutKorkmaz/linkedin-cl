package com.linkedin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {
    private String school;
    private String degree;
    private String field;
    private LocalDate startDate;
    private LocalDate endDate;
}

