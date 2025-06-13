// services/authService.js
import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};
