import React,{useState,useEffect} from "react";
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { URL_BACKEND } from "../../utils/constants";
export default function CreerLesEmploye(){
    const [employes, setEmployes] = useState([]);
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [mot_de_passe, setMotDePasse] = useState("");
    const [role, setRole] = useState("");
    const [nom_utilisateur, setNomUtilisateur] = useState("");
    const [date_naissance, setDateDeNaissance] = useState("");
    const token = Cookies.get("token");
    
    useEffect(()=>{
        fetch(`${URL_BACKEND}/employes/`)
        .then ((res)=>res.json())
        .then((data)=>setEmployes(data))
        .catch((err)=>console.log("Erreur fetch employes:",err));
    },[]);
    const handelAddEmploye=(e)=>{
        e.preventDefault();
        fetch(`${URL_BACKEND}/employes/creerEmploye`,{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
                nom,
                prenom,
                email,
                mot_de_passe,
                role,
                nom_utilisateur,
                date_naissance
            }),

        })
        .then(()=>window.location.reload())
        .catch((err)=>console.log("Erreur ajout employe:",err));
    }
    const handelDeleteEmploye=(id)=>{
        fetch(`${URL_BACKEND}/employes/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: `Bearer ${token}`,
            },


        })

        .then(()=>{
            Swal.fire({
                icon:"success",
                title:"Employe supprimé",
                text:"L'employe a été supprimé avec succès",
                showConfirmButton:true,
                timer: 2000,
                timerProgressBar:true,
            })
        setTimeout(()=>{window.location.reload()},2000);})
        .catch((err)=>console.log("Erreur suppression employe:",err));
    };
    return(
        <Container>
            <Typography variant="h4">Gestion des Employes</Typography>
            <form onSubmit={handelAddEmploye}>
                <TextField label="Nom" value={nom} onChange={(e)=>setNom(e.target.value)} required/>
                    <TextField label="Prenom" value={prenom} onChange={(e)=>setPrenom(e.target.value)} required/>
                    <TextField label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <TextField label="Mot de Passe" value={mot_de_passe} onChange={(e)=>setMotDePasse(e.target.value)} required/>
                    <TextField label="Role" value={role} onChange={(e)=>setRole(e.target.value)} required/>
                    <TextField label="Nom Utilisateur" value={nom_utilisateur} onChange={(e)=>setNomUtilisateur(e.target.value)} required/>
                    <TextField label="Date de Naissance" value={date_naissance} onChange={(e)=>setDateDeNaissance(e.target.value)} required/>
                    <Button type="submit" variant="contained" color="primary">Ajouter</Button>
            </form>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prenom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mot de Passe</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Nom Utilisateur</TableCell>
                        <TableCell>Date de Naissance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employes.map((employes)=>(
                        <TableRow key={employes.id_utilisateur}>
                            <TableCell>{employes.id_utilisateur}</TableCell>
                            <TableCell>{employes.nom}</TableCell>
                            <TableCell>{employes.prenom}</TableCell>
                            <TableCell>{employes.email}</TableCell>
                            <TableCell>{employes.mot_de_passe}</TableCell>
                            <TableCell>{employes.role}</TableCell>
                            <TableCell>{employes.nom_utilisateur}</TableCell>
                            <TableCell>{employes.date_de_naissance}</TableCell>
                            <TableCell>
                                <Button variant ="contained"color="secondary" onClick={()=>handelDeleteEmploye(employes.id_utilisateur)}>Supprimer</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

                </Table>
        </Container>
    )

}