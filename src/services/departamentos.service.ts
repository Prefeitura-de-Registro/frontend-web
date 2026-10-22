import { api } from './api';
import type { DepartamentoResumo } from '../types/ticket';

// GET /api/departamentos (funcionário ou gestor): departamentos ativos
export async function listarDepartamentos(): Promise<DepartamentoResumo[]> {
  const { data } = await api.get<DepartamentoResumo[]>('/api/departamentos');
  return data;
}
