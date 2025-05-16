import React, { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCartItem = []) => {
      const exists = prevCartItem.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return prevCartItem;
      }
      return [...prevCartItem, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItem) =>
      prevCartItem.filter((item) => item.id !== itemId)
    );
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prevCartItem) =>
      prevCartItem.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
