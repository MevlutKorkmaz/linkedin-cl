import axios from './axiosInstance';
import { authHeader } from '../utils/authHeader';

/**
 * Send a connection request
 */
export const sendConnectionRequest = async (connectionData) => {
  try {
    console.log("📤 Sending connection request:", connectionData);
    const response = await axios.post('/connections', connectionData, {
      headers: authHeader(),
    });
    console.log("✅ Request sent. Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Sending connection request failed:", error.response?.data || error);
    throw error.response?.data || { message: 'Sending connection request failed' };
  }
};

/**
 * Accept or reject a connection request
 */
export const respondToConnectionRequest = async (connectionId, accept) => {
  try {
    console.log(`📥 Responding to connection ${connectionId}, accept: ${accept}`);
    const response = await axios.post(`/connections/${connectionId}/respond?accept=${accept}`, {}, {
      headers: authHeader(),
    });
    console.log("✅ Response updated. Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Responding to connection failed:", error.response?.data || error);
    throw error.response?.data || { message: 'Responding to connection failed' };
  }
};

/**
 * Fetch all connection objects where the user is involved
 */
export const getUserConnections = async (userId) => {
  try {
    console.log("🔍 Fetching connections for user:", userId);
    const response = await axios.get(`/connections/users/${userId}/full`, {
      headers: authHeader(),
    });
    console.log("📥 Connections received:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("❌ Fetching connections failed:", error.response?.data || error);
    throw error.response?.data || { message: 'Fetching connections failed' };
  }
};


/**
 * Delete a connection by ID
 */
export const deleteConnection = async (connectionId) => {
  try {
    console.log("🗑️ Deleting connection:", connectionId);
    const response = await axios.delete(`/connections/${connectionId}`, {
      headers: authHeader(),
    });
    console.log("✅ Connection deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Deleting connection failed:", error.response?.data || error);
    throw error.response?.data || { message: 'Deleting connection failed' };
  }
};

/**
 * Search users by keyword (for connection search)
 */
export const searchUsers = async (keyword) => {
  try {
    console.log("🔍 Searching users with keyword:", keyword);
    const res = await axios.get(`/search/users?keyword=${keyword}`, {
      headers: authHeader(),
    });
    console.log("📃 Search results:", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("❌ User search failed:", err.response?.data || err);
    throw err.response?.data || { message: 'User search failed' };
  }
};
