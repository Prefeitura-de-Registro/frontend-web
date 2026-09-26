import React from 'react';

type StatusType =
  | 'nova_solicitacao'
  | 'atendimento'
  | 'aberto'
  | 'concluido'
  | 'aprovada'
  | 'recusada';

const statusStyles: Record<
  StatusType,
  { bg: string; dot: string; text: string; label: string }
> = {
  nova_solicitacao: {
    bg: 'bg-[#dcecf5]',
    dot: 'bg-[#0073a9]',
    text: 'text-[#0073a9]',
    label: 'nova solicitação',
  },
  atendimento: {
    bg: 'bg-[#dcecf5]',
    dot: 'bg-[#0073a9]',
    text: 'text-[#0073a9]',
    label: 'em atendimento',
  },
  aberto: {
    bg: 'bg-red-100',
    dot: 'bg-red-600',
    text: 'text-red-600',
    label: 'aberto',
  },
  recusada: {
    bg: 'bg-red-100',
    dot: 'bg-red-600',
    text: 'text-red-600',
    label: 'recusada',
  },
  aprovada: {
    bg: 'bg-emerald-100',
    dot: 'bg-emerald-500',
    text: 'text-emerald-500',
    label: 'aprovada',
  },
  concluido: {
    bg: 'bg-teal-100',
    dot: 'bg-teal-500',
    text: 'text-teal-500',
    label: 'concluído',
  },
};

export const StatusPill: React.FC<{ status: StatusType }> = ({ status }) => {
  const config = statusStyles[status];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg}`}
    >
      <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
      <span className={`text-xs font-bold ${config.text}`}>{config.label}</span>
    </div>
  );
};
