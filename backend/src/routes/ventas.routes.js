const express = require("express");

const router = express.Router();

const {
    registrarVenta,
    obtenerVentasHoy
} = require("../controllers/ventas.controller");
router.post("/", registrarVenta);
router.get("/hoy", obtenerVentasHoy);

module.exports = router;