import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Cookies from "js-cookie";
import Swal from "sweetalert2";


import { useParams } from "react-router-dom";
function MoviesDetailles() {
    const {id_film}=useParams();
    const [film, setFilm] = useState(null);
    const [avis, setAvis] = useState([]);
    const [rating, setRating] = useState(0);
    const [commentaire, setCommentaire] = useState("");
    const token = Cookies.get("token");
    const role=Cookies.get("userRole");
    if(!token){
        console.log("token non trouvé");
    }
    useEffect(() => {
        async function fetchData() {
            const MoviesRes = await fetch(`http://localhost:3033/films/${id_film}`);
            const ReviewRes = await fetch(`http://localhost:3033/avis/getReviews/${id_film}`);
            if (!MoviesRes.ok) {
                throw new Error("Erreur lors de la récupération du film");
              }
            const MoviesData = await MoviesRes.json();
            if (!ReviewRes.ok) {
                throw new Error("Erreur lors de la récupération des avis");
              }
            const ReviewData = await ReviewRes.json();
            let avisValides=[];
            for(let i=0;i<ReviewData.length;i++){
                if(ReviewData[i].isValider===true){
                    avisValides.push(ReviewData[i]);
                }
                    
            }
            setFilm(MoviesData);
            setAvis(avisValides);
        }
        fetchData();
    }, [id_film]);
    if (!film) {return <Typography>Actualiser la page</Typography>;}
    async function handelAddReview() {
        console.log("id_utilisateur cookie =", Cookies.get("id_utilisateur"));
        if (!token) {
            Swal.fire({
              icon: "warning",
              title: "Connexion requise",
              text: "Vous devez être connecté pour ajouter un avis.",
            });
            return; 
          }
          if (role !== "Utilisateur") {
            Swal.fire({
                icon: "warning",
                title: "Accès refusé", 
                text: "Vous devez être un utilisateur pour ajouter un avis.",
              });
            return;
          }

        const response = await fetch(`http://localhost:3033/avis/addReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                , Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                filmId: parseInt(id_film,10),
                userId:Number(Cookies.get("id_utilisateur")),
                rating: parseFloat(rating),
                comment: commentaire,
            }),
        });
        if (!response.ok) {
            console.error("Erreur lors de l'ajout de l'avis");
            return;

        } if (response.ok) {
            setRating(0);
            setCommentaire("");
            const updatedAvis = await fetch(`http://localhost:3033/avis/getReviews/${id_film}`);
            const updatedData = await updatedAvis.json();
            const avisValides =updatedData.filter((a)=>a.isValider===true);
            setAvis(avisValides);
        } }

        return (
            <Box p={4}>
                <Typography variant="h4">{film.titre}</Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>{film.description}</Typography>
                <Typography variant="h6">donner votre avis</Typography>
                <Rating
                    value={rating}
                    onChange={(e, newValue) => {
                        setRating(newValue)
                    }}
                    precision={0.5}
                />
                <TextField
                    label="Commentaire"
                    fullWidth
                    multiline
                    rows={3}
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    sx={{ my: 2 }} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handelAddReview}
                    sx={{ mt: 2 }}
                >
                    Ajouter votre avis
                </Button>
                <Typography variant="h5" sx={{ mt: 4 }}>Avis des utilisateurs</Typography>
                {avis.map((r, index) => (
                    <Box key={index} sx={{ my: 2 }}>
                        <Rating
                            value={r.rating}
                            readOnly
                            precision={0.5}
                        />
                        <Typography >{r.comment}</Typography>
                    </Box>
                ))}




            </Box>
        );




    }

    export default MoviesDetailles;
