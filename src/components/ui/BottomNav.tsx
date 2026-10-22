import React from 'react';
import { Home, ClipboardList, FileText, MapPin, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Início', icon: Home },
    { id: 'chamados', label: 'Chamados', icon: ClipboardList },
    { id: 'solicitacoes', label: 'Solicitações', icon: FileText },
    { id: 'mapa', label: 'Mapa', icon: MapPin },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-between px-6 py-2 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] pb-safe z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center justify-between h-14 min-w-[60px]"
          >
            <div className="flex flex-col items-center gap-1 mt-1">
              <Icon
                size={24}
                className={isActive ? 'text-[#0073a9]' : 'text-gray-500'}
              />
              <span
                className={`text-[11px] ${isActive ? 'text-[#0073a9] font-medium' : 'text-gray-500'}`}
              >
                {tab.label}
              </span>
            </div>
            <div
              className={`h-[2px] w-full mt-1 transition-all ${isActive ? 'bg-[#0073a9]' : 'bg-transparent'}`}
            />
          </button>
        );
      })}
    </div>
  );
};
