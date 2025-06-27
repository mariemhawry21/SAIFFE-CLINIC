// services/patientService.js
import api from './api'; // Make sure this import is correct

const patientService = {
  getPatientProfile: async (patientId) => {
    try {
      console.log('Fetching profile for patient ID:', patientId); // Debug log
      const response = await api.get(`/patient/${patientId}`);
      console.log('Profile response:', response.data); // Debug log
      return response.data.data || response.data; // Handle both response structures
    } catch (error) {
      console.error('Error fetching patient profile:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch patient profile';
      throw errorMessage;
    }
  },

  updatePatientProfile: async (patientId, data) => {
    try {
      console.log('Updating profile for patient ID:', patientId, 'with data:', data); // Debug log
      const response = await api.patch(`/patient/${patientId}`, data);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating patient profile:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update patient profile';
      throw errorMessage;
    }
  },

  getPatientAppointments: async (patientId) => { // Add patientId parameter
    try {
      console.log('Fetching appointments for patient ID:', patientId); // Debug log
      // Try both endpoint patterns
      const response = await api.get(patientId ? `/patient/${patientId}/appointments` : `/patient/appointments`);
      console.log('Appointments response:', response.data); // Debug log
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Error fetching appointments:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch appointments';
      throw errorMessage;
    }
  },

  cancelAppointment: async (patientId, appointmentId, reason) => {
    try {
      console.log('Cancelling appointment:', { patientId, appointmentId, reason }); // Debug log
      const response = await api.patch(`/patient/appointments/${appointmentId}/cancel`, { 
        reason,
        patient_id: patientId 
      });
      return response.data;
    } catch (error) {
      console.error('Error cancelling appointment:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to cancel appointment';
      throw errorMessage;
    }
  },

  updateAppointment: async (patientId, appointmentId, newDate) => {
    try {
      console.log('Updating appointment:', { patientId, appointmentId, newDate }); // Debug log
      const response = await api.patch(`/patient/appointments/${appointmentId}`, {
        new_date: newDate,
        patient_id: patientId
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error updating appointment:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update appointment';
      throw errorMessage;
    }
  },

  bookAppointment: async (patientId, doctorId, appointmentDate) => {
    try {
      console.log('Booking appointment:', { patientId, doctorId, appointmentDate }); // Debug log
      const response = await api.post(`/patient/appointments`, {
        patient_id: patientId,
        doctor_id: doctorId,
        appointment_date: appointmentDate
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Error booking appointment:', error); // Debug log
      const errorMessage = error.response?.data?.message || error.message || 'Failed to book appointment';
      throw errorMessage;
    }
  }
};

export default patientService;