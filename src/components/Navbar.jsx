import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../App";
import Cookies from "js-cookie";
import "@fontsource/playfair-display"; 
import { logOut } from "../utils/token";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const theme = useTheme();
  const { isAuthenticated: isAuth } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userRole = Cookies.get("userRole");
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };


  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleLogout = () => {
    logOut();
  };

  const navItems = [
    { text: "Accueil", path: "/", icon: <HomeIcon /> },
    { text: "Réservation", path: "/reservation", icon: <EventSeatIcon /> },
    { text: "Films", path: "/", icon: <MovieIcon /> },
    { text: "Contact", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const drawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              "&:hover": { bgcolor: theme.palette.action.hover },
              borderRadius: "10px",
              marginBottom: "8px",
            }}
          >
            <ListItemIcon sx={{ color: theme.palette.text.primary }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(12px)",
        transition: "0.4s ease-in-out",
        boxShadow: "none",
        padding: "10px 50px",
        marginBottom: "10px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "#e91e63",
              padding: "5px 10px",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            CINE
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Playfair Display, serif",
              fontWeight: "600",
              letterSpacing: "2px",
              color: "white",
            }}
          >
            PHORIA
          </Typography>
        </Box>

        
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                transition: "0.3s",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#f5c518",
                  transform: "scaleX(0)",
                  transition: "transform 0.3s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
            >
              {item.text}
            </Button>
          ))}

          
          <>
            {isAuth ? (
              <>
                
                {userRole === "Utilisateur" && (
                  <Button
                    color="inherit"
                    startIcon={<EventSeatIcon />}
                    onClick={() => navigate("/mes-reservations")}
                    sx={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      transition: "0.3s",
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Mes Commandes
                  </Button>
                )}

                
                {userRole === "Administrateur" && (
                  <Button
                    color="inherit"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate("/administration")}
                    sx={{
                      border: "1px solid rgba(255,255,255,0.3)",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      transition: "0.3s",
                      mr: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Administration
                  </Button>
                )}

                
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={handleLogin}
                startIcon={<LoginIcon />}
                sx={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Se connecter
              </Button>
            )}
          </>
        </Box>

        
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { xs: "flex", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
