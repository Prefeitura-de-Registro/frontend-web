import type {
  DepartamentoResumo,
  TicketPrioridade,
  TicketStatus,
} from './ticket';

// ---------- Funcionários: GET /api/user (somente gestor) ----------
export interface Funcionario {
  id: number;
  name: string;
  matricula: string | null;
  cargo: string | null;
  ativo: boolean;
  createdAt: string;
  departamentos: DepartamentoResumo[];
  totalTickets: number;
}

// ---------- Relatórios: GET /api/relatorios/* (somente gestor) ----------
export interface PeriodoRelatorio {
  inicio: string; // AAAA-MM-DD (inclusivo)
  fim: string; // AAAA-MM-DD (exclusivo)
  idDepartamento?: number;
}

export interface Indicadores {
  ticketsTotais: number;
  ticketsResolvidos: number;
  temposTicket: {
    resolucaoMinutos: number | null;
    primeiraRespostaMinutos: number | null;
  };
}

export type StatusGeral =
  'Excelente' | 'Bom' | 'Regular' | 'Crítico' | 'Sem dados';

export interface DesempenhoDepartamento {
  idDepartamento: number;
  departamento: string;
  secretaria: string;
  ticketsTotais: number;
  ticketsResolvidos: number;
  tempoMedioResolucaoMinutos: number | null;
  resolvidosNoPrazo: number;
  statusGeral: StatusGeral;
}

// ---------- Mapa: GET /api/mapas (funcionário ou gestor) ----------
export interface MarcadorTicket {
  id: number;
  status: TicketStatus;
  prioridade: TicketPrioridade;
  descricao: string | null;
  createdAt: string;
  categoria: string;
  departamento: { id: number; nome: string };
  lat: number;
  lng: number;
  distanciaMetros: number | null;
}

export interface MapaTickets {
  centro: {
    lat: number;
    lng: number;
    origem: 'usuario' | 'tickets' | 'padrao';
  };
  limites: { sul: number; norte: number; oeste: number; leste: number } | null;
  total: number;
  truncado: boolean;
  tickets: MarcadorTicket[];
}

export interface VolumeSemana {
  semanaInicio: string; // AAAA-MM-DD (segunda-feira da semana)
  abertos: number;
  concluidos: number;
}

export interface TicketsPorCategoria {
  categorias: { idCategoria: number; nome: string; quantidade: number }[];
}

// ---------- Cadastro de funcionário: POST /api/user (somente gestor) ----------
export interface NovoFuncionario {
  nome: string;
  email: string;
  senha: string; // mínimo 8 caracteres
  cpf: string; // 11 dígitos, com ou sem pontuação
  cargo: string; // mínimo 3 caracteres
  matricula: string; // formato SIGLA-0000 (ex.: SISP-0001)
  departamentoIds: number[];
  status: boolean; // true = ativo
  tipoUsuario?: 'funcionario' | 'gestor';
}

export interface FuncionarioCriado {
  id: number;
  name: string;
  email: string;
  tipoUsuario: string;
  createdAt: string;
}
