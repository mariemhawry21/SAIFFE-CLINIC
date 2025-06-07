import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Async sample
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    const res = await fetch("/api/doctors");
    return await res.json();
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;
