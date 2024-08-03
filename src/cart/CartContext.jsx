import React, {createContext, useState, useContext, useEffect} from 'react'

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartitems] = useState([]);

    useEffect(() => {
        const savedCart = sessionStorage.getItem('cartItems');
        if (savedCart) {
            setCartitems(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (item) => {
        setCartitems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name);

            if (existingItemIndex >= 0) {
                
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] ={ 
                    ...updatedItems[existingItemIndex],
                    itemCount : (updatedItems[existingItemIndex].itemCount || 1) + 1
                };
                sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            }
            else {
                return [...prevItems, {...item, itemCount: 1}];
            }
        });
    };


    const decrementCount = (item) => {
        setCartitems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name);
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    itemCount: (updatedItems[existingItemIndex].itemCount) - 1
                };
                sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            }
            else {
                return prevItems;
            }
        });
    };

    const setItemTotalPrice = (item, price) => {
        setCartitems((prevItems) => {   
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name);
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    totalPrice: price
                };
                sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            }
            else {
                return prevItems;
            }
        });
    }

    const removeFromCart = (item) => {
        setCartitems((prevItems) => {  
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.name === item.name);
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    itemCount: (updatedItems[existingItemIndex].itemCount || 1) - 1
                };
                if (updatedItems[existingItemIndex].itemCount <= 0) {
                    updatedItems.splice(existingItemIndex, 1);
                }
                sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
                return updatedItems;
            }    
            else {
                return prevItems;
            }
        }
        )};
    
    const getItemCount = (item) => {
        const cartItem = cartItems.find((cartItem) => cartItem.name === item.name);
        return cartItem ? cartItem.itemCount : 0;
    }
    
    
    const getTotalPrice = () => {
        const total = cartItems.reduce((sometotal, item) => sometotal + item.totalPrice, 0);
        return total.toFixed(2);
    };

    return (
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart, getItemCount, getTotalPrice, decrementCount, setItemTotalPrice}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext);
}