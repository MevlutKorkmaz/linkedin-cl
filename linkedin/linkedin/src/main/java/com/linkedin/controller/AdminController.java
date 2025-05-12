package com.linkedin.controller;

import com.linkedin.dto.requests.BlockUserRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.User;
import com.linkedin.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PutMapping("/block-user")
    public ResponseEntity<ApiResponse<User>> blockUser(@Valid @RequestBody BlockUserRequest request) {
        User updatedUser = adminService.blockUser(request.getUserId(), request.isBlock());
        String action = request.isBlock() ? " User blocked" : " User unblocked";
        return ResponseEntity.ok(new ApiResponse<>(true, action, updatedUser));
    }

    @DeleteMapping("/delete-post/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable String postId) {
        adminService.deletePost(postId);
        return ResponseEntity.ok(new ApiResponse<>(true, "️ Post deleted by admin", null));
    }

    @DeleteMapping("/delete-comment/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(@PathVariable String commentId) {
        adminService.deleteComment(commentId);
        return ResponseEntity.ok(new ApiResponse<>(true, " Comment deleted by admin", null));
    }
}
