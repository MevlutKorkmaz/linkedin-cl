// ✅ api/adminApi.js

import axios from './axiosInstance';

export const blockUser = async (blockData) => {
  try {
    const response = await axios.put('/api/admin/block-user', blockData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Blocking user failed' };
  }
};

export const deletePostByAdmin = async (postId) => {
  try {
    const response = await axios.delete(`/api/admin/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Deleting post failed' };
  }
};

export const deleteCommentByAdmin = async (commentId) => {
  try {
    const response = await axios.delete(`/api/admin/delete-comment/${commentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Deleting comment failed' };
  }
};

