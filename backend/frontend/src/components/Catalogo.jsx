import { useEffect, useState } from "react";
import api from "../services/api";

function Catalogo() {

    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState("");

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async () => {

        try {

            const respuesta = await api.get("/productos");

            setProductos(respuesta.data);
            setBusqueda(respuesta.data);

        } catch (error) {

            console.log(error);

        }

    };

    const buscarProducto = (e) => {

        const texto = e.target.value;

        setTextoBuscar(texto);

        const resultado = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(texto.toLowerCase())
        );

        setBusqueda(resultado);

    };

    const agregarCarrito = (producto) => {

        alert(`${producto.nombre} agregado al carrito`);

    };

    return (

        <div>

            <h2>Catálogo de Productos</h2>

            <input
                type="text"
                placeholder="Buscar producto..."
                value={textoBuscar}
                onChange={buscarProducto}
            />

            <table border="1">

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

                    {busqueda.map(producto => (

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