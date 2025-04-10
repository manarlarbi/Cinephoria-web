import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const MesReservations = () => {
  const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();
  const idUtilisateur = Cookies.get("id_utilisateur");
  const token = Cookies.get("token");

  useEffect(() => {
 
    const fetchReservations = async () => {
      try {
        const res = await fetch(
          `http://213.156.132.144:3033/mes-reservations/${idUtilisateur}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok)
          throw new Error("Erreur lors du chargement des réservations.");
        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReservations();
  }, [idUtilisateur,token]);

  const annulerReservation = async (id_reservation) => {
    try {
      const res = await fetch(
        `http://213.156.132.144:3033/reservations/${id_reservation}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      if (!res.ok)
        throw new Error("Erreur lors de l'annulation de la réservation.");
        window.location.reload();
    } catch (err) {
     console.log(err);
    }
  };

 

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        🎟️ Mes Commandes
      </Typography>

      {reservations.length === 0 ? (
        <Alert severity="info">Vous n'avez encore aucune réservation.</Alert>
      ) : (
        reservations.map((res) => (
          <Card
            key={res.id_reservation}
            sx={{
              display: "flex",
              mb: 3,
              boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
              backgroundColor: "#1c1c1c",
              color: "white",
            }}
          >
            
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image={res.affiche_url}
              alt={res.titre}
            />

            
            <CardContent sx={{ flex: "1" }}>
              <Typography variant="h6">{res.titre}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                📍 {res.nom_cinema} | Salle {res.id_salle} ({res.qualite})
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                ⏰ Séance : {res.heure_debut}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                🪑 Sièges : {res.places_reservees}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                💰 Prix : {res.prix_total}€
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.5 }}>
                📅 Réservé le :{res.date_reservation}
              </Typography>
              <Button
              onClick={() => annulerReservation(res.id_reservation)}
                variant="contained"
                sx={{ mt: 1, backgroundColor: "#e91e63", color: "white" }}
              >
                Annuler
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MesReservations;
