import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import logo from "../../assets/logo.png";
import calender from "../../assets/calender.png";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Doctors", path: "/doctors" },
  { title: "Specials", path: "/specials" },
  { title: "Blogs", path: "/blogs" },
  { title: "Contact", path: "/contact" },
];

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleMenuClose();
  };

  const handleProfile = () => {
    if (user?.role === 'Patient') {
      navigate('/patient-profile');
    } else if (user?.role === 'Doctor') {
      navigate('/doctor-dashboard');
    } else if (user?.role === 'Admin') {
      navigate('/admin-dashboard');
    }
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={(theme) => ({
        bgcolor: "white",
        borderBottom: `5px solid ${theme.palette.primary.main}`,
        color: `${theme.palette.primary.main}`,
      })}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavLink to="/">
          <img src={logo} alt="Logo" style={{ height: "30px" }} />
        </NavLink>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 4 }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={NavLink}
                to={item.path}
                color="inherit"
                sx={{
                  "&.active": {
                    color: (theme) => theme.palette.secondary.main,
                    fontWeight: "bold",
                  },
                }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        )}

        {/* Auth Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isAuthenticated ? (
            <>
              {/* Book Now Button - only for patients */}
              {user?.role === 'Patient' && (
                <Button
                  variant="contained"
                  color="white"
                  component={NavLink}
                  to="/book"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    boxShadow: 0,
                    border: "2px solid #232F66",
                    borderRadius: "15px",
                    alignItems: "center",
                    "&:hover": {
                      boxShadow: "none",
                      backgroundColor: (theme) => theme.palette.primary.hover,
                    },
                  }}
                >
                  <img src={calender} style={{ marginRight: "10px" }} />
                  Book Now
                </Button>
              )}

              {/* User Avatar Menu */}
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {user?.first_name?.[0]?.toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfile}>
                  My Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Book Now Button for guests */}
              <Button
                variant="contained"
                color="white"
                component={NavLink}
                to="/login"
                sx={{
                  display: { xs: "none", md: "flex" },
                  boxShadow: 0,
                  border: "2px solid #232F66",
                  borderRadius: "15px",
                  alignItems: "center",
                  "&:hover": {
                    boxShadow: "none",
                    backgroundColor: (theme) => theme.palette.primary.hover,
                  },
                }}
              >
                <img src={calender} style={{ marginRight: "10px" }} />
                Book Now
              </Button>

              {/* Login/Register Buttons */}
              <Button
                component={NavLink}
                to="/login"
                color="inherit"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/register"
                variant="outlined"
                color="inherit"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Register
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((item) => (
              <ListItem
                button
                key={item.title}
                component={NavLink}
                to={item.path}
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  "&.active": {
                    color: (theme) => theme.palette.secondary.main,
                    backgroundColor: (theme) =>
                      theme.palette.secondary.light + "20",
                  },
                }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
            
            {/* Mobile Auth Links */}
            {isAuthenticated ? (
              <>
                <ListItem button onClick={handleProfile}>
                  <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button component={NavLink} to="/login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={NavLink} to="/register">
                  <ListItemText primary="Register" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;