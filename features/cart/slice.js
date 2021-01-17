import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, {payload}) => { state.items.push(payload) },
        removeItem: (state, {payload}) => {
            state.items.splice(payload, 1);
        }
    }
});

export default cartSlice.reducer;
export const {
    addItem,
    removeItem
} = cartSlice.actions;

export const selectTotal = state => {
    let total = 0;

    for (const { sizes, selectedSize } of state.cart.items) {
        total = total + sizes[selectedSize].price;
    }

    return total;
};

export const selectBonusPoints = state => {
    let total = 0;

    for (const { sizes, selectedSize } of state.cart.items) {
        total = total + sizes[selectedSize].price;
    }

    return total * .25;
};