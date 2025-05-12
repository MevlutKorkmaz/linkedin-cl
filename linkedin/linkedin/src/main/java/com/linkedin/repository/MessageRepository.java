package com.linkedin.repository;

import com.linkedin.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findBySenderIdAndReceiverIdOrderBySentAtAsc(String senderId, String receiverId);
    List<Message> findByReceiverIdAndIsSeenFalse(String receiverId);
}
