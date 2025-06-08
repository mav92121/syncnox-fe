import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`, // Ensure VITE_SERVER_URL is in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Request interceptor (e.g., for adding auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    // Example: Retrieve token from localStorage
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor (e.g., for global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error or show a notification to the user
    console.error("API Error:", error.response?.data || error.message);
    // Example: if (error.response?.status === 401) { /* handle unauthorized */ }
    return Promise.reject(error);
  }
);

export default apiClient;
