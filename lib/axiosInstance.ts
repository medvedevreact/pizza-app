import axios from "axios";

const instance = axios.create({
  baseURL: "https://pizza-app-neon-zeta.vercel.app/api",
});

export default instance;
