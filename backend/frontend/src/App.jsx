import { useState } from "react";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import Ticket from "./components/Ticket";

function App() {

    const [carrito, setCarrito] = useState([]);
    const [venta, setVenta] = useState(null);

    return (

        <div>

            <Catalogo
                carrito={carrito}
                setCarrito={setCarrito}
            />

            <hr />

            <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                setVenta={setVenta}
            />

            <hr />

            <Ticket venta={venta} />

        </div>

    );

}

export default App;