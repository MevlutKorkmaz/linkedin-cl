import axiosInstance from "./axiosInstance";

export const getCompanyById = (id) => {
  return axiosInstance.get(`/company/${id}`);
};

export const updateCompanyProfile = (data) => {
  return axiosInstance.put("/company/update", data);
};

export const getAllCompanies = () => {
  return axiosInstance.get("/company/all");
};
