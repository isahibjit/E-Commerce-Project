import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(()=>{
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : []
  });
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cartItems))
  },[cartItems])


  const addToCart = (product, size, quantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === product.id && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      });
      const itemExists = prevItems.some(
        (item) => item.id === product.id && item.size === product.size
      );
      if (!itemExists) {
        const newItem = { ...product, size, quantity };
        return [...prevItems, newItem];
      }
      return updatedItems; //  return the updated data
    });
  };
  const removeFromCart = (productId) => {
    setCartItems((prevItem) =>
      prevItem.filter((item) => item.id !== productId )
    );
  };

  const getTotalPrice = ()=>{
    return cartItems.reduce((total,item)=>{
        return total + item.product_price * item.quantity
    },0)
  } 
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
