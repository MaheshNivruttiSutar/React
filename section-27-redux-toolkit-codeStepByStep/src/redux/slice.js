import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            state.value += 1;
        },
        removeItem: (state, action) => {
            const productId = action.payload;
            const index = state.items.findIndex((item) => item.id === productId);

            if (index === -1) return;

            const item = state.items[index];

            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items.splice(index, 1);
            }

            if (state.value > 0) state.value -= 1;
        },
        clearAllItems: (state) => {
            state.value = 0;
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearAllItems } = cartSlice.actions;
export default cartSlice.reducer;
