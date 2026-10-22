import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarServidor } from '../ui/SidebarServidor';
import NavbarServidor from '../ui/NavbarServidor';
import { useAuth } from '../../contexts/useAuth';

export const ServidorLayout: React.FC = () => {
  const { usuario } = useAuth();
  const nomeUsuario = usuario?.nome.trim().split(' ')[0] || 'Gestor';

  return (
    <div className="h-screen w-full flex bg-[#f1f5f9] overflow-hidden font-sans">
      {/* Sidebar Fixo ocupando 100% da altura do Viewport */}
      <SidebarServidor />

      {/* Coluna da direita: navbar fixa em cima, conteúdo rolando embaixo */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <NavbarServidor nomeUsuario={nomeUsuario} temNotificacaoNova />

        <main className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ServidorLayout;
