package com.linkedin.repository;

import com.linkedin.model.Company;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {
    Company findByEmail(String email);
    boolean existsByEmail(String email);
}
