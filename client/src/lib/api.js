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

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  console.log(response.data);
  return response.data;
};
export const createPickupRequest = async (data) => {
  console.log(data);
  const response = await api.post("/pickup/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response.data);
  return response.data;
};
