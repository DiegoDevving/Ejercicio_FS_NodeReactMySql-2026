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
                    producto.cantidad,
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

};

module.exports = {
    registrarVenta
};