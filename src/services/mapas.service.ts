import { api } from './api';
import type { MapaTickets } from '../types/gestao';
import type { TicketStatus } from '../types/ticket';

// GET /api/mapas (funcionário ou gestor). Sem datas, o back usa só os últimos
// 30 dias; "fim" é exclusivo e o período máximo é de 366 dias.
export async function consultarMapa(
  filtros: {
    status?: TicketStatus[];
    idDepartamento?: number;
    inicio?: string;
    fim?: string;
  } = {},
): Promise<MapaTickets> {
  const { data } = await api.get<MapaTickets>('/api/mapas', {
    params: {
      inicio: filtros.inicio,
      fim: filtros.fim,
      // o back espera lista separada por vírgula (?status=aberto,pendente)
      status: filtros.status?.length ? filtros.status.join(',') : undefined,
      idDepartamento: filtros.idDepartamento,
    },
  });
  return data;
}
