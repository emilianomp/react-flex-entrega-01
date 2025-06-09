import { useEffect, useState } from 'react';
import './Contador.css';

function Contador() {
    const [cantidad, setCantidad] = useState(1);

    function restarCantidad() {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        };
    };
    
    function sumarCantidad() {
        if (cantidad < 10) {
            setCantidad(cantidad + 1);
        };
    };

    useEffect(() => {
        console.log("Se cambió el valor del contador. Ahora vale " + cantidad);
    },[cantidad]);

    return (
        <div style={{ display: "flex", gap: "1rem", margin: "1rem 0", alignItems: "center", justifyContent: "center" }}>
            <button className="btn btn-secondary" onClick={restarCantidad}>-</button>
            <p>{cantidad}</p>
            <button className="btn btn-secondary" onClick={sumarCantidad}>+</button>
        </div>
    );
};

export default Contador;