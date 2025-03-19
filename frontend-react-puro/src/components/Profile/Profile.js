import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/userService';
import "./Profile.css";

const Profile = () => {
    const [setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                if (!profile) throw new Error("Perfil não encontrado");

                setUser(profile);
                setName(profile.name || '');
                setEmail(profile.email || '');
                setCpf(profile.cpf || '');
            } catch (error) {
                setError('Erro ao carregar perfil');
                setTimeout(() => navigate('/login'), 2000);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await updateProfile(name, cpf, email);
            alert('Perfil atualizado com sucesso');
        } catch (error) {
            setError('Erro ao atualizar perfil');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="loading-message">Carregando...</div>
    );

    if (error) return (
        <div className="error-message">{error}</div>
    );

    return (
        <div className="container">
            <div className="user-profile-container">
                <h1 tabIndex="-1">Perfil</h1>
                <form className="user-profile-form" onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        required
                        
                    />
                    <label>CPF</label>
                    <input
                        type="text"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <button type="submit" className="user-profile-button" disabled={loading}>
                        {loading ? 'Carregando...' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Profile;