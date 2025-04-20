import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Rating,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";



const token = Cookies.get("token");
const CustomSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'green',
    '& + .MuiSwitch-track': {
      backgroundColor: 'green',
    },
  },
  '& .MuiSwitch-switchBase': {
    color: 'hotpink',
    '& + .MuiSwitch-track': {
      backgroundColor: 'hotpink',
    },
  },
}));


export default function GererLesAvis() {
  const [avis, setAvis] = useState([]);
  const [films, setFilms] = useState({}); 
  const [isValider,setIsValider]=useState(false);

  useEffect(() => {
    fetch("http://localhost:3033/avis/getReviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des avis");
        }
        return res.json();
      })
      .then((data) => {
        setAvis(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log("Erreur fetch avis:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3033/films")
      .then((res) => res.json())
      .then((data) => {
        const filmMap = {};
        data.forEach((film) => {
          filmMap[film.id_film] = film.titre; 
        });
        setFilms(filmMap);
      })
      .catch((err) => console.error("Erreur récupération films:", err));
  }, []);

  const handelDeleteAvis = (avisId) => {
    fetch(`http://localhost:3033/avis/deleteReview/${avisId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Échec de la suppression");
        }

        setAvis((prevAvis) => prevAvis.filter((a) => a._id !== avisId));

        Swal.fire({
          icon: "success",
          title: "Avis supprimé",
          text: "L'avis a été supprimé avec succès",
          showConfirmButton: true,
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .catch((err) => {
        console.error("Erreur suppression avis:", err);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Impossible de supprimer l'avis.",
        });
      });
  };
  const handelUpDatedAvis =(avisId,isValider)=>{
    fetch(`http://localhost:3033/avis/updateReview/${avisId}`,{
      method:"PUT",
      headers:{
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
  body:JSON.stringify({isValider}),
})
.then ((res)=>{
  if(!res.ok){
    throw new Error("Echec de la mise à jour");
  }
  setAvis((prevAvis) => {
    const avisModifies = prevAvis.map((a) => {
      if (a._id === avisId) {
        return { ...a, isValider: isValider };
      } else {
        return a;
      }
    });
    return avisModifies;
  });
    
  Swal.fire({
    icon:"succes",
    title:"Avis mis a jour",
    text:"L'avis a été mis à jour avec succès", 

  })
})
.catch((err)=>{
  console.error("erreur lors de la mise ajour de l'avis",err);
})

  }

  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Gérer les avis
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Film ID</TableCell>
            <TableCell>Nom du film</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Commentaire</TableCell>
            <TableCell>Validation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {avis.map((avis) => (
            <TableRow key={avis._id}>
              <TableCell>{avis.filmId}</TableCell>
              <TableCell>{films[avis.filmId]}</TableCell>
              <TableCell>
                <Rating
                  name="score"
                  value={avis.rating}
                  readOnly
                  precision={0.5}
                />
              </TableCell>
              <TableCell>{avis.comment}</TableCell>
              <TableCell>
               <CustomSwitch 
               checked={avis.isValider}
               onChange={(e)=>handelUpDatedAvis(avis._id,e.target.checked)}
               color="primary"
               />
              </TableCell>
              <TableCell>
                <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon/>}
                  onClick={() => handelDeleteAvis(avis._id)}
                  style={{ color: "red" }}
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
 
