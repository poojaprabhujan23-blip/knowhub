import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const forgotPassword = (email) =>API.post("/forgot-password", { email });
export const resetPassword = (token, password) => API.post(`/api/auth/reset-password/${token}`, { password });