import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import  useReducer from '../features/users/UserSlice';


export const store = configureStore({
  reducer: {
      user:useReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
