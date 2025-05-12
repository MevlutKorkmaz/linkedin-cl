// ✅ api/jobApi.js

import axios from './axiosInstance';

export const getAllJobs = async () => {
  try {
    const response = await axios.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Fetching jobs failed' };
  }
};

export const createJob = async (jobData) => {
  try {
    const response = await axios.post('/api/jobs', jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Creating job failed' };
  }
};

export const applyToJob = async (jobId, userId) => {
  try {
    const response = await axios.post(`/api/jobs/${jobId}/apply?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Applying to job failed' };
  }
};

export const searchJobsByCategory = async (category) => {
  try {
    const response = await axios.get(`/api/jobs/category?category=${category}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Category search failed' };
  }
};

export const searchJobsByLocation = async (location) => {
  try {
    const response = await axios.get(`/api/jobs/location?location=${location}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Location search failed' };
  }
};
