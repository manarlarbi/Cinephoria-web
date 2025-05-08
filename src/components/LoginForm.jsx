import React, { useState, useContext } from "react";
import { Box, Container, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../App";
import Swal from "sweetalert2";
import { URL_BACKEND } from "../utils/constants";
const LoginForm = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState(""); 
  const [motDePasse, setMotDePasse] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !motDePasse) {
      Swal.fire("Champs vides", "Veuillez remplir tous les champs", "error");
      return;
    }

    try {
      const res = await fetch(`${URL_BACKEND}/auth/connexion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          mot_de_passe: motDePasse, 
        }),
      });
      if (!res.ok) {
        Swal.fire("Erreur", "Une erreur est survenue", "error");
        return;
      }
      const data = await res.json();
      

      Cookies.set("token", data.token, { secure: true });
      if (data.role === "Employ%C3%A9") {
        data.role = "Employé";
      }
      Cookies.set("userRole", data.role);
      Cookies.set("email", data.email);
      Cookies.set("id_utilisateur", data.id_utilisateur);
      
      setIsAuthenticated(true);
      navigate("/");

    } catch (err) {
      console.error("Erreur connexion :", err);
      Swal.fire("Erreur", "Problème de connexion", "error");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ background: "#1c1c1c", color: "#fff", padding: "25px", borderRadius: "10px", mt: "50px" }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", color: "#e91e63", marginBottom: "20px" }}>
          Connexion 🔐
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            sx={{ marginBottom: "15px" }} 
          />
          <TextField 
            fullWidth 
            label="Mot de passe" 
            type="password" 
            value={motDePasse} 
            onChange={(e) => setMotDePasse(e.target.value)} 
            sx={{ marginBottom: "15px" }} 
          />
         
          <Button 
            fullWidth 
            variant="contained" 
            sx={{ backgroundColor: "#e91e63", color: "#fff", "&:hover": { backgroundColor: "#b71c48" } }}
            type="submit"
          >
            Se connecter
          </Button>
        </form>

        <Box sx={{ textAlign: "center", marginTop: "15px" }}>
          <Link href="#" sx={{ color: "#e91e63", fontSize: "14px" }}
          onclick={() => Swal.fire("a implémenter...", "Fonctionnalité à implémenter", "info")}>
            Mot de passe oublié ?
          </Link>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Pas encore de compte ?{" "}
            <Link href="/signup" sx={{ color: "#e91e63", fontWeight: "bold" }}>
              Inscrivez-vous
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
