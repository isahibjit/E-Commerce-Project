import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (product, size, quantity) => {
        const item = { ...product, size, quantity }
        setCartItems(prev => [...prev, item])
    };
    return (
        <CartContext.Provider value={{cartItems,addToCart}}>
            {children}
        </CartContext.Provider>
    )

}