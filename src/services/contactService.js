// src/services/contactService.js
import api from './api';

const contactService = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/clinic/contact', formData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get contact submissions (if needed for admin panel)
  getContactSubmissions: async (params = {}) => {
    try {
      const response = await api.get('/clinic/contact/submissions', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get single contact submission (if needed)
  getContactSubmission: async (id) => {
    try {
      const response = await api.get(`/clinic/contact/submissions/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update contact submission status (if needed for admin)
  updateContactSubmissionStatus: async (id, status) => {
    try {
      const response = await api.patch(`/clinic/contact/submissions/${id}/status`, { status });
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default contactService;