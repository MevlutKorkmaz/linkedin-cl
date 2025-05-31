package com.linkedin.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummaryDTO {
    private String userId;

    private String firstName;
    private String lastName;
}
