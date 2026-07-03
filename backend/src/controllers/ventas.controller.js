const pool = require("../config/db");

const registrarVenta = async (req, res) => {
    const { carrito, metodo_pago } = req.body;
    const conexion = await pool.getConnection();

    try {
        await conexion.beginTransaction();

        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });

        const [venta] = await conexion.query(
            "INSERT INTO ventas(total, metodo_pago) VALUES (?,?)",
            [total, metodo_pago]
        );

        const ventaId = venta.insertId;

        for (const producto of carrito) {
            const subtotal = producto.precio * producto.cantidad;

            await conexion.query(
                `INSERT INTO venta_detalle
                (venta_id,producto_id,cantidad,precio_unitario,subtotal)
                VALUES(?,?,?,?,?)`,
                [
                    ventaId,
                    producto.id,
                    producto.cantidad,
                    producto.precio,
                    subtotal
                ]
            );

            await conexion.query(
                `UPDATE productos
                 SET stock = stock - ?
                 WHERE id=?`,
                [
                    producto.amount || producto.cantidad, // Asegurando la variable
                    producto.id
                ]
            );
        }

        await conexion.commit();

        res.json({
            mensaje: "Venta registrada correctamente"
        });

    } catch (error) {
        await conexion.rollback();
        res.status(500).json({
            mensaje: error.message
        });
    } finally {
        conexion.release();
    }
}; // 💡 AQUÍ SE CIERRA correctamente registrarVenta

// 💡 Ahora obtenerVentasHoy es una función independiente
const obtenerVentasHoy = async (req, res) => {
    try {
        const [ventas] = await pool.query(
            `SELECT
                id,
                TIME(fecha) AS hora,
                total,
                metodo_pago
            FROM ventas
            WHERE DATE(fecha) = CURDATE()
            ORDER BY fecha DESC`
        );

        const [acumulado] = await pool.query(
            `SELECT
                IFNULL(SUM(total),0) AS totalDia
            FROM ventas
            WHERE DATE(fecha)=CURDATE()`
        );

        res.json({
            ventas,
            totalDia: acumulado[0].totalDia
        });

    } catch (error) {
        res.status(500).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    registrarVenta,
    obtenerVentasHoy
};