import axios from "axios";

axios.defaults.withCredentials = true;

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://api.skkudo.link"
    : "http://localhost:8000";
