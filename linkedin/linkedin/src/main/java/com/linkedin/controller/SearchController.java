package com.linkedin.controller;

import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.Job;
import com.linkedin.model.Post;
import com.linkedin.model.User;
import com.linkedin.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> searchUsers(@RequestParam String keyword) {
        List<User> users = searchService.searchUsers(keyword);
        return ResponseEntity.ok(new ApiResponse<>(true, " Users matching '" + keyword + "' found", users));
    }

    @GetMapping("/jobs")
    public ResponseEntity<ApiResponse<List<Job>>> searchJobs(@RequestParam(required = false) String category,
                                                             @RequestParam(required = false) String location) {
        List<Job> jobs = searchService.searchJobs(category, location);
        return ResponseEntity.ok(new ApiResponse<>(true, " Jobs filtered by criteria", jobs));
    }

    @GetMapping("/posts")
    public ResponseEntity<ApiResponse<List<Post>>> searchPosts(@RequestParam String keyword) {
        List<Post> posts = searchService.searchPosts(keyword);
        return ResponseEntity.ok(new ApiResponse<>(true, " Posts matching '" + keyword + "' found", posts));
    }
}
