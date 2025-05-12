package com.linkedin.dto.requests;

import lombok.Data;

import java.util.List;

@Data
public class UpdateProfileRequest {
    private String userId;
    private String bio;
    private String profilePhotoId;
    private List<String> skills;
}
