package com.linkedin.repository;

import com.linkedin.model.Connection;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.linkedin.model.enums.ConnectionStatus;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends MongoRepository<Connection, String> {
    List<Connection> findByRequesterIdOrReceiverId(String requesterId, String receiverId);
    Optional<Connection> findByRequesterIdAndReceiverId(String requesterId, String receiverId);

    @Query("SELECT c FROM Connection c WHERE (c.requesterId = :userId OR c.receiverId = :userId) AND c.status = 'ACCEPTED'")
    List<Connection> findAcceptedConnections(@Param("userId") String userId);

    List<Connection> findByRequesterIdAndStatus(String requesterId, ConnectionStatus status);
    List<Connection> findByReceiverIdAndStatus(String receiverId, ConnectionStatus status);

}
