import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children?: ReactNode;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-[#0073a9] font-bold">
        Carregando...
      </div>
    );
  }

  // Se tentar acessar por URL e não tiver logado, barra na hora
  if (!usuario) {
    return <Navigate to="/signin" replace />;
  }

  // PEGA O TIPO CORRETO DO BANCO
  const tipo = usuario.tipo_usuario || usuario.tipo_usuario || '';

  if (allowedRoles) {
    const isServidorRoute = allowedRoles.includes('servidor');
    const userIsServidor = tipo === 'funcionario' || tipo === 'gestor';

    // Munícipe tentando acessar painel do servidor
    if (isServidorRoute && !userIsServidor) {
      return <Navigate to="/home" replace />;
    }

    // Servidor tentando acessar a área de munícipe
    const isMunicipeRoute = allowedRoles.includes('municipe');
    if (isMunicipeRoute && userIsServidor) {
      return <Navigate to="/servidor" replace />;
    }
  }

  return children ? <>{children}</> : <Outlet />;
}
