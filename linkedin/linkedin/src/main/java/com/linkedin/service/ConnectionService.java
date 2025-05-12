package com.linkedin.service;

import com.linkedin.dto.requests.ConnectionRequestDTO;
import com.linkedin.model.Connection;
import com.linkedin.model.User;
import com.linkedin.model.enums.ConnectionStatus;
import com.linkedin.repository.ConnectionRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final ConnectionRepository connectionRepo;
    private final UserRepository userRepository;

    public Connection sendRequest(ConnectionRequestDTO request) {
        if (request.getRequesterId().equals(request.getReceiverId()))
            throw new IllegalArgumentException("You can't send a request to yourself");

        boolean exists = connectionRepo.findByRequesterIdAndReceiverId(
                request.getRequesterId(), request.getReceiverId()).isPresent();

        if (exists) throw new IllegalStateException("Connection already exists");

        Connection connection = Connection.builder()
                .requesterId(request.getRequesterId())
                .receiverId(request.getReceiverId())
                .status(ConnectionStatus.PENDING)
                .requestedAt(LocalDateTime.now())
                .build();

        return connectionRepo.save(connection);
    }

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

            if (requester.getConnectionIds() == null) {
                requester.setConnectionIds(new java.util.ArrayList<>());
            }
            if (receiver.getConnectionIds() == null) {
                receiver.setConnectionIds(new java.util.ArrayList<>());
            }

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

    public List<Connection> getUserConnections(String userId) {
        return connectionRepo.findByRequesterIdOrReceiverId(userId, userId);
    }

    public void deleteConnection(String connectionId) {
        connectionRepo.deleteById(connectionId);
    }
}
