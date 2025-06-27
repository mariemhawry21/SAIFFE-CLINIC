// features/patient/patientSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import patientService from '../../services/patientService';

// Async Thunks
export const fetchPatientProfile = createAsyncThunk(
  'patient/fetchProfile',
  async (patientId, { rejectWithValue }) => {
    try {
      console.log('Redux: Fetching patient profile for ID:', patientId);
      if (!patientId) {
        throw new Error('Patient ID is required');
      }
      const response = await patientService.getPatientProfile(patientId);
      console.log('Redux: Profile fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Redux: Error fetching profile:', error);
      return rejectWithValue(typeof error === 'string' ? error : error.message || 'Failed to fetch patient profile');
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  'patient/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log('Redux: Updating patient profile:', { id, data });
      if (!id) {
        throw new Error('Patient ID is required');
      }
      const response = await patientService.updatePatientProfile(id, data);
      console.log('Redux: Profile updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Redux: Error updating profile:', error);
      return rejectWithValue(typeof error === 'string' ? error : error.message || 'Failed to update patient profile');
    }
  }
);

export const fetchPatientAppointments = createAsyncThunk(
  'patient/fetchAppointments',
  async (patientId, { rejectWithValue }) => {
    try {
      console.log('Redux: Fetching appointments for patient ID:', patientId);
      if (!patientId) {
        throw new Error('Patient ID is required');
      }
      const response = await patientService.getPatientAppointments(patientId);
      console.log('Redux: Appointments fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Redux: Error fetching appointments:', error);
      return rejectWithValue(typeof error === 'string' ? error : error.message || 'Failed to fetch appointments');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'patient/cancelAppointment',
  async ({ patientId, appointmentId, reason }, { rejectWithValue }) => {
    try {
      console.log('Redux: Cancelling appointment:', { patientId, appointmentId, reason });
      if (!patientId || !appointmentId) {
        throw new Error('Patient ID and Appointment ID are required');
      }
      await patientService.cancelAppointment(patientId, appointmentId, reason);
      return appointmentId;
    } catch (error) {
      console.error('Redux: Error cancelling appointment:', error);
      return rejectWithValue(typeof error === 'string' ? error : error.message || 'Failed to cancel appointment');
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'patient/updateAppointment',
  async ({ patientId, appointmentId, newDate }, { rejectWithValue }) => {
    try {
      console.log('Redux: Updating appointment:', { patientId, appointmentId, newDate });
      if (!patientId || !appointmentId) {
        throw new Error('Patient ID and Appointment ID are required');
      }
      const response = await patientService.updateAppointment(patientId, appointmentId, newDate);
      console.log('Redux: Appointment updated successfully:', response);
      return response;
    } catch (error) {
      console.error('Redux: Error updating appointment:', error);
      return rejectWithValue(typeof error === 'string' ? error : error.message || 'Failed to update appointment');
    }
  }
);

// Initial State
const initialState = {
  profile: null,
  appointments: [],
  prescriptions: [],
  loading: false,
  error: null,
  updateSuccess: false,
  fetchAttempted: false // Track if we've attempted to fetch
};

// Patient Slice
const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    resetUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchPatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fetchAttempted = true;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
        if (action.payload && action.payload.prescriptions) {
          state.prescriptions = action.payload.prescriptions;
        }
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch patient profile';
        console.error('Profile fetch rejected:', action.payload);
      })
      
      // Update Profile
      .addCase(updatePatientProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.updateSuccess = true;
        state.error = null;
        if (action.payload && action.payload.prescriptions) {
          state.prescriptions = action.payload.prescriptions;
        }
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update patient profile';
        state.updateSuccess = false;
      })
      
      // Fetch Appointments
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch appointments';
        state.appointments = [];
      })
      
      // Cancel Appointment
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.map(apt => 
          apt._id === action.payload 
            ? { ...apt, status: 'cancelled' } 
            : apt
        );
        state.error = null;
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to cancel appointment';
      })
      
      // Update Appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(apt => apt._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update appointment';
      });
  }
});

export const { resetUpdateSuccess, clearError, resetState } = patientSlice.actions;
export default patientSlice.reducer;