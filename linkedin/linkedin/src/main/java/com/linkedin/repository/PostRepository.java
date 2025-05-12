package com.linkedin.repository;

import com.linkedin.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByUserId(String userId);
    List<Post> findByIsPrivateFalseOrderByCreatedAtDesc(); // For public feed
    List<Post> findByContentContainingIgnoreCase(String content);

}
