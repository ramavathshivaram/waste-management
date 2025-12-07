import api from "./axios.js";

//! ---------------------- AUTH FUNCTIONS ----------------------

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getMe = async (data) => {
  const response = await api.get("/auth/me", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

//! ---------------------- PICKUP REQUEST FUNCTIONS ----------------------

export const createPickupRequest = async (data) => {
  console.log(data);
  const response = await api.post("/pickup/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUserPickupRequests = async () => {
  const response = await api.get("/pickup");
  return response.data;
};

//! ---------------------- ILLEGAL DUMP FUNCTIONS ----------------------

export const createIllegalDump = async (formData) => {
  const response = await api.post("/illegal-dump/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getUserDumps = async () => {
  const response = await api.get("/illegal-dump");
  return response.data;
};

//! ---------------------- COLLECTOR FUNCTIONS ----------------------

export const getCollectors = async () => {
  const response = await api.get("/collector");
  return response.data.data;
};

export const updateCollector = async (formData) => {
  console.log(formData);
  const response = await api.patch("/collector", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

//! ---------------------- CENTRE FUNCTIONS ----------------------

export const getCentre = async () => {
  const response = await api.get("/centre");
  return response.data.data;
};

//! ---------------------- ADMIN FUNCTIONS ----------------------

export const getAdmin = async () => {
  const response = await api.get("/admin");
  return response.data;
};
export const getAdminPickups = async () => {
  const response = await api.get("/admin/pickups");
  return response.data.pickups;
};

export const getAdminApprovals = async () => {
  const response = await api.get("/admin/approvals");
  return response.data.data;
};
export const getAdminCollectorById = async (id) => {
  const response = await api.get(`/admin/collector/${id}`);
  return response.data.data;
};
export const getAdminCentreById = async (id) => {
  const response = await api.get(`/admin/centre/${id}`);
  return response.data.data;
};

export const approveCollector = async ({ id, isApproved }) => {
  console.log(id, isApproved);
  const response = await api.patch(`/admin/collector/${id}`, { isApproved });
  return response.data.data;
};
