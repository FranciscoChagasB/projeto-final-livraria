import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLogin();
    router.events.on('routeChangeComplete', checkLogin);

    return () => {
      router.events.off('routeChangeComplete', checkLogin);
    };
  }, [router.events]);

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
      router.push('/login');
    }
  };

  return (
    <header className="header-container">
      <div className="nav-content">
        <Link href="/home" className="home-link">Home</Link>

        <nav className="nav">
          <ul>
            <li><Link href="/editora">Editoras</Link></li>
            <li><Link href="/teste2">Teste 2</Link></li>
            <li><Link href="/teste3">Teste 3</Link></li>
            <li><Link href="/teste4">Teste 4</Link></li>
            <li><Link href="/teste5">Teste 5</Link></li>
            <li><Link href="/teste6">Teste 6</Link></li>
          </ul>
        </nav>

        {/* Menu de perfil, só aparece se o usuário estiver autenticado */}
        {isLoggedIn && (
          <div className="profile-container" ref={dropdownRef}>
            <button
              className="profileButton"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              👤
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link href="/profile" className="dropdown-link">Ver Perfil</Link>
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