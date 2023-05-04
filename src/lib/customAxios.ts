import axios from "axios";
import { RESOURCE_PATH } from "../constant";

const customAxios = axios.create({
  baseURL: RESOURCE_PATH,
});

export default customAxios;
