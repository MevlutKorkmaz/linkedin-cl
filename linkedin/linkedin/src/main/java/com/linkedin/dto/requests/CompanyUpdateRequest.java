package com.linkedin.dto.requests;

import lombok.Data;

@Data
public class CompanyUpdateRequest {
    private String companyName;
    private String description;
    private String website;
    private String profilePhotoId;
}
