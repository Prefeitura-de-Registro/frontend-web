export type TicketStatus =
  | 'aberto'
  | 'em_analise'
  | 'em_andamento'
  | 'pendente'
  | 'resolvido'
  | 'fechado';

export type TicketPrioridade = 'normal' | 'urgente';

export type SolicitacaoStatus =
  'pendente' | 'em_analise' | 'respondida' | 'recusada';

export type TipoEvento =
  'criacao' | 'mudanca_status' | 'ajuste_prazo' | 'atribuicao';

export interface Paginacao {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RespostaPaginada<T> {
  data: T[];
  pagination: Paginacao;
}

export interface DepartamentoResumo {
  id: number;
  nome: string;
  sigla: string | null;
}

export interface CategoriaResumo {
  id: number;
  nome: string;
  idDepartamento: number;
}

export interface UsuarioResumo {
  id: number;
  name: string;
}

// Item da listagem: GET /api/tickets
export interface TicketResumo {
  id: number;
  idUsuario: number;
  idCategoria: number;
  idDepartamento: number;
  idFuncionarioResponsavel: number | null;
  status: TicketStatus;
  prioridade: TicketPrioridade;
  descricao: string | null;
  protocolo: string | null;
  prazoPrimeiraRespostaMinutos: number;
  prazoResolucaoMinutos: number;
  createdAt: string;
  categoria: CategoriaResumo;
  departamento: DepartamentoResumo;
  funcionarioResponsavel: UsuarioResumo | null;
}

export interface TicketResposta {
  id: number;
  idPergunta: number;
  valor: boolean;
  pergunta: { id: number; enunciado: string };
}

export interface TicketHistorico {
  id: number;
  tipoEvento: TipoEvento;
  status: TicketStatus | null;
  prazoMinutos: number | null;
  texto: string | null;
  createdAt: string;
  usuario: UsuarioResumo | null;
}

export interface TicketSolicitacao {
  id: number;
  status: SolicitacaoStatus;
  descricao: string;
  resposta: string | null;
  createdAt: string;
  departamentoSolicitado: DepartamentoResumo;
}

export interface TicketArquivo {
  id: number;
  path: string;
  tipo: string | null;
}

// Detalhe: GET /api/tickets/:id (e retorno de assume / update)
export interface TicketDetalhe extends TicketResumo {
  usuario: { id: number; name: string; email: string | null };
  respostas: TicketResposta[];
  historicos: TicketHistorico[];
  solicitacoes: TicketSolicitacao[];
  arquivos: TicketArquivo[];
}

export interface AtualizacaoTicket {
  status?: TicketStatus;
  prioridade?: TicketPrioridade;
  descricao?: string;
  prazoPrimeiraRespostaMinutos?: number;
  prazoResolucaoMinutos?: number;
  idFuncionarioResponsavel?: number | null;
}
