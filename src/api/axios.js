import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });


// 🔐 Attach access token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔄 Auto refresh access token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/api/refresh"
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/refresh");
        const newToken = res.data.access_token;

        localStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    // ----------------------------------------------------------------
    // 🛑 PREVIOUS BUGGY CODE (Infinite Loop on Refresh Failure)
    // ----------------------------------------------------------------
    // if (
    //   error.response?.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;
    //
    //   try {
    //     const res = await api.post("/api/refresh");
    //     const newToken = res.data.access_token;
    //
    //     localStorage.setItem("token", newToken);
    //     originalRequest.headers.Authorization = `Bearer ${newToken}`;
    //
    //     return api(originalRequest);
    //   } catch (err) {
    //     localStorage.removeItem("token");
    //     window.location.href = "/login";
    //   }
    // }
    // ----------------------------------------------------------------

    return Promise.reject(error);
  }
);










export default api;
