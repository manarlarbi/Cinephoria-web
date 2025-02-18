import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1c1c1c",
        color: "white",
        padding: "20px",
        textAlign: "center",
        mt: "60px",
      }}
    >
      <Container>
        <Typography variant="h5" sx={{ color: "#e91e63", fontWeight: "bold" }}>
          Cinéphoria 🎬
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          L'expérience ultime du cinéma en France et Belgique.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <IconButton sx={{ color: "white", mx: 1 }}>
            <FacebookIcon />
          </IconButton>
          <IconButton sx={{ color: "white", mx: 1 }}>
            <TwitterIcon />
          </IconButton>
          <IconButton sx={{ color: "white", mx: 1 }}>
            <InstagramIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <LocationOnIcon sx={{ fontSize: "16px", mr: 1 }} />
              Paris, Nantes, Bordeaux, Toulouse, Lille, Charleroi, Liège
            </Typography>
            <Typography variant="body2">
              <PhoneIcon sx={{ fontSize: "16px", mr: 1 }} />
              +33 1 23 45 67 89
            </Typography>
            <Typography variant="body2">
              <AccessTimeIcon sx={{ fontSize: "16px", mr: 1 }} />
              Lun - Dim: 10h - 22h
            </Typography>
            <Typography variant="body2">
              <EmailIcon sx={{ fontSize: "16px", mr: 1 }} />
              support@cinephoria.fr
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <Link
                href="/"
                color="inherit"
                sx={{ textDecoration: "none", "&:hover": { color: "#f5c518" } }}
              >
                Accueil
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                href="/films"
                color="inherit"
                sx={{ textDecoration: "none", "&:hover": { color: "#f5c518" } }}
              >
                Films
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                href="/reservation"
                color="inherit"
                sx={{ textDecoration: "none", "&:hover": { color: "#f5c518" } }}
              >
                Réservations
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link
                href="/contact"
                color="inherit"
                sx={{ textDecoration: "none", "&:hover": { color: "#f5c518" } }}
              >
                Contact
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ opacity: 0.5, mt: 3 }}>
          © {new Date().getFullYear()} Cinéphoria. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
