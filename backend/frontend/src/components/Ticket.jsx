import React from "react";

function Ticket({ venta }) {
    if (!venta) return null;

    const handlePrintInNewWindow = () => {
    // Diagnóstico previo: Verifiquemos que los datos existan antes de abrir nada
    if (!venta || !venta.productos) {
        console.error("Error: El objeto de la venta o sus productos no están listos.", venta);
        alert("Los datos del ticket no están listos.");
        return;
    }

    const ventanaImpresion = window.open("", "_blank", "width=800,height=600");

    if (!ventanaImpresion) {
        alert("Por favor, permite las ventanas emergentes (pop-ups).");
        return;
    }

    // Aseguramos que el mapeo maneje valores por defecto si algo falla
    const filasProductos = venta.productos.map(producto => `
        <tr>
            <td>${producto.nombre || "Producto sin nombre"}</td>
            <td style="text-align: center;">${producto.cantidad || 0}</td>
            <td>$${Number(producto.precio || 0).toFixed(2)}</td>
            <td>$${((producto.precio || 0) * (producto.cantidad || 0)).toFixed(2)}</td>
        </tr>
    `).join("");

    // Escribimos el cascarón estructural
    ventanaImpresion.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Ticket de Venta</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 8px; }
                th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h2>Ticket de Venta</h2>
            <p><strong>Folio:</strong> ${venta.folio}</p>
            <p><strong>Fecha:</strong> ${venta.fecha}</p>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasProductos}
                </tbody>
            </table>
            <h3 style="text-align: right;">Total: $${Number(venta.total || 0).toFixed(2)}</h3>
        </body>
        </html>
    `);

    // 🔥 LA CLAVE: Forzamos el cierre del flujo y usamos un pequeño delay 
    // para dar tiempo al navegador de asimilar el HTML antes de lanzar el comando de impresión.
    ventanaImpresion.document.close();
    
    setTimeout(() => {
        ventanaImpresion.focus();
        ventanaImpresion.print();
    }, 250); 
};

    return (
        <div className="ticket" style={{ marginTop: "30px", padding: "20px", border: "1px solid black" }}>
            <h2>Venta Registrada Exitosamente</h2>
            <p>Se ha generado el folio: <strong>{venta.folio}</strong></p>
            
            {/* Botón que acciona la nueva ventana */}
            <button 
                onClick={handlePrintInNewWindow}
                style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
            >
                Imprimir ticket
            </button>
        </div>
    );
}

export default Ticket;