import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity) => {
    const itemExists = cartItems.some(
      (item) => item.product_id=== product.product_id && item.size === size
    );

    if (itemExists) {
      toast.info("Product already exists in your cart.");
      return;
    }

    const newItem = {
      ...product,
      size,
      quantity,
      shippingFee: 40,
    };

    setCartItems((prevItems) => [...prevItems, newItem]);
  };
  const updateCart = (productId, size, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product_id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItem) =>
      prevItem.filter(
        (item) => !(item.product_id === productId && item.size === size)
      )
    );
  };

  const getTotalShippingFees = ()=>{
      return cartItems.reduce((total, item)=>{
        return total + item.shippingFee * item.quantity
      },0)
  }

  const getSubTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product_price * item.quantity;
    }, 0);
  };
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product_price * item.quantity + item.shippingFee;
    }, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        getSubTotalPrice,
        updateCart,
        getTotalShippingFees,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
