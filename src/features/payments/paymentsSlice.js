import { createSlice } from "@reduxjs/toolkit";

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your synchronous reducers if needed
  },
});
export default paymentsSlice.reducer;
