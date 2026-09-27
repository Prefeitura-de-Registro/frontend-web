import React from 'react';
import { Send, Inbox } from 'lucide-react';

interface TabsProps {
  activeTab: 'enviadas' | 'recebidas';
  onChange: (tab: 'enviadas' | 'recebidas') => void;
}

export const TabsListagem: React.FC<TabsProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex bg-[#dcecf5] p-1.5 rounded-full w-full max-w-sm mx-auto">
      <button
        onClick={() => onChange('enviadas')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
          activeTab === 'enviadas'
            ? 'bg-[#0073a9] text-white shadow-md'
            : 'text-[#0073a9]'
        }`}
      >
        <Send size={16} /> Enviadas
      </button>

      <button
        onClick={() => onChange('recebidas')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
          activeTab === 'recebidas'
            ? 'bg-[#0073a9] text-white shadow-md'
            : 'text-[#0073a9]'
        }`}
      >
        <Inbox size={16} /> Recebidas
      </button>
    </div>
  );
};
