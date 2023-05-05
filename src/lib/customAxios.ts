import axios from "axios";
import { RESOURCE_PATH } from "../constant";

const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const customAxios = axios.create({
  baseURL: `${PROXY}${RESOURCE_PATH}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default customAxios;
