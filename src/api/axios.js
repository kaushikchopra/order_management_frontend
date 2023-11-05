import axios from "axios";

const BASE_URL = "https://order-management-mb7d.onrender.com";

export default axios.create({
    baseURL: BASE_URL,
});