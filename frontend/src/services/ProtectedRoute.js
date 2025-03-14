import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Proteger a página, redirecionando se o usuário não estiver logado
const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está logado
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não estiver logado, redireciona para a página de login
      router.push('/login');
    }
  }, [router]);

  // Se o usuário estiver logado, renderiza o conteúdo da página
  return <>{children}</>;
};

export default ProtectedRoute;