package com.linkedin.service;

import com.linkedin.dto.requests.CommentCreateRequest;
import com.linkedin.model.Comment;
import com.linkedin.model.Post;
import com.linkedin.repository.CommentRepository;
import com.linkedin.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepo;
    private final PostRepository postRepo;

    public Comment addComment(CommentCreateRequest request) {
        Comment comment = Comment.builder()
                .postId(request.getPostId())
                .userId(request.getUserId())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .build();

        Comment saved = commentRepo.save(comment);

        Post post = postRepo.findById(request.getPostId()).orElseThrow();
        post.getCommentIds().add(saved.getId());
        postRepo.save(post);

        return saved;
    }

    public List<Comment> getCommentsForPost(String postId) {
        return commentRepo.findByPostId(postId);
    }

    public void deleteComment(String commentId) {
        Comment comment = commentRepo.findById(commentId).orElseThrow();
        commentRepo.deleteById(commentId);

        Post post = postRepo.findById(comment.getPostId()).orElseThrow();
        post.getCommentIds().remove(commentId);
        postRepo.save(post);
    }
}
