import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MovieIcon from "@mui/icons-material/Movie";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../App";
import Cookies from "js-cookie";
import { logOut } from "../utils/token";

function Navbar() {
  const theme = useTheme();
  const { isAuthenticated: isAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = Cookies.get("userRole");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
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
  ];
  
  if (userRole !== "Administrateur"&& userRole !=="Employé") {
    navItems.push({ text: "Réservation", path: "/reservation", icon: <EventSeatIcon /> });
  }
  if (userRole==="Employé"){
    navItems.push({ text: "Gérer les avis", path: "/avis", icon: <MovieIcon /> });
  }
  
  navItems.push(
    { text: "Films", path: "/", icon: <MovieIcon /> },
    { text: "Contact", path: "/contact", icon: <ContactMailIcon /> }
  );
  

  return (
    <>
      {/* le AppBar /Navbar Desktop */}
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "none",
          padding: { xs: "10px 20px", md: "10px 50px" },
          display: "flex",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", gap: 1 }}>
            <Typography
              variant="h5"
              sx={{ backgroundColor: "#e91e63", padding: "5px 10px", borderRadius: "5px", color: "#fff", fontWeight: "bold" }}
            >
              CINE
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontFamily: "Playfair Display, serif", fontWeight: "600", letterSpacing: "2px", color: "white" }}
            >
              PHORIA
            </Typography>
          </Box>

          
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path} startIcon={item.icon}>
                {item.text}
              </Button>
            ))}

            {isAuth ? (
              <>
                {userRole === "Utilisateur" && (
                  <Button color="inherit" startIcon={<EventSeatIcon />} onClick={() => navigate("/mes-reservations")}>
                    Mes Commandes
                  </Button>
                )}

                {userRole === "Administrateur" && (
                  <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => navigate("/administration")}>
                    Administration
                  </Button>
                )}

                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin} startIcon={<LoginIcon />}>
                Se connecter
              </Button>
            )}
          </Box>

          {/* Hamburger Icon for Mobile-c pour que la navbar soit responsive */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer pour l'affichage Mobile /responsive */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box sx={{ padding: 2 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}

            {!isAuth && (
              <ListItem button onClick={handleLogin}>
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary="Se connecter" />
              </ListItem>
            )}

            {isAuth && (
              <>
                {userRole === "Utilisateur" && (
                  <ListItem button onClick={() => navigate("/mes-reservations")}>
                    <ListItemIcon><EventSeatIcon /></ListItemIcon>
                    <ListItemText primary="Mes Commandes" />
                  </ListItem>
                )}

                {userRole === "Administrateur" && (
                  <ListItem button onClick={() => navigate("/administration")}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Administration" />
                  </ListItem>
                )}

                <ListItem button onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Déconnexion" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
