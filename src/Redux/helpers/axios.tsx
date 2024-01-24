import axios from "axios";

export const axiosService = axios.create({
  baseURL: "https://dev.eleliafrika.com",
  // baseURL: 'http://192.168.0.112:8000',
});

// Add a response interceptor to handle errors
axiosService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 400) {
      // Log the error response body
      console.error("Error Response Body:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// Add a request interceptor
axiosService.interceptors.request.use(async (req) => {
  let token = localStorage.getItem("userToken");
  if (token) {
    req.headers["x-access-token"] = token;
  }

  return req;
});
