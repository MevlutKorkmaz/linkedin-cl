package com.linkedin.repository;

import com.linkedin.model.Connection;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository extends MongoRepository<Connection, String> {
    List<Connection> findByRequesterIdOrReceiverId(String requesterId, String receiverId);
    Optional<Connection> findByRequesterIdAndReceiverId(String requesterId, String receiverId);
}
