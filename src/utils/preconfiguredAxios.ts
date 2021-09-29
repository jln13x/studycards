import axios from "axios";

const __prod__ = process.env.NODE_ENV === "production";

const baseURL = __prod__
  ? process.env.REACT_APP_API_URL
  : "http://localhost:3006";

export const preConfiguredAxios = axios.create({
  baseURL: baseURL,
});
