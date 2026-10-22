export type StatusOperador = 'ativo' | 'inativo';

export type NivelPermissao =
  'visualizacao' | 'operador_standard' | 'administrador_local';

export interface Operador {
  id: string;
  nomeCompleto: string;
  matricula: string;
  email: string;
  telefone: string;
  departamento: string;
  cargo: string;
  chamados: number;
  status: StatusOperador;
  foto?: string;
  nivelPermissao?: NivelPermissao; // seguindo o design do figma
}

export type NovoOperador = Omit<Operador, 'id' | 'chamados'>;
