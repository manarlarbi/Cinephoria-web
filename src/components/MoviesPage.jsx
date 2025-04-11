import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Chip} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import ChairIcon from "@mui/icons-material/Chair";


const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Sci-Fi",
  "Superhero",
  "Family",
  "Crime",
  "Animation",
  "Thriller",
  "Mystery",
];

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [moyennes, setMoyennes] = useState({});

  const navigate = useNavigate();


  useEffect(function () {
    async function fetchData() {
      try {
        const filmsRes = await fetch("http://localhost:3033/films");
        if (!filmsRes.ok) {
          throw new Error("Erreur HTTP films: " + filmsRes.status);
        }
        const filmsData = await filmsRes.json();

        const seancesRes = await fetch("http://localhost:3033/seances/");
        if (!seancesRes.ok) {
          throw new Error("Erreur HTTP séances: " + seancesRes.status);
        }
        const seancesData = await seancesRes.json();
        const moyennesTable = {};
        for (let i = 0; i < filmsData.length; i++) {
          const filmId = filmsData[i].id_film;
          const moyenne = await getMoyenneAvis(filmId);
          if (moyenne) {
            moyennesTable[filmId] = moyenne;
          }
          setMoyennes(moyennesTable);
        }

        setMovies(filmsData);
        setSessions(seancesData);

        var movieWithSession = null;
        let i = 0;
        while (movieWithSession === null && i <= filmsData.length) {
          for (var j = 0; j < seancesData.length; j++) {
            if (seancesData[j].id_film === filmsData[i].id_film) {
              movieWithSession = filmsData[i];
            }
          }
          i++;

        }
        setSelectedMovie(movieWithSession);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#121212",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Chargement...</Typography>
      </Box>
    );
  }



  var moviesWithSession = [];
  for (var i = 0; i < movies.length; i++) {
    for (var j = 0; j < sessions.length; j++) {
      if (sessions[j].id_film === movies[i].id_film) {
        moviesWithSession.push(movies[i]);
        break;
      }
    }
  }

  var availableSessions = [];
  if (selectedMovie) {
    for (var k = 0; k < sessions.length; k++) {
      if (sessions[k].id_film === selectedMovie.id_film) {
        availableSessions.push(sessions[k]);
      }
    }
  }
  async function getMoyenneAvis(filmId) {
    const res = await fetch(`http://localhost:3033/avis/getReviews/${filmId}`);
    const avis = await res.json();
    if (avis.length === 0) {
      return;

    }
    let somme = 0;
    for (let i = 0; i < avis.length; i++) {
      somme += avis[i].rating;
    }
    return (somme / avis.length);
  }
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#fff",
        p: 3,
      }}
    >
      {selectedMovie && (
        <Box
          sx={{
            position: "relative",
            height: "75vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            px: 5,
            pb: 5,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: "url(" + selectedMovie.affiche_url + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />


          <Box
            component="img"
            src={selectedMovie.affiche_url}
            alt={selectedMovie.titre}
            sx={{
              position: "absolute",
              alignSelf: "center",
              maxHeight: "100%",
              maxWidth: "100%",
              top: "10%",
              zIndex: 1,
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          />


          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: "10px",
              padding: 3,
              width: "fit-content",
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              {selectedMovie.titre}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Chip
                label={"Âge: " + selectedMovie.age_minimum + "+"}
                color={selectedMovie.age_minimum >= 18 ? "error" : "success"}
              />
              <Chip
                label={
                  moyennes[selectedMovie.id_film] !== undefined
                    ? `⭐ ${moyennes[selectedMovie.id_film].toFixed(1)}`
                    : "⭐ Pas encore noté"
                }
                color="secondary"
              />

              <Chip label={selectedMovie.genre} color="default" />
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.7, mt: 2, maxWidth: 500 }}>
              {selectedMovie.description}
            </Typography>


            <Box sx={{ mt: 3 }}>
              <Typography variant="h6">Séances disponibles:</Typography>
              {availableSessions.length > 0 ? (
                availableSessions.map(function (session) {
                  return (
                    <Box key={session.id_seance} sx={{ mt: 1 }}>
                      <Button
                        fullWidth
                        sx={{
                          justifyContent: "flex-start",
                          textAlign: "left",
                          mb: 1,
                          width: "fit-content",
                        }}
                        variant="contained"
                        onClick={function () {
                          navigate(
                            "/reservation?movie=" +
                            selectedMovie.id_film +
                            "&session=" +
                            session.id_seance,
                            {
                              state: { movie: selectedMovie, session: session },
                            }
                          );
                        }}
                      >
                        🕒 {new Date(session.heure_debut).toUTCString()} | 🎭{" "}
                        {session.nom_cinema} | 🏠 Salle {session.id_salle}
                      </Button>
                    </Box>
                  );
                })
              ) : (
                <Typography>Aucune séance disponible</Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "violet",
                  color: "aliceblue",
                  fontWeight: "bold",
                }}
                onClick={function () {
                  navigate("/reservation?movie=" + selectedMovie.id_film, {
                    state: { movie: selectedMovie },
                  });
                }}
              >
                <ChairIcon /> &nbsp; Réserver vos places
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "violet",
                  color: "aliceblue",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
                onClick={() =>
                  navigate(`/films/${selectedMovie.id_film}`)}
              >
                Ajouter un avis
              </Button>
            </Box>
          </Box>
        </Box>
      )}


      {genres.map(function (genre) {
        return (
          <Box key={genre} sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Films {genre}
            </Typography>
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView="auto"
              navigation
            >
              {moviesWithSession.map(function (movie, index) {
                var hasGenre = movie.genre.includes(genre);
                if (hasGenre) {
                  return (
                    <SwiperSlide key={index} style={{ width: "150px" }}>
                      <Box
                        sx={{
                          cursor: "pointer",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                        onClick={function () {
                          setSelectedMovie(movie);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <img
                          src={movie.affiche_url}
                          alt={movie.titre}
                          style={{ width: "100%", borderRadius: "10px" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, textAlign: "center" }}
                        >
                          {movie.titre}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  );
                } else {
                  return null;
                }
              })}
            </Swiper>
          </Box>
        );
      })}
    </Box>
  );
}

export default MoviesPage;
