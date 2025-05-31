package com.linkedin.service;

import com.linkedin.dto.requests.*;
import com.linkedin.model.*;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepo;

    public User updateBasicInfo(UpdateProfileRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        user.setBio(request.getBio());
        user.setProfilePhotoId(request.getProfilePhotoId());
        user.setSkills(request.getSkills());

        return userRepo.save(user);
    }

    public User addExperience(AddExperienceRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        if (user.getExperiences() == null) {
            user.setExperiences(new ArrayList<>());
        }

        Experience exp = Experience.builder()
                .companyName(request.getCompanyName())
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        user.getExperiences().add(exp);
        return userRepo.save(user);
    }

    public User addEducation(AddEducationRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));

        if (user.getEducation() == null) {
            user.setEducation(new ArrayList<>());
        }

        Education edu = Education.builder()
                .school(request.getSchool())
                .degree(request.getDegree())
                .field(request.getField())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .build();

        user.getEducation().add(edu);
        return userRepo.save(user);
    }

    public User getUserProfile(String userId) {
        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    public User updateExperience(UpdateExperienceRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + req.getUserId()));

        if (user.getExperiences() == null || user.getExperiences().size() <= req.getIndex()) {
            throw new RuntimeException("Invalid experience index: " + req.getIndex());
        }

        Experience exp = Experience.builder()
                .companyName(req.getCompanyName())
                .title(req.getTitle())
                .description(req.getDescription())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .build();

        user.getExperiences().set(req.getIndex(), exp);
        return userRepo.save(user);
    }

    public User deleteExperience(DeleteExperienceRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + req.getUserId()));

        if (user.getExperiences() == null || user.getExperiences().size() <= req.getIndex()) {
            throw new RuntimeException("Invalid experience index: " + req.getIndex());
        }

        user.getExperiences().remove(req.getIndex());
        return userRepo.save(user);
    }

    public User updateEducation(UpdateEducationRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + req.getUserId()));

        if (user.getEducation() == null || user.getEducation().size() <= req.getIndex()) {
            throw new RuntimeException("Invalid education index: " + req.getIndex());
        }

        Education edu = Education.builder()
                .school(req.getSchool())
                .degree(req.getDegree())
                .field(req.getField())
                .startDate(req.getStartDate())
                .endDate(req.getEndDate())
                .build();

        user.getEducation().set(req.getIndex(), edu);
        return userRepo.save(user);
    }

    public User deleteEducation(DeleteEducationRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + req.getUserId()));

        if (user.getEducation() == null || user.getEducation().size() <= req.getIndex()) {
            throw new RuntimeException("Invalid education index: " + req.getIndex());
        }

        user.getEducation().remove(req.getIndex());
        return userRepo.save(user);
    }
}
