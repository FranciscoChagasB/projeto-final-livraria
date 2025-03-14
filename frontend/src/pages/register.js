import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '../services/userService';
import Link from 'next/link';
import "../styles/Register.css";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, cpf, email, password);
      router.push('/login');
    } catch (error) {
      alert('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastrar</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
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
          {loading ? 'Carregando...' : 'Cadastrar'}
        </button>
      </form>
      <p>
        Já tem uma conta? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}