import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Container,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../App";
import Swal from "sweetalert2";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom_utilisateur: "",
    prenom: "",
    nom: "",
    date_naissance: "",
    email: "",
    mot_de_passe: "",
  });

  const isValidEmail = (email) => {
    return (
      email.includes("@") &&
      email.includes(".") &&
      email.indexOf("@") < email.lastIndexOf(".")
    );
  };

  const isValidPassword = (mot_de_passe) => {
    /*
    Mot de passe : 8 caractères minimum avec au moins une majuscule, une
    minuscule, un chiffre et un caractère spécial.
    */
    if (mot_de_passe.length < 8) return false;
    if (!/[A-Z]/.test(mot_de_passe)) return false;
    if (!/[a-z]/.test(mot_de_passe)) return false;
    if (!/[0-9]/.test(mot_de_passe)) return false;
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.nom_utilisateur ||
      !formData.prenom ||
      !formData.nom ||
      !formData.date_naissance ||
      !formData.email ||
      !formData.mot_de_passe
    ) {
      console.log("Erreur: Veuillez remplir tous les champs !");
      return;
    }

    if (!isValidEmail(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Email invalide.",
      });
      return;
    }

    if (!isValidPassword(formData.mot_de_passe)) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text:
          "Mot de passe : 8 caractères minimum avec au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
      });
      return;
    }


    try {
      const response = await fetch("http://213.156.132.144:3033/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: data.message,
        });
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de l'inscription",
        });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          backgroundColor: "#1c1c1c",
          color: "#fff",
          padding: 4,
          borderRadius: 3,
          mt: 5,
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#e91e63",
            mb: 3,
          }}
        >
          Inscription 🔐
        </Typography>


        <form onSubmit={handleSubmit}>
          
          <Typography variant="h6" gutterBottom>
            Informations Personnelles
          </Typography>
          <TextField
            label="Nom d'utilisateur"
            name="nom_utilisateur"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Prénom"
            name="prenom"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Nom"
            name="nom"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date de naissance"
            name="date_naissance"
            type="date"
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2, backgroundColor: "#e91e63" }} />

          
          <Typography variant="h6" gutterBottom>
            Informations de Contact
          </Typography>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2, backgroundColor: "#e91e63" }} />

          
          <Typography variant="h6" gutterBottom>
            Sécurité
          </Typography>
          <TextField
            label="Mot de passe"
            name="mot_de_passe"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#e91e63",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#b71c48",
              },
            }}
          >
            S'inscrire
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpForm;
