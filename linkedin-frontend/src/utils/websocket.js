import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectWebSocket = (userId, onMessageReceived) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('🔗 WebSocket connected');

      // Subscribe to personal message topic
      stompClient.subscribe(`/topic/messages/${userId}`, (message) => {
        const msg = JSON.parse(message.body);
        onMessageReceived(msg);
      });
    },
    onStompError: (frame) => {
      console.error('❌ STOMP error', frame);
    }
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('🔌 WebSocket disconnected');
  }
};
