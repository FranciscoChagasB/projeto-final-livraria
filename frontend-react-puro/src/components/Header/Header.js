import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import perfilIcon from "../../images/user.png"; 
import "./Header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLogin();
    }, []);

    // Fecha o dropdown ao clicar fora dele
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setTimeout(() => setIsDropdownOpen(false), 200);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login'); // Redireciona para o login após logout
        }
    };

    return (
        <header className="header-container">
            <div class="logo">
                <h1>Sistem de livraria</h1>
            </div>
            <div className="nav-content">
                <nav className="nav">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/editora">Editoras</Link></li>
                        <li><Link to="/livro">Livros</Link></li>
                        <li><Link to="/emprestimo">Emprestimo</Link></li>
                        <li><Link to="/aluno">Cadastro aluno</Link></li>
                    </ul>
                </nav>

                {isLoggedIn && (
                    <div className="profile-container" ref={dropdownRef}>
                        <button
                            className="profileButton"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                           <img src={perfilIcon} alt="Ícone"  height={40}/>

                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-link">Ver Perfil</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;