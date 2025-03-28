import React, { useEffect, useState } from 'react';
import { getLivrosByFilters } from '../../services/livrosService';
import { getBookCover } from '../../services/livrosService';  // Importa a função para pegar as capas
import './Home.css';

const Home = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [bookCovers, setBookCovers] = useState({});
    const categories = ["Ficção", "Não-Ficção", "Fantasias", "Romances", "Terror", "Ciência"];

    useEffect(() => {
        document.title = "Sistema de Gerenciamento de Biblioteca";
        fetchFeaturedBooks();
    }, []);

    const fetchFeaturedBooks = async () => {
        try {
            const data = await getLivrosByFilters({}, 1, 5);
            setFeaturedBooks(data.data);

            // Buscar as capas dos livros
            const covers = {};
            for (const book of data.data) {
                const coverUrl = await getBookCover(book.isbn);
                covers[book.isbn] = coverUrl;
            }
            setBookCovers(covers);

        } catch (error) {
            console.error("Erro ao buscar livros em destaque", error);
        }
    };

    return (
        <div className="home-page-container">
            <h2 className="home-title">Bem-vindo à Biblioteca</h2>
            
            {/* Livros em Destaque */}
            <div className="home-featured">
                <h3>Livros em Destaque</h3>
                <ul>
                    {featuredBooks.length > 0 ? (
                        featuredBooks.map(book => (
                            <li key={book.id}>
                                <img 
                                    src={bookCovers[book.isbn] || 'https://placehold.co/200x300'} 
                                    alt={book.titulo} 
                                    style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
                                />
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
