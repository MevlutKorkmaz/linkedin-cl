package com.linkedin.dto.responses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CompanyProfileResponse {
    private String id;
    private String companyName;
    private String description;
    private String website;
    private String profilePhotoId;
}
