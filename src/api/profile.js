// import api from "./axios";

// // GET logged-in user's profile
// export const getProfile = () => {
//   return api.get("/api/profile");
// };Z

// // UPDATE profile
// export const updateProfile = (data) => {
//   return api.put("/api/profile", data);
// };



// src/api/profile.js
import api from "./axios";

/**
 * 👤 Get logged-in user's profile
 */
export const getProfile = () => {
  return api.get("/api/profile");
};

/**
 * ✏️ Update user profile
 */
export const updateProfile = (data) => {
  return api.put("/api/profile", data);
};
