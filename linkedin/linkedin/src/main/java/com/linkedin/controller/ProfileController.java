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
        try {
            User updated = profileService.updateBasicInfo(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile updated", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/experience")
    public ResponseEntity<ApiResponse<User>> addExperience(@Valid @RequestBody AddExperienceRequest request) {
        try {
            User updated = profileService.addExperience(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Experience added", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @PostMapping("/education")
    public ResponseEntity<ApiResponse<User>> addEducation(@Valid @RequestBody AddEducationRequest request) {
        try {
            User updated = profileService.addEducation(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Education added", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<User>> getProfile(@PathVariable String userId) {
        try {
            User user = profileService.getUserProfile(userId);
            return ResponseEntity.ok(new ApiResponse<>(true, "Profile fetched", user));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build(); // Or badRequest if you prefer consistency
        }
    }

    @PutMapping("/experience")
    public ResponseEntity<ApiResponse<User>> updateExperience(@Valid @RequestBody UpdateExperienceRequest request) {
        try {
            User updated = profileService.updateExperience(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Experience updated", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @DeleteMapping("/experience")
    public ResponseEntity<ApiResponse<User>> deleteExperience(@Valid @RequestBody DeleteExperienceRequest request) {
        try {
            User updated = profileService.deleteExperience(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Experience deleted", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @PutMapping("/education")
    public ResponseEntity<ApiResponse<User>> updateEducation(@Valid @RequestBody UpdateEducationRequest request) {
        try {
            User updated = profileService.updateEducation(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Education updated", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }

    @DeleteMapping("/education")
    public ResponseEntity<ApiResponse<User>> deleteEducation(@Valid @RequestBody DeleteEducationRequest request) {
        try {
            User updated = profileService.deleteEducation(request);
            return ResponseEntity.ok(new ApiResponse<>(true, "Education deleted", updated));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(new ApiResponse<>(false, ex.getMessage(), null));
        }
    }
}
