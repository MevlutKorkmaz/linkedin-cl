// ✅ api/connectionApi.js

import axios from './axiosInstance';

export const sendConnectionRequest = async (connectionData) => {
  try {
    const response = await axios.post('/connections', connectionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Sending connection request failed' };
  }
};

export const respondToConnectionRequest = async (connectionId, accept) => {
  try {
    const response = await axios.post(`/connections/${connectionId}/respond?accept=${accept}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Responding to connection failed' };
  }
};

export const getUserConnections = async (userId) => {
  try {
    const response = await axios.get(`/connections/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching connections failed' };
  }
};

export const deleteConnection = async (connectionId) => {
  try {
    const response = await axios.delete(`/connections/${connectionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Deleting connection failed' };
  }
};
