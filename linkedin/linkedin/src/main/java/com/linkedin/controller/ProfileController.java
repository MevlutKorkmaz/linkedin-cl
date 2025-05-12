package com.linkedin.controller;

import com.linkedin.dto.requests.*;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.User;
import com.linkedin.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<User>> update(@Valid @RequestBody UpdateProfileRequest request) {
        User updated = profileService.updateBasicInfo(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Profile updated", updated));
    }

    @PostMapping("/experience")
    public ResponseEntity<ApiResponse<User>> addExperience(@Valid @RequestBody AddExperienceRequest request) {
        User updated = profileService.addExperience(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Experience added", updated));
    }

    @PostMapping("/education")
    public ResponseEntity<ApiResponse<User>> addEducation(@Valid @RequestBody AddEducationRequest request) {
        User updated = profileService.addEducation(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Education added", updated));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> getProfile(@PathVariable String userId) {
        User user = profileService.getUserProfile(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Profile fetched", user));
    }
    @PutMapping("/experience")
    public ResponseEntity<ApiResponse<User>> updateExperience(@Valid @RequestBody UpdateExperienceRequest request) {
        User updated = profileService.updateExperience(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Experience updated", updated));
    }

    @DeleteMapping("/experience")
    public ResponseEntity<ApiResponse<User>> deleteExperience(@Valid @RequestBody DeleteExperienceRequest request) {
        User updated = profileService.deleteExperience(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Experience deleted", updated));
    }

    @PutMapping("/education")
    public ResponseEntity<ApiResponse<User>> updateEducation(@Valid @RequestBody UpdateEducationRequest request) {
        User updated = profileService.updateEducation(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Education updated", updated));
    }

    @DeleteMapping("/education")
    public ResponseEntity<ApiResponse<User>> deleteEducation(@Valid @RequestBody DeleteEducationRequest request) {
        User updated = profileService.deleteEducation(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Education deleted", updated));
    }

}
