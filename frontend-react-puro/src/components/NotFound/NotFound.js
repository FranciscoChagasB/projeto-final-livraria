import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const PageNotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="page-not-found-container">
            <h2 className="page-not-found-title">404</h2>
            <p className="page-not-found-message">A página que você está procurando não foi encontrada.</p>
            <button className="page-not-found-btn" onClick={handleGoHome}>Voltar para a página inicial</button>
        </div>
    );
};

export default PageNotFound;