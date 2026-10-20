import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarServidor } from '../ui/SidebarServidor';

export const ServidorLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex bg-[#f1f5f9] overflow-hidden font-sans">
      {/* Sidebar Fixo ocupando 100% da altura do Viewport */}
      <SidebarServidor />

      {/* Conteúdo Principal com Scroll Independente */}
      <main className="flex-1 h-full overflow-y-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ServidorLayout;
