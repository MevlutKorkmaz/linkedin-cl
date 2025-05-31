package com.linkedin.service;

import com.linkedin.dto.requests.SendMessageRequest;
import com.linkedin.model.Message;
import com.linkedin.repository.MessageRepository;
import com.linkedin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.linkedin.model.User;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepo;
    private final UserRepository userRepository; // ✅ Add this
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
        return messageRepo.findChatHistoryBetweenUsers(user1, user2)
                .stream()
                .sorted(Comparator.comparing(Message::getSentAt))
                .collect(Collectors.toList());
    }

    public List<Message> getUnreadMessages(String userId) {
        return messageRepo.findByReceiverIdAndIsSeenFalseOrderBySentAtAsc(userId);
    }

    public void markAsRead(List<String> messageIds) {
        List<Message> messages = messageRepo.findAllById(messageIds);
        messages.forEach(msg -> msg.setSeen(true));
        messageRepo.saveAll(messages);
    }

    // ✅ New: Fetch users you've chatted with
    public List<User> getRecentChatUsers(String userId) {
        List<String> userIds = messageRepo.findDistinctChatPartners(userId);
        return userRepository.findAllById(userIds);
    }
}
