import type {
  TicketPrioridade,
  TicketResumo,
  TicketStatus,
} from '../types/ticket';

interface EstiloStatus {
  label: string;
  badge: string;
  dot: string;
  border: string;
}

export const STATUS_INFO: Record<TicketStatus, EstiloStatus> = {
  aberto: {
    label: 'Aberto',
    badge: 'bg-red-100 text-red-700',
    dot: 'bg-red-600',
    border: 'border-l-red-600',
  },
  em_analise: {
    label: 'Em análise',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500',
  },
  em_andamento: {
    label: 'Em atendimento',
    badge: 'bg-sky-100 text-sky-700',
    dot: 'bg-sky-600',
    border: 'border-l-sky-600',
  },
  pendente: {
    label: 'Pendente',
    badge: 'bg-orange-100 text-orange-700',
    dot: 'bg-orange-500',
    border: 'border-l-orange-500',
  },
  resolvido: {
    label: 'Concluído',
    badge: 'bg-teal-100 text-teal-700',
    dot: 'bg-teal-500',
    border: 'border-l-emerald-400',
  },
  fechado: {
    label: 'Fechado',
    badge: 'bg-gray-100 text-gray-600',
    dot: 'bg-gray-400',
    border: 'border-l-gray-400',
  },
};

export const STATUS_ORDEM: TicketStatus[] = [
  'aberto',
  'em_analise',
  'em_andamento',
  'pendente',
  'resolvido',
  'fechado',
];

// Cores dos marcadores do mapa (hex, pois o Leaflet não usa classes do Tailwind)
export const COR_STATUS_MAPA: Record<TicketStatus, string> = {
  aberto: '#ef4444',
  em_analise: '#eab308',
  em_andamento: '#0284c7',
  pendente: '#f97316',
  resolvido: '#10b981',
  fechado: '#94a3b8',
};

export const PRIORIDADE_INFO: Record<
  TicketPrioridade,
  { label: string; badge: string }
> = {
  normal: { label: 'Normal', badge: 'bg-gray-100 text-gray-700' },
  urgente: { label: 'Urgente', badge: 'bg-red-100 text-red-700' },
};

export function formatarProtocolo(
  ticket: Pick<TicketResumo, 'id' | 'protocolo'>,
): string {
  if (!ticket.protocolo) return `#${ticket.id}`;
  return ticket.protocolo.startsWith('#')
    ? ticket.protocolo
    : `#${ticket.protocolo}`;
}

export function formatarDuracao(minutos: number): string {
  const total = Math.round(minutos);
  if (total >= 1440) return `${Math.floor(total / 1440)}d`;
  if (total >= 60) return `${Math.floor(total / 60)}h`;
  return `${total}min`;
}

export function formatarDataHora(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(iso));
}

export interface PrazoTicket {
  texto: string;
  atrasado: boolean;
  minutosRestantes: number | null;
}

// Prazo de resolução restante: createdAt + prazoResolucaoMinutos - agora
export function calcularPrazo(
  ticket: Pick<TicketResumo, 'status' | 'createdAt' | 'prazoResolucaoMinutos'>,
): PrazoTicket {
  if (ticket.status === 'resolvido' || ticket.status === 'fechado') {
    return { texto: '—', atrasado: false, minutosRestantes: null };
  }

  const decorrido = (Date.now() - new Date(ticket.createdAt).getTime()) / 60000;
  const restante = ticket.prazoResolucaoMinutos - decorrido;

  if (restante <= 0) {
    return { texto: 'Atrasado', atrasado: true, minutosRestantes: restante };
  }

  return {
    texto: formatarDuracao(restante),
    atrasado: false,
    minutosRestantes: restante,
  };
}

// 1125 -> "18h 45m" (mesmo formato dos relatórios)
export function formatarHorasMinutos(
  minutos: number | null | undefined,
): string {
  if (minutos === null || minutos === undefined) return '—';
  const total = Math.round(minutos);
  const horas = Math.floor(total / 60);
  const resto = total % 60;
  if (horas === 0) return `${resto}m`;
  return `${horas}h ${String(resto).padStart(2, '0')}m`;
}
