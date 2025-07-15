import axios from "axios";
export const axiosInstance=axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5050/api",

    withCredentials:true

});