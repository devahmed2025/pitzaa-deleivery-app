// configureStore will automatically handle the creation of the store combine the reducers and apply the middleware
import { configureStore } from '@reduxjs/toolkit';
//reducers

import userSlice from './src/features/user/userSlice';
import cartSlice from './src/features/cart/cartSlice';
import darkModeReducer from './src/features/darkMode/darkModeSlice';

// store reducer to combine all reducers

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    darkMode: darkModeReducer,
    // customer: CustomerReducer,
  },
});
export default store;

// now we need to install redux dev tools extension
// npm install --save-dev redux-devtools-extension
