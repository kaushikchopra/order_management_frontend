import axios from "axios";

const BASE_URL = "http://localhost:8070";

export default axios.create({
    baseURL: BASE_URL,
});