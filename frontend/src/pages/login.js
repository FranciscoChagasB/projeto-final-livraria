import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../services/userService';
import Link from 'next/link';
import "../styles/Login.css";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(email, password);
      localStorage.setItem('token', response.token);
      router.push('/home');
    } catch (error) {
      alert('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Login'}
        </button>
      </form>
      <p>
        Não tem uma conta? <Link href="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}