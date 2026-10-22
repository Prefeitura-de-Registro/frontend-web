import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  FileText,
  MapPin,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import logoFalaRegistro from '../../assets/logo-fala-registro.svg';

interface SidebarServidorProps {
  onToggle?: () => void;
}

export const SidebarServidor: React.FC<SidebarServidorProps> = ({
  onToggle,
}) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const menuItems = [
    { to: '/servidor', label: 'Home', icon: Home },
    { to: '/servidor/chamados', label: 'Chamados', icon: FileText },
    { to: '/servidor/mapa', label: 'Mapa de Ocorrência', icon: MapPin },
    { to: '/servidor/operadores', label: 'Operadores', icon: Users },
    { to: '/servidor/relatorios', label: 'Relatórios', icon: BarChart3 },
    { to: '/servidor/configuracoes', label: 'Configurações', icon: Settings },
  ];

  const handleSair = () => {
    signOut();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="relative h-screen bg-[#0073a9] text-white w-60 flex flex-col justify-between shrink-0 shadow-lg z-20">
      {/* Botão de Toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute -right-3.5 top-6 bg-white text-[#0073a9] p-1 rounded-full shadow-md hover:bg-slate-100 transition-colors z-30"
      >
        <ChevronLeft size={18} />
      </button>

      <div>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
          <img
            src={logoFalaRegistro}
            alt="Fala Registro!"
            className="h-10 w-auto brightness-0 invert"
          />
        </div>

        {/* Links de Navegação */}
        <nav className="mt-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/servidor'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-white/20 text-white font-bold shadow-xs'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sair na Base */}
      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={handleSair}
          className="flex items-center gap-3 w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl font-medium text-sm transition-colors"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
