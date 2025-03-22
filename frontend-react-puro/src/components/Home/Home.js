import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    useEffect(() => {
        document.title = "Sistema de Gerenciamento de Biblioteca";
    }, []);

    return (
        <div className="home-container">
            
            <section className="features">
                <div className="feature-card">
                    <h2>Editoras</h2>
                    <p>Gerencie todas as editoras cadastradas no sistema.</p>
                </div>
                <div className="feature-card">
                    <h2>Livros</h2>
                    <p>Adicione, edite e remova livros com facilidade.</p>
                </div>
                <div className="feature-card">
                    <h2>Empréstimos</h2>
                    <p>Controle os empréstimos e devoluções de livros.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;