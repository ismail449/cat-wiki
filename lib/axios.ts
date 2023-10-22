import axios from "axios";

const baseUrl = "https://api.thecatapi.com/v1";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.CAT_API_KEY || "",
  },
});
