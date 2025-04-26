import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import Cookies from "js-cookie";
import { URL_BACKEND } from "../../utils/constants";

export default function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [duree, setDuree] = useState("");
  const [genre, setGenre] = useState("");
  const [ageMinimum, setAgeMinimum] = useState("");
  const [afficheUrl, setAfficheUrl] = useState("");
  const [note, setNote] = useState("");
  const token = Cookies.get("token");

  useEffect(() => {
    fetch(`${URL_BACKEND}/films`)
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.log("Erreur fetch films:", err));
  }, []);

  const handleAddFilm = (e) => {
    e.preventDefault();
    fetch(`${URL_BACKEND}/films/creer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titre,
        description,
        duree: Number(duree),
        genre,
        age_minimum: Number(ageMinimum),
        affiche_url: afficheUrl,
        note: Number(note) || 0,
      }),
    })
      .then(() => window.location.reload())
      .catch((err) => console.log("Erreur ajout film:", err));
  };

  const handleDeleteFilm = (id) => {
    fetch(`${URL_BACKEND}/films/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => window.location.reload())
      .catch((err) => console.log("Erreur suppression film:", err));
  };

  return (
    <Container>
      <Typography variant="h4">Gestion des Films</Typography>

      <form onSubmit={handleAddFilm}>
        <TextField label="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <TextField label="Durée (minutes)" type="number" value={duree} onChange={(e) => setDuree(e.target.value)} required />
        <TextField label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        <TextField label="Âge Minimum" type="number" value={ageMinimum} onChange={(e) => setAgeMinimum(e.target.value)} required />
        <TextField label="Affiche URL" value={afficheUrl} onChange={(e) => setAfficheUrl(e.target.value)} required />
        <TextField label="Note (1-5)" type="number" value={note} onChange={(e) => setNote(e.target.value)} />
        <Button type="submit">Créer Film</Button>
      </form>

      <Table component={Paper} sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Titre</TableCell>
            <TableCell>Durée</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Âge Minimum</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Affiche</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {films.map((film) => (
            <TableRow key={film.id_film}>
              <TableCell>{film.id_film}</TableCell>
              <TableCell>{film.titre}</TableCell>
              <TableCell>{film.duree} min</TableCell>
              <TableCell>{film.genre}</TableCell>
              <TableCell>{film.age_minimum}+</TableCell>
              <TableCell>{film.note}/5</TableCell>
              <TableCell>
                <img src={film.affiche_url} alt="Affiche" width="64" height="86" />
              </TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDeleteFilm(film.id_film)}>Supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
