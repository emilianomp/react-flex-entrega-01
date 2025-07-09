import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        if (carrito.some(el => el.id === producto.id)) {
            const nuevoCarrito = carrito.map(element => {
                if (element.id === producto.id) {
                    return {
                        ...element,
                        cantidad: element.cantidad + producto.cantidad,
                    };
                } else {
                    return element;
                };
            });
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, producto]);
        };
        toast('Se agregó un producto correctamente al carrito', {autoClose: 500,});
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    // Cantidad de productos
    // carrito.reduce((acc,value) => acc += value.cantidad, 0)

    // Precio final
    // carrito.reduce((acc,value) => acc += (value.cantidad * value.price), 0)

    return (
        <AppContext.Provider value={{ carrito, agregarAlCarrito, limpiarCarrito }}>
            {props.children}
        </AppContext.Provider>
    );
};