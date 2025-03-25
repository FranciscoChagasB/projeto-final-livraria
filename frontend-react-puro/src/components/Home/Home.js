import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLivrosByFilters } from '../../services/livrosService';
import './Home.css';

const Home = () => {
    const [search, setSearch] = useState("");
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const categories = ["Ficção", "Não-Ficção", "Fantasias", "Romances", "Terror", "Ciência"];

    useEffect(() => {
        document.title = "Sistema de Gerenciamento de Biblioteca";
        fetchFeaturedBooks();
    }, []);

    const fetchFeaturedBooks = async () => {
        try {
            const data = await getLivrosByFilters({}, 1, 5);
            setFeaturedBooks(data.data);
        } catch (error) {
            console.error("Erro ao buscar livros em destaque", error);
        }
    };

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
                    {featuredBooks.length > 0 ? (
                        featuredBooks.map(book => (
                            <li key={book.id}>
                                <img src='https://placehold.co/40x40' alt={book.titulo} /> 
                                {book.titulo} - {book.autor?.nome || "Autor desconhecido"}
                            </li>
                        ))
                    ) : (
                        <p>Nenhum livro em destaque encontrado.</p>
                    )}
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
