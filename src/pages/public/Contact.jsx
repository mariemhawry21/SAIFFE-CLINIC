import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm, clearContactStatus } from '../../features/contact/contactSlice';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(submitContactForm(formData));
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    dispatch(clearContactStatus());
  };

  const goHome = () => {
    handleDialogClose();
    navigate('/');
  };

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setDialogOpen(true);
    }
  }, [success]);

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </Typography>
      </Box>

      {/* Form */}
      <Paper elevation={3} sx={{ p: 5 }}>
        <Typography variant="h5" color="primary.main" gutterBottom>
          Send us a Message
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              label="Full Name *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              disabled={loading}
              placeholder="Enter your full name"
              fullWidth
            />
            <TextField
              label="Email Address *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              disabled={loading}
              placeholder="example@email.com"
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              placeholder="Enter your phone number"
              fullWidth
            />
            <TextField
              label="Subject *"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={!!formErrors.subject}
              helperText={formErrors.subject}
              disabled={loading}
              placeholder="Subject of your message"
              fullWidth
            />
            <TextField
              label="Message *"
              name="message"
              multiline
              rows={5}
              value={formData.message}
              onChange={handleChange}
              error={!!formErrors.message}
              helperText={formErrors.message}
              disabled={loading}
              placeholder="Write your message here..."
              fullWidth
            />
            <Box textAlign="center" mt={2}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ minWidth: 180, py: 1.3, position: 'relative' }}
              >
                {loading && (
                  <CircularProgress
                    size={20}
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      marginLeft: '-10px',
                      marginTop: '-10px'
                    }}
                  />
                )}
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>

      {/* Dialog Success */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ fontWeight: 'bold', color: 'green' }}>
          Message Sent!
        </DialogTitle>
        <DialogContent>
          <Typography>
            Your message has been sent successfully. We will contact you soon!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={goHome} variant="outlined">Go to Home</Button>
          <Button onClick={handleDialogClose} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Contact;
