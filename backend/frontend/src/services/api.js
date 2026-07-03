import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const registrarVenta = (datos) => {

    return api.post("/ventas", datos);

};

export const obtenerVentasHoy = () => {

    return api.get("/ventas/hoy");

};

export default api;