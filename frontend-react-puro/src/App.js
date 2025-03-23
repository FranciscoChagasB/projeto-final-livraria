import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute';
import Header from './components/Header/Header';
import Editora from './components/Editora/Editora.js';
import Livro from './components/Livro/Livro.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import Login from './components/Login/LoginUser.js'
import Register from './components/Login/RegisterUser.js';
import LivroForm from './components/Livro/LivroForm/LivroForm.js';
import EditoraForm from './components/Editora/EditoraForm/EditoraForm.js';
import PageNotFound from './components/NotFound/NotFound.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function HeaderWrapper() {
  const location = useLocation();
  
  // Não exibe o Header nas rotas de Login e Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }
  
  return <Header />;
}

function App() {
  return (
    <Router>
      <HeaderWrapper /> {/* Coloca o HeaderWrapper aqui para usar useLocation */}

      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas (necessitam de login) */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/editora" element={<ProtectedRoute><Editora /></ProtectedRoute>} />
        <Route path="/livro" element={<ProtectedRoute><Livro /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/editoraform' element={<ProtectedRoute><EditoraForm /></ProtectedRoute>} />
        <Route path='/editoraform/:id' element={<ProtectedRoute><EditoraForm /></ProtectedRoute>} />
        <Route path='/livrosform' element={<ProtectedRoute><LivroForm /></ProtectedRoute>} />
        <Route path='/livrosform/:id' element={<ProtectedRoute><LivroForm /></ProtectedRoute>} />
        
        {/* Rota padrão ou erro 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;