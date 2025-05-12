package com.linkedin.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {
    @Id
    private String id;
    private String companyId;

    private String title;
    private String description;
    private String location;
    private String category;
    private boolean isRemote;

    private List<String> applicants; // user IDs
    private LocalDateTime postedAt;
}
