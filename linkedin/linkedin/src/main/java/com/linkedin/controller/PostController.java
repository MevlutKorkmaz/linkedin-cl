package com.linkedin.controller;

import com.linkedin.dto.requests.PostCreateRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.Post;
import com.linkedin.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<ApiResponse<Post>> create(@Valid @RequestBody PostCreateRequest request) {
        Post post = postService.createPost(request);
        return ResponseEntity.ok(new ApiResponse<>(true, " Post created successfully", post));
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<Post>>> getPublicFeed() {
        List<Post> posts = postService.getAllPublicPosts();
        return ResponseEntity.ok(new ApiResponse<>(true, " Public posts fetched", posts));
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<ApiResponse<Post>> like(@PathVariable String postId, @RequestParam String userId) {
        Post updatedPost = postService.likePost(postId, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Post liked", updatedPost));
    }

    @PostMapping("/{postId}/share")
    public ResponseEntity<ApiResponse<Post>> share(@PathVariable String postId, @RequestParam String userId) {
        Post sharedPost = postService.sharePost(postId, userId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Post shared", sharedPost));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok(new ApiResponse<>(true, "🗑 Post deleted successfully", null));
    }
}
