import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

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
