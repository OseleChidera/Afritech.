import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'
import { userSlice } from './user';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});