package com.linkedin.dto.responses;

import com.linkedin.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionWithUsersResponse {
    private String id;
    private String status;
    private LocalDateTime requestedAt;
    private LocalDateTime respondedAt;
    private User requester;
    private User receiver;
}
