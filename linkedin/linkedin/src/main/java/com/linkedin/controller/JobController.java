package com.linkedin.controller;

import com.linkedin.dto.requests.JobCreateRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.Job;
import com.linkedin.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    public ResponseEntity<ApiResponse<Job>> create(@Valid @RequestBody JobCreateRequest request) {
        Job job = jobService.createJob(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Job created successfully", job));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Job>>> getAll() {
        List<Job> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(new ApiResponse<>(true, " All jobs retrieved", jobs));
    }

    @GetMapping("/category")
    public ResponseEntity<ApiResponse<List<Job>>> searchCategory(@RequestParam String category) {
        List<Job> filtered = jobService.searchByCategory(category);
        return ResponseEntity.ok(new ApiResponse<>(true, " Jobs filtered by category", filtered));
    }

    @GetMapping("/location")
    public ResponseEntity<ApiResponse<List<Job>>> searchLocation(@RequestParam String location) {
        List<Job> filtered = jobService.searchByLocation(location);
        return ResponseEntity.ok(new ApiResponse<>(true, " Jobs filtered by location", filtered));
    }

    @PostMapping("/{jobId}/apply")
    public ResponseEntity<ApiResponse<Job>> apply(@PathVariable String jobId, @RequestParam String userId) {
        Job updated = jobService.applyToJob(jobId, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Application submitted", updated));
    }
}
