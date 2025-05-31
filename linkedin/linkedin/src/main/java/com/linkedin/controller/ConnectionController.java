package com.linkedin.controller;

import com.linkedin.dto.requests.ConnectionRequestDTO;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.dto.responses.ConnectionWithUsersResponse;
import com.linkedin.dto.responses.UserSummaryDTO;
import com.linkedin.model.Connection;
import com.linkedin.model.User;
import com.linkedin.service.ConnectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/connections")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping
    public ResponseEntity<ApiResponse<Connection>> sendRequest(@Valid @RequestBody ConnectionRequestDTO dto) {
        Connection connection = connectionService.sendRequest(dto);
        return ResponseEntity.ok(new ApiResponse<>(true, " Connection request sent", connection));
    }

    @PostMapping("/{connectionId}/respond")
    public ResponseEntity<ApiResponse<Connection>> respond(
            @PathVariable String connectionId,
            @RequestParam boolean accept
    ) {
        Connection updated = connectionService.respond(connectionId, accept);
        String msg = accept ? " Connection accepted" : " Connection declined";
        return ResponseEntity.ok(new ApiResponse<>(true, msg, updated));
    }
    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<List<UserSummaryDTO>>> getConnectedUsers(@PathVariable String userId) {
        List<UserSummaryDTO> users = connectionService.getConnectedUsers(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Connections fetched", users));
    }

    // ✅ Returns Connection objects (used by admin maybe?)
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<Connection>>> getUserConnections(@PathVariable String userId) {
        List<Connection> connections = connectionService.getUserConnections(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, " User connections retrieved", connections));
    }

//    // ✅ Returns User objects for chat dropdown
//    @GetMapping("/users/{userId}")
//    public ResponseEntity<ApiResponse<List<User>>> getConnectedUsers(@PathVariable String userId) {
//        List<User> connectedUsers = connectionService.getAcceptedConnections(userId);
//        return ResponseEntity.ok(new ApiResponse<>(true, "Connected users fetched", connectedUsers));
//    }
    @GetMapping("/users/{userId}/full")
    public ResponseEntity<ApiResponse<List<ConnectionWithUsersResponse>>> getAllWithUsers(@PathVariable String userId) {
        List<ConnectionWithUsersResponse> connections = connectionService.getConnectionsWithUserData(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Connections with users loaded", connections));
    }

    @DeleteMapping("/{connectionId}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable String connectionId) {
        connectionService.deleteConnection(connectionId);
        return ResponseEntity.ok(new ApiResponse<>(true, "🗑 Connection removed", null));
    }
}
