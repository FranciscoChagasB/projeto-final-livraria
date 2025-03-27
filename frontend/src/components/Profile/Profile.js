import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../services/userService';
import "./Profile.css";

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile();
                console.log('Perfil retornado:', profile);
                if (!profile) throw new Error("Perfil não encontrado");

                setName(profile.name || '');
                setEmail(profile.email || '');
                setCpf(profile.cpf || '');
            } catch (error) {
                setError('Erro ao carregar perfil');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        
        try {
            await updateProfile(name, cpf, email);
            setSuccessMessage('Perfil atualizado com sucesso');
        } catch (error) {
            setError('Erro ao atualizar perfil');
        } finally {
            setLoading(false);
            setTimeout(() => {
                setError(null);
                setSuccessMessage(null);
            }, 3000);
        }
    };

    if (loading) return (
        <div className="loading-message">Carregando...</div>
    );

    return (
        <div className="container-profile">
            <div className="user-profile-container">
                <h1 tabIndex="-1">Perfil</h1>

                {/* Exibindo a mensagem de erro, se existir */}
                {error && <div className="error-message">{error}</div>}

                {/* Exibindo a mensagem de sucesso, se existir */}
                {successMessage && <div className="success-message">{successMessage}</div>}

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