import Link from 'next/link';
import Header from '../components/Header';
import ProtectedRoute from '../services/ProtectedRoute';
import "../styles/Home.css"
import Head from "next/head";

export default function Home() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Sistema de Gerenciamento de Biblioteca</title>
      </Head>
      <div className="home-page-container">
        <Header />
        <h2 className="home-title">Página Inicial</h2>
        <Link href="/profile" className="home-profile-link">Ver Perfil</Link>
      </div>
    </ProtectedRoute>
  );
}