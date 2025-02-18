import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export const isAuthenticatedUtil = () => {
  const token = Cookies.get("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      
      Cookies.remove("token");
      console.log("Token has expired");
      return false;
    }
    return true;
  } catch (error) {
    
    Cookies.remove("token");
    console.log("Token is invalid");
    return false;
  }
};


export const logOut = () => {
  Cookies.remove("token");
  Cookies.remove("userRole");
  Cookies.remove("email");
  Cookies.remove("id_utilisateur");
  
  window.location.href = "/";
  
};
