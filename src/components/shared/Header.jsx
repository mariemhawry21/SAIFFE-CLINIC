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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
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

        <Button
          variant="contained"
          color="white"
          component={NavLink}
          to="/book"
          sx={{
            display: { xs: "none", md: "flex" },
            ml: 2,
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
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
