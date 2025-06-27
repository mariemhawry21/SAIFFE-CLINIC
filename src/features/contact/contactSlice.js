// src/features/contact/contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import contactService from '../../services/contactService';

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await contactService.submitContactForm(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send message. Please try again.'
      );
    }
  }
);

const initialState = {
  loading: false,
  success: false,
  error: null,
  submissions: []
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    resetContactState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit contact form
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // Optionally store the submission
        state.submissions.push(action.payload);
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  }
});

export const { clearContactStatus, resetContactState } = contactSlice.actions;
export default contactSlice.reducer;