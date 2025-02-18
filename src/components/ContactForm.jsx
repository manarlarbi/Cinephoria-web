import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [nomUtilisateur, setNomUtilisateur] = useState(""); 
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (nomUtilisateur.trim() === "" || sujet.trim() === "" || message.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez remplir tous les champs !",
      });
      return;
    }

    try {
      const response = await fetch("http://213.156.132.144:3033/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_utilisateur: nomUtilisateur,
          sujet: sujet, 
          message: message, 
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message envoyé !",
          text: "Nous vous répondrons bientôt.",
        });
        setNomUtilisateur(""); 
        setSujet(""); 
        setMessage(""); 
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible d'envoyer le message.",
        });
      }
    } catch (error) {
      console.log("Erreur:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur serveur",
        text: "Veuillez réessayer plus tard.",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ backgroundColor: "#222", padding: "25px", borderRadius: "8px", mt: "50px" }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#e91e63",
            mb: "15px",
          }}
        >
          Contactez-nous 📬
        </Typography>

       

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom d'utilisateur"
            fullWidth
            value={nomUtilisateur}
            onChange={(e) => setNomUtilisateur(e.target.value)}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Objet"
            fullWidth
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: "10px" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              "&:hover": { backgroundColor: "#b71c48" },
            }}
          >
            Envoyer 📩
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
