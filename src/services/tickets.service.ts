import { api } from './api';
import type {
  AtualizacaoTicket,
  RespostaPaginada,
  TicketDetalhe,
  TicketPrioridade,
  TicketResumo,
  TicketStatus,
} from '../types/ticket';

export interface FiltrosTickets {
  page?: number;
  limit?: number;
  status?: TicketStatus;
  prioridade?: TicketPrioridade;
  idDepartamento?: number;
  busca?: string;
}

// GET /api/tickets (funcionário ou gestor, já filtrado pelos departamentos dele)
export async function listarTickets(
  filtros: FiltrosTickets = {},
): Promise<RespostaPaginada<TicketResumo>> {
  const { data } = await api.get<RespostaPaginada<TicketResumo>>(
    '/api/tickets',
    { params: filtros },
  );
  return data;
}

export async function buscarTicket(id: number): Promise<TicketDetalhe> {
  const { data } = await api.get<TicketDetalhe>(`/api/tickets/${id}`);
  return data;
}

export async function assumirTicket(id: number): Promise<TicketDetalhe> {
  const { data } = await api.patch<TicketDetalhe>(`/api/tickets/${id}/assume`);
  return data;
}

export async function atualizarTicket(
  id: number,
  alteracoes: AtualizacaoTicket,
): Promise<TicketDetalhe> {
  const { data } = await api.patch<TicketDetalhe>(
    `/api/tickets/${id}`,
    alteracoes,
  );
  return data;
}
