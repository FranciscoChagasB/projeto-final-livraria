import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const [search, setSearch] = useState("");
    const featuredBooks = [
        { id: 1, title: "Dom Quixote", author: "Miguel de Cervantes" },
        { id: 2, title: "1984", author: "George Orwell" },
        { id: 3, title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry" }
    ];

    const categories = ["Ficção", "Não-Ficção", "Fantasias", "Romances", "Terror", "Ciência"];

    useEffect(() => {
        document.title = "Sistema de Gerenciamento de Biblioteca";
    }, []);

    return (
        <div className="home-page-container">
            <h2 className="home-title">Bem-vindo à Biblioteca</h2>
            
            {/* Barra de Pesquisa */}
            <input
                type="text"
                className="home-search"
                placeholder="Buscar livros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            
            {/* Livros em Destaque */}
            <div className="home-featured">
                <h3>Livros em Destaque</h3>
                <ul>
                    {featuredBooks.map(book => (
                        <li key={book.id}>{book.title} - {book.author}</li>
                    ))}
                </ul>
            </div>
            
            {/* Categorias */}
            <div className="home-categories">
                <h3>Categorias Populares</h3>
                <div className="categories-list">
                    {categories.map((category, index) => (
                        <span key={index} className="category">{category}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
