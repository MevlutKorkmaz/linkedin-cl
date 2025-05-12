package com.linkedin.service;

import com.linkedin.model.Job;
import com.linkedin.model.Post;
import com.linkedin.model.User;
import com.linkedin.repository.JobRepository;
import com.linkedin.repository.PostRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final UserRepository userRepo;
    private final JobRepository jobRepo;
    private final PostRepository postRepo;

    public List<User> searchUsers(String keyword) {
        return userRepo.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keyword, keyword);
    }

    public List<Job> searchJobs(String category, String location) {
        if (category != null && location != null) {
            return jobRepo.findByCategoryContainingIgnoreCase(category)
                    .stream()
                    .filter(job -> job.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .toList();
        } else if (category != null) {
            return jobRepo.findByCategoryContainingIgnoreCase(category);
        } else if (location != null) {
            return jobRepo.findByLocationContainingIgnoreCase(location);
        } else {
            return jobRepo.findAll();
        }
    }

    public List<Post> searchPosts(String keyword) {
        return postRepo.findByContentContainingIgnoreCase(keyword);
    }
}
