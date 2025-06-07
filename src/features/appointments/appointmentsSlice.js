import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointment",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your synchronous reducers if needed
  },
});
export default appointmentsSlice.reducer;
