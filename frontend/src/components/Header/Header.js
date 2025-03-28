import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import perfilIcon from "../../images/user.png";
import "./Header.css";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

            {/* Menu Hamburguer (somente mobile) */}
            <div className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Navbar mobile (hambúrguer) */}
            <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/editora" onClick={() => setIsMobileMenuOpen(false)}>Editoras</Link></li>
                    <li><Link to="/livro" onClick={() => setIsMobileMenuOpen(false)}>Livros</Link></li>
                    <li><Link to="/emprestimo">Emprestimo</Link></li>
                    <li><Link to="/aluno">Aluno</Link></li>
                </ul>
            </nav>

            {/* Logo */}
            <div className="logo">
                <h1>Sistema de Livraria</h1>
            </div>

            {/* Navbar padrão (desktop) */}
            <div className="nav-content">
                <nav className="nav">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/editora">Editoras</Link></li>
                        <li><Link to="/livro">Livros</Link></li>
                        <li><Link to="/emprestimo">Emprestimo</Link></li>
                        <li><Link to="/aluno">Aluno</Link></li>
                    </ul>
                </nav>
            </div>

            {/* Dropdown para perfil (só quando logado) */}
            {isLoggedIn && (
                <div className={`profile-container ${isDropdownOpen ? "active" : ""}`} ref={dropdownRef}>
                    <button
                        className="profileButton"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img src={perfilIcon} alt="Ícone" height={40} />
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile" className="dropdown-link">Ver Perfil</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;