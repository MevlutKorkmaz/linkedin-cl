package com.linkedin.controller;

import com.linkedin.dto.requests.CompanyUpdateRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.dto.responses.CompanyProfileResponse;
import com.linkedin.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CompanyProfileResponse>> getCompanyById(@PathVariable String id) {
        CompanyProfileResponse company = companyService.getCompanyById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Company profile fetched", company));
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse<CompanyProfileResponse>> updateCompanyProfile(
            @RequestBody CompanyUpdateRequest request,
            Authentication authentication) {
        String companyId = authentication.getName();
        CompanyProfileResponse updated = companyService.updateCompanyProfile(companyId, request);
        return ResponseEntity.ok(new ApiResponse<>(true, "Company profile updated", updated));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CompanyProfileResponse>>> getAllCompanies() {
        List<CompanyProfileResponse> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(new ApiResponse<>(true, "Companies fetched", companies));
    }
}
