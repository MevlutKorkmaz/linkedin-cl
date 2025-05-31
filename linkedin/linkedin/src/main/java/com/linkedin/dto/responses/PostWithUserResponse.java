package com.linkedin.dto.responses;

import com.linkedin.model.Post;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
public class PostWithUserResponse {
    private String id;
    private String content;
    private List<String> imageIds;
    private LocalDateTime createdAt;

    private String firstName;
    private String lastName;
    private String profilePhotoId;

    public PostWithUserResponse(Post post, String firstName, String lastName, String profilePhotoId) {
        this.id = post.getId();
        this.content = post.getContent();
        this.imageIds = post.getImageIds();
        this.createdAt = post.getCreatedAt();
        this.firstName = firstName;
        this.lastName = lastName;
        this.profilePhotoId = profilePhotoId;
    }
}
