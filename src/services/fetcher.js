import axios from "axios";

const fetcher = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.7A1g8RqPPK_ttr9NYitsWT7Cbe11nz4qye-QxZ_b8fk",
    // Authorization:`Bearer ${localStorage.getItem("accessToken") || ""}`,
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).accessToken
        : ""
    }`,
  },
});

fetcher.interceptors.response.use(
  (response) => {
    return response.data.content;
  },
  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

export default fetcher;
