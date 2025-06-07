import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your synchronous reducers if needed
  },
});
export default authSlice.reducer;
