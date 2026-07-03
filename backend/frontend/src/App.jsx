import { useState } from "react";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import Ticket from "./components/Ticket";
import ReporteVentas from "./components/ReporteVentas";

function App() {
    const [carrito, setCarrito] = useState([]);
    const [venta, setVenta] = useState(null);
    
    // 💡 ESTADO NUEVO: Sirve como interruptor en tiempo real
    const [actualizarReporte, setActualizarReporte] = useState(0);

    const dispararActualizacion = () => {
        setActualizarReporte(prev => prev + 1);
    };

    return (
        <div>
            <Catalogo
                carrito={carrito}
                setCarrito={setCarrito}
            />

            <hr />

            {/* 💡 Le pasamos la función para avisar cuando haya una nueva venta */}
            <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                setVenta={setVenta}
                onVentaExitosa={dispararActualizacion}
            />

            <hr />

            <Ticket venta={venta} />
            <hr />

            {/* 💡 Le pasamos el estado para que sepa CUÁNDO volver a cargar */}
            <ReporteVentas actualizarTrigger={actualizarReporte} />
        </div>
    );
}

export default App;