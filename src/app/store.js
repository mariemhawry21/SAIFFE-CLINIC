import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import doctorsReducer from "../features/doctors/doctorsSlice";
import patientsReducer from "../features/patients/patientsSlice";
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import paymentsReducer from "../features/payments/paymentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorsReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
    payments: paymentsReducer,
  },
});
