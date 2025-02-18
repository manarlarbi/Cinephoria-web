import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ReservationPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [nombrePlaces, setNombrePlaces] = useState(1);
  const [seatSelection, setSeatSelection] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch("http://213.156.132.144:3033/films")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        const params = new URLSearchParams(location.search);
        const movieId = params.get("movie");
        if (movieId) setSelectedMovie(data.find((m) => m.id_film === +movieId));
      })
      .catch(() =>
        Swal.fire("Erreur", "Erreur de chargement des films", "error")
      );
  }, [location.search]);

  useEffect(() => {
    fetch("http://213.156.132.144:3033/cinemas")
      .then((res) => res.json())
      .then(setCinemas)
      .catch(() =>
        Swal.fire("Erreur", "Erreur de chargement des cinémas", "error")
      );
  }, []);

  useEffect(() => {
    if (selectedMovie && selectedCinema && nombrePlaces) {
      fetch(
        `http://213.156.132.144:3033/available-sessions?id_film=${selectedMovie.id_film}&nom_cinema=${selectedCinema}&min_seats=${nombrePlaces}`
      )
        .then((res) => res.json())
        .then(setSessions)
        .catch(() =>
          Swal.fire("Erreur", "Erreur de chargement des séances", "error")
        );
    } else {
      setSessions([]);
    }
  }, [selectedMovie, selectedCinema, nombrePlaces]);

  useEffect(() => {
    const session = sessions.find((s) => s.id_seance === +selectedSessionId);
    if (session) {
      const multiplier =
        session.qualite === "4DX"
          ? 1.2
          : session.qualite === "3D"
          ? 1.1
          : session.qualite === "4K"
          ? 1.05
          : 1;
      setPrice((10 * multiplier * nombrePlaces).toFixed(2));
    } else {
      setPrice(0);
    }
  }, [selectedSessionId, sessions, nombrePlaces]);

  const handleReservation = async (e) => {
    e.preventDefault();
    const id_utilisateur = Cookies.get("id_utilisateur");
    if (!id_utilisateur)
      return Swal.fire("Erreur", "Vous devez être connecté", "error");
    if (!selectedCinema || !selectedMovie || !selectedSessionId)
      return Swal.fire(
        "Erreur",
        "Sélectionnez un cinéma, un film et une séance",
        "error"
      );
    if (nombrePlaces < 1)
      return Swal.fire("Erreur", "Nombre de places invalide", "error");

    const payload = {
      id_utilisateur: +id_utilisateur,
      id_seance: +selectedSessionId,
      prix_total: price,
      places_reservees: seatSelection,
    };

    try {
      const res = await fetch("http://213.156.132.144:3033/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      res.ok
        ? Swal.fire(
            "Succès",
            `Réservation confirmée ! ID: ${data.id_reservation}`,
            "success"
          )
        : Swal.fire(
            "Erreur",
            data.error || "Erreur lors de la réservation",
            "error"
          );
    } catch {
      Swal.fire("Erreur", "Problème de connexion", "error");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        p: 3,
        mt: 5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Réservation de Billets
      </Typography>
      <form onSubmit={handleReservation}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Cinéma</InputLabel>
          <Select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
          >
            {cinemas.map((cinema, idx) => (
              <MenuItem key={idx} value={cinema}>
                {cinema}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Film</InputLabel>
          <Select
            value={selectedMovie?.id_film || ""}
            onChange={(e) =>
              setSelectedMovie(
                movies.find((m) => m.id_film === +e.target.value)
              )
            }
          >
            {movies.map((movie) => (
              <MenuItem key={movie.id_film} value={movie.id_film}>
                {movie.titre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Séance</InputLabel>
          <Select
            value={selectedSessionId}
            onChange={(e) => setSelectedSessionId(e.target.value)}
          >
            {sessions.map((s) => (
              <MenuItem key={s.id_seance} value={s.id_seance}>
                {new Date(s.heure_debut).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(s.heure_fin).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                | Salle {s.id_salle} | {s.nom_cinema} | {s.qualite}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Nombre de places"
          type="number"
          fullWidth
          value={nombrePlaces}
          onChange={(e) => setNombrePlaces(+e.target.value)}
          inputProps={{ min: 1 }}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Sièges (ex: A1,A2)"
          fullWidth
          value={seatSelection}
          onChange={(e) => setSeatSelection(e.target.value)}
          sx={{ mb: 2 }}
        />
        {price > 0 && (
          <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
            Prix Total: {price}€
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#e91e63", color: "#fff" }}
        >
          Confirmer la réservation
        </Button>
      </form>
    </Container>
  );
};

export default ReservationPage;
