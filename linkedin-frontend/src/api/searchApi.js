// ✅ api/searchApi.js

import axios from './axiosInstance';

export const searchUsers = async (keyword) => {
  try {
    const response = await axios.get(`/search/users?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'User search failed' };
  }
};

export const searchPosts = async (keyword) => {
  try {
    const response = await axios.get(`/search/posts?keyword=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Post search failed' };
  }
};

export const searchJobs = async (params) => {
  const query = new URLSearchParams(params).toString();
  try {
    const response = await axios.get(`/search/jobs?${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Job search failed' };
  }
};
