import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItem) => [...prevCartItem, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItem) =>
      prevCartItem.filter((item) => item.id !== itemId)
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
