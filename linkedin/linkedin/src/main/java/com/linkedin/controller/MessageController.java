package com.linkedin.controller;

import com.linkedin.dto.requests.SendMessageRequest;
import com.linkedin.dto.responses.ApiResponse;
import com.linkedin.model.Message;
import com.linkedin.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import com.linkedin.model.User;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public ResponseEntity<ApiResponse<Message>> send(@Valid @RequestBody SendMessageRequest request) {
        Message message = messageService.sendMessage(request);

        // WebSocket real-time update
        messagingTemplate.convertAndSend("/topic/messages/" + message.getReceiverId(), message);

        return ResponseEntity.ok(new ApiResponse<>(true, "Message sent", message));
    }

    @GetMapping("/chat")
    public ResponseEntity<ApiResponse<List<Message>>> getChat(
            @RequestParam String user1,
            @RequestParam String user2
    ) {
        List<Message> chat = messageService.getChatHistory(user1, user2);
        return ResponseEntity.ok(new ApiResponse<>(true, "Chat history retrieved", chat));
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<ApiResponse<List<Message>>> getUnread(@PathVariable String userId) {
        List<Message> unread = messageService.getUnreadMessages(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Unread messages retrieved", unread));
    }

    @PutMapping("/mark-as-read")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@RequestBody List<String> messageIds) {
        messageService.markAsRead(messageIds);
        return ResponseEntity.ok(new ApiResponse<>(true, "Messages marked as read", null));
    }
    // ✅ NEW: Get recent chat partners
    @GetMapping("/recent/{userId}")
    public ResponseEntity<ApiResponse<List<User>>> getRecentChatUsers(@PathVariable String userId) {
        List<User> recentUsers = messageService.getRecentChatUsers(userId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Recent chats retrieved", recentUsers));
    }
}