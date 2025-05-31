package com.linkedin.service;

import com.linkedin.dto.requests.CompanyUpdateRequest;
import com.linkedin.dto.responses.CompanyProfileResponse;
import com.linkedin.exception.ResourceNotFoundException;
import com.linkedin.model.enums.Role;
import com.linkedin.model.User;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final UserRepository userRepository;

    public CompanyProfileResponse getCompanyById(String id) {
        User company = userRepository.findById(id)
                .filter(user -> user.getRole() == Role.COMPANY)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        return toProfileResponse(company);
    }

    public CompanyProfileResponse updateCompanyProfile(String companyId, CompanyUpdateRequest request) {
        User company = userRepository.findById(companyId)
                .filter(user -> user.getRole() == Role.COMPANY)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));

        company.setFirstName(request.getCompanyName());
        company.setBio(request.getDescription());
        company.setWebsite(request.getWebsite());
        company.setProfilePhotoId(request.getProfilePhotoId());

        userRepository.save(company);
        return toProfileResponse(company);
    }

    public List<CompanyProfileResponse> getAllCompanies() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.COMPANY)
                .map(this::toProfileResponse)
                .collect(Collectors.toList());
    }

    private CompanyProfileResponse toProfileResponse(User user) {
        return CompanyProfileResponse.builder()
                .id(user.getId())
                .companyName(user.getFirstName())
                .description(user.getBio())
                .website(user.getWebsite())
                .profilePhotoId(user.getProfilePhotoId())
                .build();
    }
}
