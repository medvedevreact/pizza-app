import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.elpizza-korolev.ru/api",
});

export default instance;
