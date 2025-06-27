// src/components/shared/Footer.jsx
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        mt: 'auto',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              MediClinic
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              Your trusted healthcare partner providing quality medical services
              with compassionate care. We're committed to your health and wellness.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                color="inherit" 
                size="small"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/doctors"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Our Doctors
              </Link>
              <Link
                component={RouterLink}
                to="/specialists"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Specialists
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/book"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Book Appointment
              </Link>
              <Link
                component={RouterLink}
                to="/blogs"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Health Blog
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Contact Us
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ '&:hover': { color: 'secondary.main' } }}
              >
                Emergency Care
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={5}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  123 Medical Street, Healthcare City, HC 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  info@mediclinic.com
                </Typography>
              </Box>
            </Box>

            {/* Working Hours */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Working Hours
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                Monday - Friday: 8:00 AM - 8:00 PM<br />
                Saturday: 9:00 AM - 5:00 PM<br />
                Sunday: Closed<br />
                <Box component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                  Emergency: 24/7
                </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="inherit">
            © {currentYear} MediClinic. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ '&:hover': { color: 'secondary.main' } }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ '&:hover': { color: 'secondary.main' } }}
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ '&:hover': { color: 'secondary.main' } }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;