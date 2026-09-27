import React from 'react';

type StatusType =
  'aberto' | 'atendimento' | 'concluido' | 'aprovada' | 'recusada' | 'nova';

interface StatusTagProps {
  status: StatusType;
  label: string;
}

const statusConfig: Record<StatusType, string> = {
  aberto: 'bg-orange-500',
  atendimento: 'bg-blue-500',
  concluido: 'bg-emerald-500',
  aprovada: 'bg-emerald-400',
  recusada: 'bg-red-500',
  nova: 'bg-cyan-500',
};

export const StatusTag: React.FC<StatusTagProps> = ({ status, label }) => {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-blue-100 rounded-md px-3 py-1 shadow-sm">
      <div className={`w-2 h-2 rounded-full ${statusConfig[status]}`} />
      <span className="text-xs font-medium text-[#0073a9]">{label}</span>
    </div>
  );
};
