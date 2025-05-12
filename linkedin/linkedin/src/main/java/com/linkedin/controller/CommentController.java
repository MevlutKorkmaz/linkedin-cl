package com.linkedin.controller;

import com.linkedin.dto.requests.CommentCreateRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.Comment;
import com.linkedin.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<ApiResponse<Comment>> addComment(@Valid @RequestBody CommentCreateRequest request) {
        Comment comment = commentService.addComment(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Comment added successfully", comment));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<ApiResponse<List<Comment>>> getComments(@PathVariable String postId) {
        List<Comment> comments = commentService.getCommentsForPost(postId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Comments for post retrieved", comments));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok(new ApiResponse<>(true, "🗑 Comment deleted", null));
    }
}
