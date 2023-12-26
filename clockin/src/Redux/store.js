// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Adjust the path as necessary

export const store = configureStore({
    reducer: rootReducer,
    // middleware can be customized here if needed
});

export default store;
