// ✅ api/profileApi.js

import axios from './axiosInstance';

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put('/api/profile/update', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Profile update failed' };
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/api/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching user profile failed' };
  }
};

export const addExperience = async (experienceData) => {
  try {
    const response = await axios.post('/api/profile/experience', experienceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Adding experience failed' };
  }
};

export const addEducation = async (educationData) => {
  try {
    const response = await axios.post('/api/profile/education', educationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Adding education failed' };
  }
};
