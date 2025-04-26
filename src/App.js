import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Cookies from "js-cookie";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
import MoviesPage from "./components/MoviesPage";
import ContactForm from "./components/ContactForm";
import { isAuthenticatedUtil } from "./utils/token";
import ReservationPage from "./components/ReservationPage";
import MesReservations from "./components/MesReservations";
import FilmsPage from "./components/Admin/FilmsPage";
import SeancesPage from "./components/Admin/SeancePage";
import SallesPage from "./components/Admin/SallesPage";
import MoviesDetailles from "./components/MoviesDetailles";
import GererLesAvis from "./components/Employe/GererLesAvis";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (isAuthenticatedUtil()) {
      setIsAuthenticated(true);
      setUserRole(Cookies.get("userRole"));
    } else {
      setIsAuthenticated(false);
      setUserRole("");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userRole }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Box sx={{ height: 80 }} />
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route
              path="/reservation"
              element={
                isAuthenticated ? <ReservationPage /> : <Navigate to="/login" />
              }
            />
                        <Route path="/mes-reservations" element={<MesReservations />} />
            <Route path="/administration" element={<AdminDashboard />} />
            <Route path="/admin/films" element={<FilmsPage />} />
            <Route path="/admin/seances" element={<SeancesPage />} />
            <Route path="/admin/salles" element={<SallesPage />} />
            <Route path="/films/:id_film" element={<MoviesDetailles/>} />
            <Route path="/avis" element={<GererLesAvis />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
