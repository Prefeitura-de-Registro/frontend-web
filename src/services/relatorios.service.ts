import { api } from './api';
import type {
  DesempenhoDepartamento,
  Indicadores,
  PeriodoRelatorio,
  TicketsPorCategoria,
  VolumeSemana,
} from '../types/gestao';

// GET /api/relatorios/* (somente gestor). "fim" é exclusivo e o período
// máximo é de 366 dias.
export async function consultarIndicadores(
  periodo: PeriodoRelatorio,
): Promise<Indicadores> {
  const { data } = await api.get<Indicadores>('/api/relatorios/indicadores', {
    params: periodo,
  });
  return data;
}

export async function consultarVolumeSemanal(
  periodo: PeriodoRelatorio,
): Promise<VolumeSemana[]> {
  const { data } = await api.get<VolumeSemana[]>('/api/relatorios/volume', {
    params: periodo,
  });
  return data;
}

export async function consultarTicketsPorCategoria(
  periodo: PeriodoRelatorio,
): Promise<TicketsPorCategoria> {
  const { data } = await api.get<TicketsPorCategoria>(
    '/api/relatorios/categorias',
    { params: periodo },
  );
  return data;
}

export async function consultarDesempenhoDepartamentos(
  periodo: PeriodoRelatorio,
): Promise<DesempenhoDepartamento[]> {
  const { data } = await api.get<DesempenhoDepartamento[]>(
    '/api/relatorios/departamentos',
    { params: periodo },
  );
  return data;
}
