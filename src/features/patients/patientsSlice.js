import { createSlice } from "@reduxjs/toolkit";

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your synchronous reducers if needed
  },
});
export default patientsSlice.reducer;
