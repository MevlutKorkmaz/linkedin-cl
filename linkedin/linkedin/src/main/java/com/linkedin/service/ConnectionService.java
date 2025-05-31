package com.linkedin.service;

import com.linkedin.dto.requests.ConnectionRequestDTO;
import com.linkedin.dto.responses.ConnectionWithUsersResponse;
import com.linkedin.dto.responses.UserSummaryDTO;
import com.linkedin.model.Connection;
import com.linkedin.model.User;
import com.linkedin.model.enums.ConnectionStatus;
import com.linkedin.repository.ConnectionRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepo;
    private final UserRepository userRepository;

    // ✅ Get connected users as summaries
    public List<UserSummaryDTO> getConnectedUsers(String currentUserId) {
        List<Connection> connections = connectionRepo.findAcceptedConnections(currentUserId);

        return connections.stream().map(conn -> {
            String otherUserId = currentUserId.equals(conn.getRequesterId())
                    ? conn.getReceiverId()
                    : conn.getRequesterId();

            User other = userRepository.findById(otherUserId)
                    .orElseThrow(() -> new RuntimeException("User not found: " + otherUserId));

            return new UserSummaryDTO(other.getId(), other.getFirstName(), other.getLastName());
        }).collect(Collectors.toList());
    }

    // ✅ Send a new connection request
    public Connection sendRequest(ConnectionRequestDTO request) {
        if (request.getRequesterId().equals(request.getReceiverId())) {
            throw new IllegalArgumentException("You can't send a request to yourself");
        }

        boolean exists = connectionRepo.findByRequesterIdAndReceiverId(
                request.getRequesterId(), request.getReceiverId()).isPresent();

        if (exists) {
            throw new IllegalStateException("Connection already exists");
        }

        Connection connection = Connection.builder()
                .requesterId(request.getRequesterId())
                .receiverId(request.getReceiverId())
                .status(ConnectionStatus.PENDING)
                .requestedAt(LocalDateTime.now())
                .build();

        return connectionRepo.save(connection);
    }

    // ✅ Get list of actual accepted User objects for a user
    public List<User> getAcceptedConnections(String userId) {
        List<Connection> sent = connectionRepo.findByRequesterIdAndStatus(userId, ConnectionStatus.ACCEPTED);
        List<Connection> received = connectionRepo.findByReceiverIdAndStatus(userId, ConnectionStatus.ACCEPTED);

        Set<String> otherUserIds = new HashSet<>();
        sent.forEach(conn -> otherUserIds.add(conn.getReceiverId()));
        received.forEach(conn -> otherUserIds.add(conn.getRequesterId()));

        return userRepository.findAllById(otherUserIds).stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // ✅ Accept or reject a connection
    public Connection respond(String connectionId, boolean accepted) {
        Connection connection = connectionRepo.findById(connectionId)
                .orElseThrow(() -> new IllegalArgumentException("Connection not found"));

        connection.setStatus(accepted ? ConnectionStatus.ACCEPTED : ConnectionStatus.REJECTED);
        connection.setRespondedAt(LocalDateTime.now());

        if (accepted) {
            String requesterId = connection.getRequesterId();
            String receiverId = connection.getReceiverId();

            User requester = userRepository.findById(requesterId)
                    .orElseThrow(() -> new IllegalArgumentException("Requester not found"));
            User receiver = userRepository.findById(receiverId)
                    .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

            requester.setConnectionIds(Optional.ofNullable(requester.getConnectionIds()).orElse(new ArrayList<>()));
            receiver.setConnectionIds(Optional.ofNullable(receiver.getConnectionIds()).orElse(new ArrayList<>()));

            if (!requester.getConnectionIds().contains(receiverId)) {
                requester.getConnectionIds().add(receiverId);
            }
            if (!receiver.getConnectionIds().contains(requesterId)) {
                receiver.getConnectionIds().add(requesterId);
            }

            userRepository.save(requester);
            userRepository.save(receiver);
        }

        return connectionRepo.save(connection);
    }

    // ✅ Get all connections (used by admin or debug purposes)
    public List<Connection> getUserConnections(String userId) {
        return connectionRepo.findByRequesterIdOrReceiverId(userId, userId);
    }

    // ✅ Delete a connection
    public void deleteConnection(String connectionId) {
        connectionRepo.deleteById(connectionId);
    }

    // ✅ Get connections with full user info (for frontend view)
    public List<ConnectionWithUsersResponse> getConnectionsWithUserData(String userId) {
        List<Connection> connections = connectionRepo.findByRequesterIdOrReceiverId(userId, userId);

        return connections.stream()
                .map(conn -> {
                    User requester = userRepository.findById(conn.getRequesterId()).orElse(null);
                    User receiver = userRepository.findById(conn.getReceiverId()).orElse(null);

                    if (requester == null || receiver == null) {
                        System.out.println("⚠️ Skipping connection: " + conn.getId() +
                                " because requester or receiver not found.");
                        return null;
                    }

                    // Debug log
                    System.out.println("🔍 Connection found:");
                    System.out.println("   - ID: " + conn.getId());
                    System.out.println("   - Status: " + conn.getStatus());
                    System.out.println("   - Requester: " + requester.getFirstName() + " (" + conn.getRequesterId() + ")");
                    System.out.println("   - Receiver: " + receiver.getFirstName() + " (" + conn.getReceiverId() + ")");

                    return new ConnectionWithUsersResponse(
                            conn.getId(),
                            conn.getStatus().name(),
                            conn.getRequestedAt(),
                            conn.getRespondedAt(),
                            requester,
                            receiver
                    );
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
