import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    useEffect(() => {
        document.title = "Sistema de Gerenciamento de Biblioteca";
    }, []);

    return (
        <div className="home-page-container">
            <h2 className="home-title">Página Inicial</h2>
            <Link to="/profile" className="home-profile-link">Ver Perfil</Link>
        </div>
    );
}

export default Home;