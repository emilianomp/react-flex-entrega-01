// import { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

// export const ContextProvider = (props) => {
//     const [carrito, setCarrito] = useState([]);

//     const agregarAlCarrito = (producto) => {
//         if (carrito.some(el => el.id === producto.id)) {
//             const nuevoCarrito = carrito.map(element => {
//                 if (element.id === producto.id) {
//                     return {
//                         ...element,
//                         cantidad: element.cantidad + producto.cantidad,
//                     };
//                 } else {
//                     return element;
//                 };
//             });
//             setCarrito(nuevoCarrito);
//         } else {
//             setCarrito([...carrito, producto]);
//         };
//         toast('Se agregó un producto correctamente al carrito', {autoClose: 500,});
//     };

//     const limpiarCarrito = () => {
//         setCarrito([]);
//     };

//     // Cantidad de productos
//     // carrito.reduce((acc,value) => acc += value.cantidad, 0)

//     // Precio final
//     // carrito.reduce((acc,value) => acc += (value.cantidad * value.price), 0)

//     return (
//         <AppContext.Provider value={{ carrito, agregarAlCarrito, limpiarCarrito }}>
//             {props.children}
//         </AppContext.Provider>
//     );
// };


import { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const CartContext = createContext();

// Componente proveedor del contexto
export const ContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('carrito');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // 🔁 Actualizar localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // ✅ Agregar un producto al carrito
  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // ✅ Remover un producto por ID
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ Vaciar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Actualizar cantidad de un producto (mínimo 1)
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
  };

  // ✅ Calcular total
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Opcional: obtener cantidad total de ítems (para CartWidget)
  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        updateQuantity,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
