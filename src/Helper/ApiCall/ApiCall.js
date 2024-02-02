import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (
//       (originalConfig.url !== "auth/admin/login" ||
//         originalConfig.url !== "auth/admin/signup") &&
//       err.response
//     ) {
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         if (originalConfig.url === "auth/admin/token") {
//           window.localStorage.clear();
//         }
//       }
//       if (err.response.status === 400 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         if (
//           err.response.data.message === "Json Web Token is Expired, Try again "
//         ) {
//           const refreshToken = localStorage.getItem("refreshToken");
//           const urlString = "auth/admin/token";
//           const result = await axiosInstance.post(urlString, {
//             refresh_token: refreshToken,
//           });
//           if (result?.data?.success === true) {
//             const accessToken = result.data.data.access_token;
//             const refreshToken = result.data.data.refresh_token;
//             localStorage.setItem("accessToken", accessToken);
//             localStorage.setItem("refreshToken", refreshToken);
//             return axiosInstance(originalConfig);
//           }
//         }
//       }
//     }
//     return err;
//   }
// );
