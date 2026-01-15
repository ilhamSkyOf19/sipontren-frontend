import axios from "axios";

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 2000,
  withCredentials: true,
});

AXIOS.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 🔴 TIMEOUT
    if (error.code === "ECONNABORTED") {
      // console.error("Request timeout");
      // alert("Koneksi terlalu lama, silakan coba lagi");
      return (window.location.href = "/");
    }

    // autorized
    if (error.response?.status === 401) {
      // redirect ke halaman login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// export
export default AXIOS;
