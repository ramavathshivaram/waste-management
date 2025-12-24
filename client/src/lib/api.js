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

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

//! ---------------------- PICKUP REQUEST FUNCTIONS ----------------------

export const createPickupRequest = async (data) => {
  console.log(data);
  const response = await api.post("/pickup/create", data);
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

export const getCollector = async () => {
  const response = await api.get("/collector");
  return response.data.data;
};

export const createCollector = async (data) => {
  const response = await api.post("/collector", data);
  return response.data.data;
};

export const updateCollector = async (formData) => {
  console.log(formData);
  const response = await api.patch("/collector", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const getAllPendingPickups = async () => {
  const response = await api.get("/collector/pickups/pending");
  return response.data.data;
};

export const getCollectorMe = async () => {
  const response = await api.get("/collector/me");
  return response.data.data;
};

//! ---------------------- CENTRE FUNCTIONS ----------------------

export const getCentreDashboard = async () => {
  const response = await api.get("/centre/dashboard");
  return response.data.data;
};

export const getCentresNearByLocations = async (longitude, latitude) => {
  console.log(longitude, latitude);
  const response = await api.get(`/centre/locations/${longitude},${latitude}`);
  return response.data.data;
};

export const createCentre = async (data) => {
  const response = await api.post("/centre", data);
  return response.data.data;
};

//! ---------------------- ADMIN FUNCTIONS ----------------------

export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data.data;
};
export const getAdminPickups = async () => {
  const response = await api.get("/admin/pickups");
  return response.data.pickups;
};
export const getAdminIllegalDumps = async () => {
  const response = await api.get("/admin/illegal-dumps");
  return response.data.data;
};

export const getAllCollectors = async () => {
  const response = await api.get("/admin/collectors");
  return response.data.data;
};
export const getAllCentres = async () => {
  const response = await api.get("/admin/centres");
  return response.data.data;
};

export const getAllLocations = async () => {
  const response = await api.get("/admin/locations");
  return response.data.data;
};
export const getAdminCollectorById = async (id) => {
  console.log(id);
  const response = await api.get(`/admin/collector/${id}`);
  return response.data.data;
};
export const getAdminCentreById = async (id) => {
  const response = await api.get(`/admin/centre/${id}`);
  return response.data.data;
};

export const approve = async ({ id, status, areaId, label }) => {
  const response = await api.patch(`/admin/approve/${id}`, {
    status,
    areaId,
    label,
  });
  return response.data.data;
};

export const getAllAreas = async () => {
  const response = await api.get("/area");
  return response.data.data;
};

export const getCollectorStatsByDate = async ({ date, collectorId }) => {
  const response = await api.get(
    `/admin/collector/stats/${date}/${collectorId}`
  );
  return response.data.data;
};

//! ---------------------- AREA FUNCTIONS ----------------------

export const getAllAreasUnassignedCollectors = async () => {
  const response = await api.get("/area/unassigned/collectors");
  return response.data.data;
};

export const getAllAreasUnassignedCentres = async () => {
  const response = await api.get("/area/unassigned/centres");
  return response.data.data;
};

export const createArea = async (data) => {
  console.log(data);
  const response = await api.post("/area", data);
  return response.data.data;
};

export const getAreaById = async (id) => {
  const response = await api.get(`/area/${id}`);
  return response.data.data;
};

export const updateArea = async ({ id, payload }) => {
  const response = await api.put(`/area/${id}`, payload);
  return response.data.data;
};

export const deleteArea = async (id) => {
  const response = await api.delete(`/area/${id}`);
  return response.data.data;
};
