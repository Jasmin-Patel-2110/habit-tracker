import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await api.post("/api/users/register", { email, password });
  return response.data.token;
};

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  const response = await api.post("/api/users/login", { email, password });
  return response.data.token;
};
