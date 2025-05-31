// ✅ api/messageApi.js
import axios from "./axiosInstance";

// 📨 Send a new message
export const sendMessage = (messageData) =>
  axios.post("/messages", messageData);

// 💬 Get chat messages between two users
export const getChatBetweenUsers = (user1, user2) =>
  axios.get(`/messages/chat?user1=${user1}&user2=${user2}`);

// 📥 Get unread messages for a user
export const getUnreadMessages = (userId) =>
  axios.get(`/messages/unread/${userId}`);

// ✅ Mark a list of messages as read
export const markMessagesAsRead = (messageIds) =>
  axios.put("/messages/mark-as-read", messageIds);

// 🧑‍🤝‍🧑 Get recent users this user has chatted with
export const getRecentChats = (userId) =>
  axios.get(`/messages/recent/${userId}`);