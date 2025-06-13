import { createSlice } from "@reduxjs/toolkit";

// store/doctorsSlice.js
const initialState = {
  doctors: [],
  currentDoctor: null,
  loading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    fetchDoctorsStart(state) {
      state.loading = true;
    },
    fetchDoctorsSuccess(state, action) {
      state.doctors = action.payload;
      state.loading = false;
    },
    fetchDoctorProfileSuccess(state, action) {
      state.currentDoctor = action.payload;
    },
  },
});
export const { fetchDoctorsStart} = doctorsSlice.actions;

export default doctorsSlice.reducer;
