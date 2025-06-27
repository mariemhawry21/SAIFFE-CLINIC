

// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import contactReducer from '../features/contact/contactSlice';
import patientReducer from '../features/patient/patientSlice';



export const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    patient: patientReducer,

  },
});