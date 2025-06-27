import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  CalendarToday,
  MedicalServices,
  Edit,
  Visibility,
  Cancel,
  CheckCircle,
  Schedule,
  LocalHospital,
  Assignment,
  Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPatientProfile, 
  updatePatientProfile,
  fetchPatientAppointments,
  cancelAppointment,
  updateAppointment,
  resetUpdateSuccess
} from '../../features/patient/patientSlice';
import { format } from 'date-fns';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PatientProfile = () => {
  const dispatch = useDispatch();
  const { 
    profile, 
    appointments, 
    prescriptions, 
    loading, 
    error,
    updateSuccess
  } = useSelector(state => state.patient || {});
  
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const [tabValue, setTabValue] = useState(0);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [editFormData, setEditFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const userId = user?.id || user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchPatientProfile(userId));
      dispatch(fetchPatientAppointments(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (profile) {
      setEditFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      showNotification(error, 'error');
    } else if (updateSuccess) {
      showNotification('Profile updated successfully!', 'success');
      dispatch(resetUpdateSuccess());
    }
  }, [error, updateSuccess, dispatch]);

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    if (editFormData.newPassword && editFormData.newPassword !== editFormData.confirmPassword) {
      showNotification('New passwords do not match', 'error');
      return;
    }

    const updateData = {
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      email: editFormData.email,
      phone: editFormData.phone
    };

    if (editFormData.newPassword) {
      updateData.oldPassword = editFormData.oldPassword;
      updateData.newPassword = editFormData.newPassword;
    }

    try {
      await dispatch(updatePatientProfile({ 
        id: userId, 
        data: updateData 
      })).unwrap();
      
      setEditDialogOpen(false);
      setEditFormData(prev => ({ 
        ...prev, 
        oldPassword: '', 
        newPassword: '', 
        confirmPassword: '' 
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentDialogOpen(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await dispatch(cancelAppointment({ 
          patientId: userId, 
          appointmentId,
          reason: 'Patient canceled appointment'
        })).unwrap();
        
        showNotification('Appointment cancelled successfully', 'success');
      } catch (error) {
        showNotification('Failed to cancel appointment: ' + error, 'error');
      }
    }
  };

  const handleRescheduleAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      await dispatch(updateAppointment({
        patientId: userId,
        appointmentId: selectedAppointment._id,
        newDate: editFormData.newAppointmentDate
      })).unwrap();
      
      setAppointmentDialogOpen(false);
      showNotification('Appointment rescheduled successfully', 'success');
    } catch (error) {
      showNotification('Failed to reschedule appointment: ' + error, 'error');
    }
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setPrescriptionDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      case 'completed': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">User data not available. Please try logging in again.</Alert>
      </Container>
    );
  }

  if (loading && !profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error && !profile) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          onClick={() => dispatch(fetchPatientProfile(userId))}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notificationSeverity}
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>

      {/* Profile Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #232F66 0%, #DEA94D 100%)' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              sx={{ 
                width: 120, 
                height: 120, 
                backgroundColor: 'white',
                color: '#232F66',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}
            >
              {profile?.first_name?.[0] || user?.first_name?.[0] || 'P'}
              {profile?.last_name?.[0] || user?.last_name?.[0] || 'P'}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
              {profile?.first_name || user?.first_name || 'Patient'} {profile?.last_name || user?.last_name || ''}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ color: 'white', mr: 1 }} />
              <Typography variant="body1" sx={{ color: 'white' }}>
                {profile?.email || user?.email || 'No email available'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: 'white', mr: 1 }} />
              <Typography variant="body1" sx={{ color: 'white' }}>
                {profile?.phone || user?.phone || 'No phone available'}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEditProfile}
              sx={{ 
                backgroundColor: 'white', 
                color: '#232F66',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#e3f2fd' }}>
            <CalendarToday sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {appointments?.length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Appointments
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#e8f5e8' }}>
            <MedicalServices sx={{ fontSize: 40, color: '#388e3c', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
              {prescriptions?.length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Prescriptions
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2, backgroundColor: '#fff3e0' }}>
            <CheckCircle sx={{ fontSize: 40, color: '#f57c00', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
              {appointments?.filter(apt => apt.status === 'completed')?.length || 0}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed Appointments
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper elevation={2}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          variant="fullWidth"
        >
          <Tab icon={<CalendarToday />} label="Appointments" />
          <Tab icon={<MedicalServices />} label="Prescriptions" />
          <Tab icon={<Person />} label="Personal Info" />
        </Tabs>

        {/* Appointments Tab */}
        <TabPanel value={tabValue} index={0}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : appointments?.length ? (
            <Grid container spacing={2}>
              {appointments.map((appointment) => (
                <Grid item xs={12} md={6} key={appointment._id}>
                  <Card sx={{ position: 'relative' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Dr. {appointment.doctor_info?.name || 'Unknown Doctor'}
                        </Typography>
                        <Chip
                          label={getStatusText(appointment.status)}
                          color={getStatusColor(appointment.status)}
                          size="small"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocalHospital sx={{ mr: 1, color: '#666' }} />
                        <Typography variant="body2" color="textSecondary">
                          {appointment.doctor_info?.specialty || 'General'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Schedule sx={{ mr: 1, color: '#666' }} />
                        <Typography variant="body2">
                          {appointment.appointment_date ? format(new Date(appointment.appointment_date), 'dd/MM/yyyy - HH:mm') : 'Date not available'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          View Details
                        </Button>
                        {['pending', 'confirmed'].includes(appointment.status) && (
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Cancel />}
                            onClick={() => handleCancelAppointment(appointment._id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CalendarToday sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="textSecondary">
                No appointments scheduled
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Prescriptions Tab */}
        <TabPanel value={tabValue} index={1}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : prescriptions?.length ? (
            <Grid container spacing={2}>
              {prescriptions.map((prescription) => (
                <Grid item xs={12} md={6} key={prescription._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Dr. {prescription.doctor_name || 'Unknown Doctor'}
                      </Typography>
                      
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        {prescription.created_at ? format(new Date(prescription.created_at), 'dd/MM/yyyy') : 'Date not available'}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Diagnosis:</strong> {prescription.diagnosis || 'No diagnosis provided'}
                      </Typography>

                      <Button
                        size="small"
                        startIcon={<Assignment />}
                        onClick={() => handleViewPrescription(prescription)}
                        fullWidth
                      >
                        View Prescription
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <MedicalServices sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" color="textSecondary">
                No prescriptions available
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Personal Info Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Basic Information
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary="Full Name"
                        secondary={`${profile?.first_name || user?.first_name || 'N/A'} ${profile?.last_name || user?.last_name || ''}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Email />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={profile?.email || user?.email || 'No email available'}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone Number"
                        secondary={profile?.phone || user?.phone || 'No phone available'}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Quick Statistics
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Total Appointments"
                        secondary={appointments?.length || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Confirmed Appointments"
                        secondary={appointments?.filter(apt => apt.status === 'confirmed')?.length || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Prescriptions"
                        secondary={prescriptions?.length || 0}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={editFormData.first_name}
                onChange={(e) => setEditFormData(prev => ({ ...prev, first_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={editFormData.last_name}
                onChange={(e) => setEditFormData(prev => ({ ...prev, last_name: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={editFormData.phone}
                onChange={(e) => setEditFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                Change Password (Optional)
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={editFormData.oldPassword}
                onChange={(e) => setEditFormData(prev => ({ ...prev, oldPassword: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={editFormData.newPassword}
                onChange={(e) => setEditFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={editFormData.confirmPassword}
                onChange={(e) => setEditFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Appointment Details Dialog */}
      <Dialog 
        open={appointmentDialogOpen} 
        onClose={() => setAppointmentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Appointment Details</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setAppointmentDialogOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {selectedAppointment && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dr. {selectedAppointment.doctor_info?.name || 'Unknown Doctor'}
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Specialty"
                    secondary={selectedAppointment.doctor_info?.specialty || 'General'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Date & Time"
                    secondary={selectedAppointment.appointment_date ? format(new Date(selectedAppointment.appointment_date), 'dd/MM/yyyy - HH:mm') : 'Date not available'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={getStatusText(selectedAppointment.status)}
                        color={getStatusColor(selectedAppointment.status)}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                {selectedAppointment.notes && (
                  <ListItem>
                    <ListItemText
                      primary="Notes"
                      secondary={selectedAppointment.notes}
                    />
                  </ListItem>
                )}
              </List>

              {['pending', 'confirmed'].includes(selectedAppointment.status) && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Reschedule Appointment
                    </Typography>
                    <TextField
                      fullWidth
                      type="datetime-local"
                      label="New Appointment Date & Time"
                      InputLabelProps={{ shrink: true }}
                      value={editFormData.newAppointmentDate || ''}
                      onChange={(e) => setEditFormData(prev => ({
                        ...prev,
                        newAppointmentDate: e.target.value
                      }))}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleRescheduleAppointment}
                      fullWidth
                    >
                      Reschedule Appointment
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAppointmentDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Prescription Details Dialog */}
      <Dialog 
        open={prescriptionDialogOpen} 
        onClose={() => setPrescriptionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Prescription Details</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setPrescriptionDialogOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {selectedPrescription && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dr. {selectedPrescription.doctor_name || 'Unknown Doctor'}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Date:</strong> {selectedPrescription.created_at ? format(new Date(selectedPrescription.created_at), 'dd/MM/yyyy') : 'Date not available'}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                <strong>Diagnosis:</strong> {selectedPrescription.diagnosis || 'No diagnosis provided'}
              </Typography>
              
              {selectedPrescription.medications && selectedPrescription.medications.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                    Prescribed Medications:
                  </Typography>
                  <List>
                    {selectedPrescription.medications.map((medication, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={medication.name || `Medication ${index + 1}`}
                          secondary={`${medication.dosage || 'Dosage not specified'} - ${medication.instructions || 'No instructions'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              
              {selectedPrescription.notes && (
                <>
                  <Typography variant="h6" sx={{ mb: 1, mt: 3 }}>
                    Additional Notes:
                  </Typography>
                  <Typography variant="body2">
                    {selectedPrescription.notes}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPrescriptionDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientProfile;