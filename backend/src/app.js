const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productos.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

module.exports = app;