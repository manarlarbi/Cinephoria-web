import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

function SeancesPage() {
  const [seances, setSeances] = useState([]);
  const [films, setFilms] = useState([]);
  const [salles, setSalles] = useState([]);

  const [idFilm, setIdFilm] = useState("");
  const [idSalle, setIdSalle] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");

  
  useEffect(function () {
    function fetchSeances() {
      fetch("http://213.156.132.144:3033/seances")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setSeances(data);
        })
        .catch(function (err) {
          console.log("Erreur fetch séances:", err);
        });
    }
    fetchSeances();
  }, []);

  
  useEffect(function () {
    function fetchFilms() {
      fetch("http://213.156.132.144:3033/films")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setFilms(data);
        })
        .catch(function (err) {
          console.log("Erreur fetch films:", err);
        });
    }
    fetchFilms();
  }, []);

  
  useEffect(function () {
    function fetchSalles() {
      fetch("http://213.156.132.144:3033/salles")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          setSalles(data);
        })
        .catch(function (err) {
          console.log("Erreur fetch salles:", err);
        });
    }
    fetchSalles();
  }, []);

  
  function handleAddSeance(e) {
    e.preventDefault();
    fetch("http://213.156.132.144:3033/seances/creer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_film: Number(idFilm),
        id_salle: Number(idSalle),
        heure_debut: heureDebut,
        heure_fin: heureFin,
      }),
    })
      .then(function () {
        window.location.reload(); 
      })
      .catch(function (err) {
        console.log("Erreur ajout séance:", err);
      });
  }

  
  function handleDeleteSeance(id) {
    fetch("http://213.156.132.144:3033/seances/" + id, { method: "DELETE" })
      .then(function () {
        window.location.reload();
      })
      .catch(function (err) {
        console.log("Erreur suppression séance:", err);
      });
  }

  return (
    <Container>
      <Typography variant="h4">Gestion des Séances</Typography>

      
      <form onSubmit={handleAddSeance}>
        <TextField label="ID Film" select SelectProps={{ native: true }} value={idFilm} onChange={function (e) { setIdFilm(e.target.value); }} required>
          <option value="">Sélectionner un film</option>
          {films.map(function (film) {
            return <option key={film.id_film} value={film.id_film}>{film.titre}</option>;
          })}
        </TextField>

        <TextField label="ID Salle" select SelectProps={{ native: true }} value={idSalle} onChange={function (e) { setIdSalle(e.target.value); }} required>
          <option value="">Sélectionner une salle</option>
          {salles.map(function (salle) {
            return <option key={salle.id_salle} value={salle.id_salle}>{salle.nom_cinema} - Salle {salle.id_salle}</option>;
          })}
        </TextField>

        <TextField label="Heure Début" type="datetime-local" value={heureDebut} onChange={function (e) { setHeureDebut(e.target.value); }} required />
        <TextField label="Heure Fin" type="datetime-local" value={heureFin} onChange={function (e) { setHeureFin(e.target.value); }} required />
        <Button type="submit">Créer Séance</Button>
      </form>

      
      <Table component={Paper} sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Film</TableCell>
            <TableCell>Salle</TableCell>
            <TableCell>Heure Début</TableCell>
            <TableCell>Heure Fin</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seances.map(function (seance) {
            return (
              <TableRow key={seance.id_seance}>
                <TableCell>{seance.id_seance}</TableCell>
                <TableCell>{seance.id_film}</TableCell>
                <TableCell>{seance.id_salle}</TableCell>
                <TableCell>{seance.heure_debut}</TableCell>
                <TableCell>{seance.heure_fin}</TableCell>
                <TableCell>
                  <Button color="error" onClick={function () { handleDeleteSeance(seance.id_seance); }}>
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

export default SeancesPage;
