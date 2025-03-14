import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProfile, updateProfile } from '../services/userService';
import Header from '../components/Header';
import ProtectedRoute from '../services/ProtectedRoute';
import "../styles/Profile.css";
import Head from "next/head";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

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
        setTimeout(() => router.push('/login'), 2000); // Redireciona após 2 segundos
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

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

  if (loading) return <div className="loading-message">Carregando...
    <Head>
      <title>Sistema de Gerenciamento de Biblioteca</title>
    </Head>
  </div>;
  if (error) return <div className="error-message">{error}
    <Head>
      <title>Sistema de Gerenciamento de Biblioteca</title>
    </Head>
  </div>;

  return (
    <ProtectedRoute>
      <Head>
        <title>Sistema de Gerenciamento de Biblioteca</title>
      </Head>
      <div className="user-profile-container">
        <Header />
        <h2>Perfil</h2>
        <form className="user-profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            required
          />
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            required
          />
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
    </ProtectedRoute>
  );
}