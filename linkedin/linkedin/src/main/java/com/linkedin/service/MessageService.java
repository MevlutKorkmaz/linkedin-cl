package com.linkedin.service;

import com.linkedin.dto.requests.SendMessageRequest;
import com.linkedin.model.Message;
import com.linkedin.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepo;

    public Message sendMessage(SendMessageRequest request) {
        Message message = Message.builder()
                .senderId(request.getSenderId())
                .receiverId(request.getReceiverId())
                .content(request.getContent())
                .isSeen(false)
                .sentAt(LocalDateTime.now())
                .build();

        return messageRepo.save(message);
    }

    public List<Message> getChatHistory(String user1, String user2) {
        List<Message> messages = messageRepo.findBySenderIdAndReceiverIdOrderBySentAtAsc(user1, user2);
        messages.addAll(messageRepo.findBySenderIdAndReceiverIdOrderBySentAtAsc(user2, user1));
        messages.sort((a, b) -> a.getSentAt().compareTo(b.getSentAt())); // merge + sort
        return messages;
    }

    public List<Message> getUnreadMessages(String userId) {
        return messageRepo.findByReceiverIdAndIsSeenFalse(userId);
    }

    public void markAsRead(List<String> messageIds) {
        for (String id : messageIds) {
            messageRepo.findById(id).ifPresent(msg -> {
                msg.setSeen(true);
                messageRepo.save(msg);
            });
        }
    }
}
