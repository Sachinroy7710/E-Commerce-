import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        addToCart: (state, action) => {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        setCart: (state, action) => {
            return action.payload;
        }
    }
});

export const { incrementQuantity, decrementQuantity, deleteFromCart, addToCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
