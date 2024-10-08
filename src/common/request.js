import axios from "axios";
import { getCookie } from "@/common";
let baseURL = import.meta.env.VITE_MODE_NAME == "development" ? "/api" : import.meta.env.VITE_API_URL;
let instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json;charset=UTF-8"
  }
});
instance.interceptors.request.use(
  (config) => {
    let token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);
instance.interceptors.response.use(
  (res) => {
    const { data, status } = res;
    console.log("status: ", status);
    /* 请求失败 */
    if (data.code !== 0) {
      if (data?.msg || data?.message) {
        window.$message.error(data?.msg || data?.message);
      }
    } else {
      return data.data;
    }
  },
  ({
    response: {
      data: { errmsg }
    }
  }) => {
    window.$message.error(errmsg);
  }
);

export default instance;
