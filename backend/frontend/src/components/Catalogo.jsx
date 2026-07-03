import { useEffect, useState } from "react";
import api from "../services/api";

function Catalogo({ carrito, setCarrito }) {

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {

        try {

            const respuesta = await api.get("/productos");
            setProductos(respuesta.data);

        } catch (error) {

            console.error(error);

        }

    };

    const agregarCarrito = (producto) => {

        const existe = carrito.find(p => p.id === producto.id);

        if (existe) {

            if (existe.cantidad >= producto.stock) {
                alert("No hay más stock disponible");
                return;
            }

            const nuevoCarrito = carrito.map(p =>
                p.id === producto.id
                    ? { ...p, cantidad: p.cantidad + 1 }
                    : p
            );

            setCarrito(nuevoCarrito);

        } else {

            setCarrito([
                ...carrito,
                {
                    ...producto,
                    cantidad: 1
                }
            ]);

        }

    };

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (

        <div>

            <h2>Catálogo de Productos</h2>

            <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <table border="1" cellPadding="8">

                <thead>

                    <tr>

                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {productosFiltrados.map(producto => (

                        <tr key={producto.id}>

                            <td>{producto.nombre}</td>

                            <td>{producto.categoria}</td>

                            <td>${producto.precio}</td>

                            <td>{producto.stock}</td>

                            <td>

                                <button
                                    onClick={() => agregarCarrito(producto)}
                                >
                                    Agregar
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Catalogo;