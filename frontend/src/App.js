import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ProtectedRoute from './services/ProtectedRoute.js';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Editora from './components/Editora/Editora.js';
import Livro from './components/Livro/Livro.js';
import Home from './components/Home/Home.js';
import Profile from './components/Profile/Profile.js';
import Login from './components/Login/LoginUser.js'
import Register from './components/Login/RegisterUser.js';
import LivroForm from './components/Livro/LivroForm/LivroForm.js';
import EditoraForm from './components/Editora/EditoraForm/EditoraForm.js';
import PageNotFound from './components/NotFound/NotFound.js';
import Aluno from './components/Aluno/Aluno.js';
import AlunoForm from './components/Aluno/AlunoForm/AlunoForm.js';
import Emprestimo from './components/Emprestimo/Emprestimo.js';
import EmprestimoForm from './components/Emprestimo/EmprestimoForm/EmprestimoForm.js';
import { ThemeProvider } from './components/ThemeToggle/ThemeContext.js';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.js';
import './components/ThemeToggle/DarkTheme.css'
import EmprestimoDevolver from './components/Emprestimo/EmprestimoDevolucao.js';

function HeaderWrapper() {
  const location = useLocation();

  // Não exibe o Header nas rotas de Login e Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return <Header />;
}

function FooterWrapper() {
  const location = useLocation();

  // Não exibe o Footer nas rotas de Login e Register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return <Footer />;
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
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
          <Route path='/aluno' element={<ProtectedRoute><Aluno /></ProtectedRoute>} />
          <Route path='/alunosform' element={<ProtectedRoute><AlunoForm /></ProtectedRoute>} />
          <Route path='/alunosform/:id' element={<ProtectedRoute><AlunoForm /></ProtectedRoute>} />
          <Route path='/emprestimo' element={<ProtectedRoute><Emprestimo /></ProtectedRoute>} />
          <Route path='/emprestimosform' element={<ProtectedRoute><EmprestimoForm /></ProtectedRoute>} />
          <Route path='/emprestimosform/:id' element={<ProtectedRoute><EmprestimoForm /></ProtectedRoute>} />
          <Route path='/emprestimosdevolver' element={<ProtectedRoute><EmprestimoDevolver /></ProtectedRoute>} />
          {/* Rota padrão ou erro 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <FooterWrapper />
      </Router>
    </ThemeProvider>
  );
}

export default App;