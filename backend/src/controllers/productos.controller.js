const pool = require('../config/db');

// Obtener todos los productos activos
const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM productos WHERE activo = true"
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Obtener producto por ID
const obtenerProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            "SELECT * FROM productos WHERE id = ? AND activo = true",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// Crear producto
const crearProducto = async (req, res) => {

    const { nombre, precio, stock, categoria } = req.body;

    if (isNaN(precio) || isNaN(stock)) {
        return res.status(400).json({
            mensaje: "Precio y stock deben ser numéricos"
        });
    }

    try {

        const [result] = await pool.query(
            "INSERT INTO productos(nombre,precio,stock,categoria) VALUES(?,?,?,?)",
            [nombre, precio, stock, categoria]
        );

        res.status(201).json({
            mensaje: "Producto creado",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

};

// Actualizar producto
const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    const { nombre, precio, stock, categoria } = req.body;

    if (isNaN(precio) || isNaN(stock)) {
        return res.status(400).json({
            mensaje: "Precio y stock deben ser numéricos"
        });
    }

    try {

        const [result] = await pool.query(
            `UPDATE productos
             SET nombre=?, precio=?, stock=?, categoria=?
             WHERE id=?`,
            [nombre, precio, stock, categoria, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto actualizado"
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

};

// Eliminación lógica
const eliminarProducto = async (req, res) => {

    const { id } = req.params;

    try {

        const [result] = await pool.query(
            "UPDATE productos SET activo=false WHERE id=?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto eliminado"
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};