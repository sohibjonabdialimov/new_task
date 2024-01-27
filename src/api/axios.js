import axios from "axios";

const BASE_URL = "https://reqres.in";

const axiosT = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

export default axiosT;