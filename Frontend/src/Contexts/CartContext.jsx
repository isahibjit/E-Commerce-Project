import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (product, size, quantity) => {
        const item = { ...product, size, quantity }
        setCart(prev => [...prev, item])
    };
    return (
        <CartContext.Provider value={(cart,addToCart)}>
            {children}
        </CartContext.Provider>
    )

}