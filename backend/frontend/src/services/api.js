import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

export const registrarVenta = (datos) => {

    return api.post("/ventas", datos);

};

export default api;