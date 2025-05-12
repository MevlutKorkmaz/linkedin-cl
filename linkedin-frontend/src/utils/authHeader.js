// ✅ utils/authHeader.js

import { getToken } from './tokenUtils';

export const authHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
