export type StatusOperador = 'ativo' | 'inativo';

export interface Operador {
  id: string;
  nomeCompleto: string;
  matricula: string;
  email: string;
  telefone: string;
  departamento: string;
  cargo: string;
  chamados: number; // total de chamados atribuídos
  status: StatusOperador;
  foto?: string;
}

// O que o formulário coleta: sem id e sem chamados (nascem no cadastro)
export type NovoOperador = Omit<Operador, 'id' | 'chamados'>;
