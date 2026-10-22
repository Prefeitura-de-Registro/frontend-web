import { api } from './api';
import type {
  Funcionario,
  FuncionarioCriado,
  NovoFuncionario,
} from '../types/gestao';
import type { RespostaPaginada } from '../types/ticket';

// GET /api/user (somente gestor). Lista apenas usuários do tipo "funcionario",
// ativos e inativos.
export async function listarFuncionarios(
  params: { page?: number; limit?: number; busca?: string } = {},
): Promise<RespostaPaginada<Funcionario>> {
  const { data } = await api.get<RespostaPaginada<Funcionario>>('/api/user', {
    params,
  });
  return data;
}

const LIMITE_POR_PAGINA = 100; // máximo aceito pelo back
const MAXIMO_PAGINAS = 20;

// A tela de operadores busca, ordena e pagina no front, então carregamos tudo.
export async function listarTodosFuncionarios(): Promise<Funcionario[]> {
  const todos: Funcionario[] = [];
  let pagina = 1;
  let totalPaginas: number;

  do {
    const resposta = await listarFuncionarios({
      page: pagina,
      limit: LIMITE_POR_PAGINA,
    });
    todos.push(...resposta.data);
    totalPaginas = resposta.pagination.totalPages;
    pagina += 1;
  } while (pagina <= totalPaginas && pagina <= MAXIMO_PAGINAS);

  return todos;
}

// POST /api/user (somente gestor)
export async function criarFuncionario(
  dados: NovoFuncionario,
): Promise<FuncionarioCriado> {
  const { data } = await api.post<FuncionarioCriado>('/api/user', dados);
  return data;
}

// DELETE /api/user/:id (somente gestor). É soft delete: o usuário fica inativo.
export async function desativarFuncionario(id: number): Promise<void> {
  await api.delete(`/api/user/${id}`);
}
