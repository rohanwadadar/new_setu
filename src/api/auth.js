// import api from "./axios";

// export const loginUser = (data) =>
//   api.post("/api/login", data);

// export const registerUser = (data) =>
//   api.post("/api/register", data);

// export const getProfile = () =>
//   api.get("/api/profile");





// src/api/auth.js

import api from "./axios";

/**
 * 🔐 LOGIN
 * POST /api/login
 */
export const loginUser = (data) => {
  return api.post("/api/login", data);
};

/**
 * 📝 REGISTER
 * POST /api/register
 */
export const registerUser = (data) => {
  return api.post("/api/register", data);
};

/**
 * 👤 GET PROFILE
 * GET /api/profile
 */
export const getProfile = () => {
  return api.get("/api/profile");
};
