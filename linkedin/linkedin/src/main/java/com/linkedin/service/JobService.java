package com.linkedin.service;

import com.linkedin.dto.requests.JobCreateRequest;
import com.linkedin.model.Job;
import com.linkedin.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepo;

    public Job createJob(JobCreateRequest request) {
        Job job = Job.builder()
                .companyId(request.getCompanyId())
                .title(request.getTitle())
                .description(request.getDescription())
                .location(request.getLocation())
                .category(request.getCategory())
                .isRemote(request.isRemote())
                .postedAt(LocalDateTime.now())
                .build();
        return jobRepo.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepo.findAll();
    }

    public List<Job> searchByCategory(String category) {
        return jobRepo.findByCategoryContainingIgnoreCase(category);
    }

    public List<Job> searchByLocation(String location) {
        return jobRepo.findByLocationContainingIgnoreCase(location);
    }

    public Job applyToJob(String jobId, String userId) {
        Job job = jobRepo.findById(jobId).orElseThrow();
        if (!job.getApplicants().contains(userId)) {
            job.getApplicants().add(userId);
        }
        return jobRepo.save(job);
    }
}
