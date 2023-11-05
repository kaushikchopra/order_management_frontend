import { createSlice, createSelector } from "@reduxjs/toolkit";

const getInitialCartState = () => JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name: "cart",
    // Initialize cart from localStorage or an empty []
    initialState: getInitialCartState(),
    reducers: {
        addItem: (state, action) => {
            const existingProduct = state.find((item) => item._id === action.payload._id);
            if (existingProduct) {
                alert('Product is already in the cart.');
            } else {
                const totalPrice = action.payload.price * action.payload.quantity;
                state.push({ ...action.payload, quantity: 1, totalPrice });

                // Save the updated cart to localStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
        removeItem: (state, action) => {
            const idToRemove = action.payload.id;
            const index = state.findIndex(product => product._id === idToRemove)

            if (index !== -1) {
                state.splice(index, 1);

                // Save the updated cart to localStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, newQuantity, newTotalPrice } = action.payload;
            const itemIndex = state.findIndex((item) => item._id === productId);

            if (itemIndex !== -1) {
                state[itemIndex].quantity = newQuantity;
                state[itemIndex].totalPrice = newTotalPrice;
                // Save the updated cart to localStorage
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
    }
})

export const productsInCart = (state) => state.cart;

export const cartLength = createSelector(
    (state) => state.cart,
    (cart) => cart.length
);

export const { addItem, removeItem, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;