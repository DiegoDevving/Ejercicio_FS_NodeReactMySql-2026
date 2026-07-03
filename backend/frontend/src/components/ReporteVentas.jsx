import React, { useState, useEffect } from "react";
// Asumiendo que tienes una función para consultar tu API, ej:
// import { obtenerVentasHoy } from "../services/api"; 
import axios from "axios"; 

function ReporteVentas({ actualizarTrigger }) {
    const [ventas, setVentas] = useState([]);
    const [totalDia, setTotalDia] = useState(0);
    const [cargando, setCargando] = useState(true);

    const cargarReporte = async () => {
        try {
            setCargando(true);
            // Reemplaza con tu ruta exacta o función de services/api
            const respuesta = await axios.get("http://localhost:5000/api/ventas/hoy"); 
            
            setVentas(respuesta.data.ventas);
            setTotalDia(respuesta.data.totalDia);
        } catch (error) {
            console.error("Error al obtener el reporte:", error);
        } finally {
            setCargando(false);
        }
    };

    // 🔥 EN TIEMPO REAL: Cada vez que 'actualizarTrigger' cambie en App.jsx,
    // este useEffect se activará automáticamente sin recargar la página.
    useEffect(() => {
        cargarReporte();
    }, [actualizarTrigger]); 

    if (cargando) return <p>Cargando reporte del día...</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Reporte de Ventas de Hoy</h2>
            <div style={{ background: "#f4f4f4", padding: "10px", marginBottom: "15px" }}>
                <h3>Total Acumulado del Día: ${Number(totalDia).toFixed(2)}</h3>
            </div>

            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ background: "#eaeaea" }}>
                        <th>ID Venta</th>
                        <th>Hora</th>
                        <th>Método de Pago</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                                No se han registrado ventas el día de hoy.
                            </td>
                        </tr>
                    ) : (
                        ventas.map((v) => (
                            <tr key={v.id}>
                                <td style={{ padding: "8px" }}>#{v.id}</td>
                                <td>{v.hora}</td>
                                <td>{v.metodo_pago}</td>
                                <td><strong>${Number(v.total).toFixed(2)}</strong></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ReporteVentas;