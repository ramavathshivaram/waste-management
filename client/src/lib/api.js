import api from "./axios.js";

//! Register
export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  console.log(response.data);
  return response.data;
};
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  console.log(response.data);
  return response.data;
};
