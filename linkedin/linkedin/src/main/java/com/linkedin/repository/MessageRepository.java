package com.linkedin.repository;

import com.linkedin.model.Message;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    /**
     * Retrieve messages sent from one user to another, ordered by sent time.
     */
    List<Message> findBySenderIdAndReceiverIdOrderBySentAtAsc(String senderId, String receiverId);

    /**
     * Retrieve unread messages for a specific user.
     */
    List<Message> findByReceiverIdAndIsSeenFalseOrderBySentAtAsc(String receiverId);

    /**
     * Retrieve the full chat history between two users in both directions, ordered by timestamp.
     */
    @Query("{$or:[{'senderId': ?0, 'receiverId': ?1}, {'senderId': ?1, 'receiverId': ?0}]}")
    List<Message> findChatHistoryBetweenUsers(String user1, String user2);


    // 🧠 Get distinct userIds that the given user has chatted with
    @Aggregation(pipeline = {
            "{ $match: { $or: [ { senderId: ?0 }, { receiverId: ?0 } ] } }",
            "{ $project: { chatPartner: { $cond: [ { $eq: [ '$senderId', ?0 ] }, '$receiverId', '$senderId' ] } } }",
            "{ $group: { _id: '$chatPartner' } }"
    })
    List<String> findDistinctChatPartners(String userId);
}

