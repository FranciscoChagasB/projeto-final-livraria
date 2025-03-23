import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Converter para segundos

      if (decoded.exp < currentTime) {
        console.warn("Token expirado. Redirecionando para login.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;