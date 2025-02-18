import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function SallesPage() {
  const [salles, setSalles] = useState([]);
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [horaires, setHoraires] = useState("");
  const [nombrePlaces, setNombrePlaces] = useState("");
  const [qualite, setQualite] = useState("");

  
  useEffect(() => {
    fetch("http://213.156.132.144:3033/salles")
      .then((res) => res.json())
      .then((data) => setSalles(data))
      .catch((err) => console.log("Erreur fetch salles:", err));
  }, []);

  
  const handleAddSalle = (e) => {
    e.preventDefault();
    fetch("http://213.156.132.144:3033/salles/creer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nom_cinema: nom,
        adresse,
        telephone,
        horaires,
        nombre_places: Number(nombrePlaces),
        qualite,
      }),
    })
      .then(() => window.location.reload()) 
      .catch((err) => console.log("Erreur ajout salle:", err));
  };

  const handleDeleteSalle = (id) => {
    fetch(`http://213.156.132.144:3033/salles/${id}`, { method: "DELETE" })
      .then(() => window.location.reload())
      .catch((err) => console.log("Erreur suppression salle:", err));
  };

  return (
    <Container>
      <Typography variant="h4">Gestion des Salles</Typography>

      
      <form onSubmit={handleAddSalle}>
        <TextField
          label="Nom du Cinéma"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <TextField
          label="Adresse"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />
        <TextField
          label="Téléphone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        />
        <TextField
          label="Horaires"
          value={horaires}
          onChange={(e) => setHoraires(e.target.value)}
          required
        />
        <TextField
          label="Nombre de Places"
          type="number"
          value={nombrePlaces}
          onChange={(e) => setNombrePlaces(e.target.value)}
          required
        />
        <TextField
          label="Qualité de Projection"
          value={qualite}
          onChange={(e) => setQualite(e.target.value)}
          required
        />
        <Button type="submit">Créer Salle</Button>
      </form>

      
      <Table component={Paper} sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Adresse</TableCell>
            <TableCell>Téléphone</TableCell>
            <TableCell>Horaires</TableCell>
            <TableCell>Places</TableCell>
            <TableCell>Qualité</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salles.map((salle) => (
            <TableRow key={salle.id_salle}>
              <TableCell>{salle.id_salle}</TableCell>
              <TableCell>{salle.nom_cinema}</TableCell>
              <TableCell>{salle.adresse}</TableCell>
              <TableCell>{salle.telephone}</TableCell>
              <TableCell>{salle.horaires}</TableCell>
              <TableCell>{salle.nombre_places}</TableCell>
              <TableCell>{salle.qualite}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDeleteSalle(salle.id_salle)}
                >
                  Supprimer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
