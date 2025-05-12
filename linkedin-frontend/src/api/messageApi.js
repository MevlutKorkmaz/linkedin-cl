// ✅ api/messageApi.js

import axios from './axiosInstance';

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post('/api/messages', messageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Sending message failed' };
  }
};

export const getChatMessages = async (user1, user2) => {
  try {
    const response = await axios.get(`/api/messages/chat?user1=${user1}&user2=${user2}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching chat messages failed' };
  }
};

export const getUnreadMessages = async (userId) => {
  try {
    const response = await axios.get(`/api/messages/unread/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching unread messages failed' };
  }
};

export const markMessagesAsRead = async (messageIds) => {
  try {
    const response = await axios.put('/api/messages/mark-as-read', messageIds);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Marking messages as read failed' };
  }
};
