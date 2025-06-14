import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Button, Typography, Alert, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../features/auth/authSlice"; 

export default function Register() {
  const {
    register,
    handleSubmit,
    watch, 
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  ); 

  const password = watch("password", ""); 

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  useEffect(() => {
    dispatch(clearError());

    if (isAuthenticated) {
      navigate("/Home");
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {

    setShowConfirmPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
 
    const { confirmPassword, ...registrationData } = data;
    dispatch(registerUser(registrationData));
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 3 }}
      >
        <Box
          maxWidth={600}
          width="100%"
          p={3}
          boxShadow={3}
          borderRadius={2}
          sx={{ mx: 2 }}
        >
          <Typography variant="h5" mb={1} align="center">
            Create an Account
          </Typography>
          <Typography variant="h6" mb={3} align="center">
            Enter your details to register
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid
              container
              spacing={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
              }}
            >
              <Grid sx={{ gridColumn: "span 6" }}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>
              <Grid sx={{ gridColumn: "span 6" }}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              type="tel" 
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/, 
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              margin="normal"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match", 
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box minHeight={15} mt={1} mb={1}>
              {error && ( 
                <Alert
                  severity="error"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    padding: "6px 12px",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ mt: 0, backgroundColor: "#18345e", color: "white" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <Box mt={2} textAlign="center">
            <Typography variant="body2" sx={{ mt: 1 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Sign in
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                Back to Home
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          
          backgroundColor: "#18345e",
        }}
      >
        <Box
          component="img"
          src="/Component 8.png"
          alt="Register visual"
          sx={{
            width: "40%",
            height: "38%",
          
          }}
        />
      </Box>
    </Grid>
  );
}
