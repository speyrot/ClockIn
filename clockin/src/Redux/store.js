// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import clockReducer from './reducers/clockReducer'; 

export const store = configureStore({
    reducer: {
        user: userReducer, 
        clock: clockReducer,

    },
});

export default store;
