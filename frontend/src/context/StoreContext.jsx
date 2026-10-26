import { useState } from 'react';
import { food_list } from '../assets/assets';
import { StoreContext } from './StoreContext.js';

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    const addToCart = (foodId) => {
        setCartItems((currentItems) => ({
            ...currentItems,
            [foodId]: (currentItems[foodId] ?? 0) + 1,
        }));
    };

    const removeFromCart = (foodId) => {
        setCartItems((currentItems) => {
            const quantity = currentItems[foodId] ?? 0;
            if (quantity <= 1) {
                const nextItems = { ...currentItems };
                delete nextItems[foodId];
                return nextItems;
            }

            return {
                ...currentItems,
                [foodId]: quantity - 1,
            };
        });
    };

    const clearCart = () => setCartItems({});

    const contextValue = {
        food_list,
        cartItems,
        searchTerm,
        setSearchTerm,
        addToCart,
        removeFromCart,
        clearCart,
        getCartSubtotal: () => food_list.reduce(
            (subtotal, food) => subtotal + food.price * (cartItems[food._id] ?? 0),
            0,
        ),
        getCartItemCount: () => Object.values(cartItems).reduce(
            (count, quantity) => count + quantity,
            0,
        ),
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;