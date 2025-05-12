package com.linkedin.service;

import com.linkedin.model.Comment;
import com.linkedin.model.Post;
import com.linkedin.model.User;
import com.linkedin.repository.CommentRepository;
import com.linkedin.repository.PostRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final PostRepository postRepo;
    private final CommentRepository commentRepo;

    public User blockUser(String userId, boolean block) {
        User user = userRepo.findById(userId).orElseThrow();
        user.setActive(!block);
        return userRepo.save(user);
    }

    public void deletePost(String postId) {
        postRepo.deleteById(postId);
    }

    public void deleteComment(String commentId) {
        commentRepo.deleteById(commentId);
    }
}
