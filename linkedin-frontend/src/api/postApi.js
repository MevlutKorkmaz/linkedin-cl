// ✅ api/postApi.js

import axios from './axiosInstance';

export const createPost = async (postData) => {
  try {
    const response = await axios.post('/posts', postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Creating post failed' };
  }
};

export const getPublicPosts = async () => {
  try {
    const response = await axios.get('/posts/public');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching public posts failed' };
  }
};

export const likePost = async (postId, userId) => {
  try {
    const response = await axios.post(`/posts/${postId}/like?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Liking post failed' };
  }
};

export const sharePost = async (postId, userId) => {
  try {
    const response = await axios.post(`/posts/${postId}/share?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Sharing post failed' };
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Deleting post failed' };
  }
};
