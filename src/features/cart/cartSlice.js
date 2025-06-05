// import { createSlice } from '@reduxjs/toolkit';
// const initialState = {
//   cart: [],
// };
// //cart will be empty array but this data for test only

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addItem: (state, action) => {
//       const existingItem = state.cart?.find((item) => item.pizzaId === action.payload.pizzaId);
//       //   state.username = action.payload;
//       if (existingItem) {
//         existingItem.quantity++;
//         existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1, totalPrice: action.payload.unitPrice });
//       }
//     },
//     deleteItem: (state, action) => {
//       state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
//     },
//     increaseItem: (state, action) => {
//       const oldItem = state.cart.find((item) => item.pizzaId === action.payload);
//       oldItem.quantity++;
//       oldItem.totalPrice = oldItem.quantity * oldItem.unitPrice;
//     },
//     decreaseItem: (state, action) => {
//       const oldItem = state.cart.find((item) => item.pizzaId === action.payload);
//       if (oldItem.quantity === 1) {
//         state.cart = state.cart.filter((i) => i.pizzaId !== action.payload);
//       } else {
//         oldItem.quantity--;
//         oldItem.totalPrice = oldItem.quantity * oldItem.unitPrice;
//       }
//     },
//     clearCart: (state, action) => {
//       state.cart = [];
//     },
//   },
// });

// export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';
import { toast } from 'react-toastify';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find((item) => item.pizzaId === action.payload.pizzaId);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
        toast.success(`Increased ${action.payload.name} quantity to ${existingItem.quantity}`);
      } else {
        state.cart.push({ ...action.payload, quantity: 1, totalPrice: action.payload.unitPrice });
        toast.success(`${action.payload.name} added to cart`);
      }
    },
    deleteItem: (state, action) => {
      const deletedItem = state.cart.find((item) => item.pizzaId === action.payload);
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      toast.error(`Removed ${deletedItem.name} from cart`);
    },
    increaseItem: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
      toast.success(`Increased ${item.name} quantity to ${item.quantity}`);
    },
    decreaseItem: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1) {
        // state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
        cartSlice.caseReducers.deleteItem(state, action);

        toast.error(`Removed ${item.name} from cart`);
      } else {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        toast.success(`Decreased ${item.name} quantity to ${item.quantity}`);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      toast.error('Cart cleared');
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

//selectors

export const getCard = (state) => {
  return state.cart?.cart;
};

export const getTotalCartItem = (state) => {
  return state.cart?.cart.reduce((acc, cur) => acc + cur.quantity, 0);
};

export const getTotalCartPrice = (state) => {
  return state.cart?.cart.reduce((acc, item) => acc + item.totalPrice, 0);
};

export const isInCart = (pizzaId) => (state) => Boolean(state.cart.cart.find((item) => item.pizzaId === pizzaId));
