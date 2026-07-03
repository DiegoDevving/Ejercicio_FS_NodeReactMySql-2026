import { useState } from "react";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";

function App() {

  const [carrito, setCarrito] = useState([]);

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
      />

    </div>
  );

}

export default App;