package com.linkedin.repository;

import com.linkedin.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByCompanyId(String companyId);
    List<Job> findByCategoryContainingIgnoreCase(String category);
    List<Job> findByLocationContainingIgnoreCase(String location);
}
