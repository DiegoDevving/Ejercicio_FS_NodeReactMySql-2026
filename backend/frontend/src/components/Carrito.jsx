import React from "react";
import { registrarVenta } from "../services/api";

function Carrito({ carrito, setCarrito }) {

    const aumentar = (id) => {
        const nuevoCarrito = carrito.map(producto => {
            if (producto.id === id) {
                if (producto.cantidad >= producto.stock) {
                    alert("Stock insuficiente");
                    return producto;
                }
                return {
                    ...producto,
                    cantidad: producto.cantidad + 1
                };
            }
            return producto;
        });
        setCarrito(nuevoCarrito);
    };

    const disminuir = (id) => {
        const nuevoCarrito = carrito
            .map(producto => {
                if (producto.id === id) {
                    return {
                        ...producto,
                        cantidad: producto.cantidad - 1
                    };
                }
                return producto;
            })
            .filter(producto => producto.cantidad > 0);
        setCarrito(nuevoCarrito);
    };

    const eliminar = (id) => {
        setCarrito(
            carrito.filter(producto => producto.id !== id)
        );
    };

    const total = carrito.reduce(
        (acumulado, producto) =>
            acumulado + (producto.precio * producto.cantidad),
        0
    );

    // 💡 Movido arriba antes del return para que sea accesible y ejecutable
    const confirmarVenta = async () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    try {
        await registrarVenta({
            carrito,
            metodo_pago: "efectivo"
        });

        alert("Venta realizada con éxito");
        setCarrito([]);

    } catch (error) {

        console.log(error);
        console.log(error.response);
        console.log(error.response?.data);

        alert(JSON.stringify(error.response?.data));
    }
};

    return (
        <div>
            <h2>Carrito</h2>

            <table border="1">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        carrito.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    $ {(producto.precio * producto.cantidad).toFixed(2)}
                                </td>
                                <td>
                                    <button onClick={() => aumentar(producto.id)}>+</button>
                                    <button onClick={() => disminuir(producto.id)}>-</button>
                                    <button onClick={() => eliminar(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <h2>Total: ${total.toFixed(2)}</h2>
            
            {/* 💡 El botón ahora está integrado correctamente dentro del árbol de componentes JSX */}
            <button 
                onClick={confirmarVenta}
                style={{ marginTop: "15px", padding: "8px 16px", cursor: "pointer" }}
            >
                Confirmar venta
            </button>
        </div>
    );
}

export default Carrito;