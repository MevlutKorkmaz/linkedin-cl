package com.linkedin.service;

import com.linkedin.dto.requests.PostCreateRequest;
import com.linkedin.dto.responses.PostWithUserResponse;
import com.linkedin.model.Post;
import com.linkedin.model.User;
import com.linkedin.repository.PostRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepo;
    private final UserRepository userRepository; // ✅ Add this

    public Post createPost(PostCreateRequest request) {
        Post post = Post.builder()
                .userId(request.getUserId())
                .content(request.getContent())
                .imageIds(request.getImageIds())
                .location(request.getLocation())
                .isPrivate(request.isPrivate())
                .likedByUserIds(new ArrayList<>())
                .sharedByUserIds(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        return postRepo.save(post);
    }

    public Optional<Post> getPost(String postId) {
        return postRepo.findById(postId);
    }

    public List<Post> getAllPublicPosts() {
        return postRepo.findByIsPrivateFalseOrderByCreatedAtDesc();
    }

    public void deletePost(String postId) {
        postRepo.deleteById(postId);
    }

    public Post likePost(String postId, String userId) {
        Post post = postRepo.findById(postId).orElseThrow();

        if (post.getLikedByUserIds() == null) {
            post.setLikedByUserIds(new ArrayList<>());
        }

        if (post.getLikedByUserIds().contains(userId)) {
            post.getLikedByUserIds().remove(userId); // Unlike
        } else {
            post.getLikedByUserIds().add(userId); // Like
        }

        return postRepo.save(post);
    }

    public Post sharePost(String postId, String userId) {
        Post post = postRepo.findById(postId).orElseThrow();

        if (post.getSharedByUserIds() == null) {
            post.setSharedByUserIds(new ArrayList<>());
        }

        if (post.getSharedByUserIds().contains(userId)) {
            post.getSharedByUserIds().remove(userId); // Unshare
        } else {
            post.getSharedByUserIds().add(userId); // Share
        }

        return postRepo.save(post);
    }
    public List<Post> getPostsByUser(String userId) {
        return postRepo.findByUserId(userId);
    }



    public List<PostWithUserResponse> getAllPostsWithUserInfo() {
        List<Post> posts = postRepo.findAll(); // ✅ fix: use postRepo not postRepository
        List<PostWithUserResponse> enriched = new ArrayList<>();

        for (Post post : posts) {
            User user = userRepository.findById(post.getUserId()).orElse(null);
            if (user != null) {
                enriched.add(new PostWithUserResponse(
                        post,
                        user.getFirstName(),
                        user.getLastName(),
                        user.getProfilePhotoId()
                ));
            }
        }

        return enriched;
    }

}
