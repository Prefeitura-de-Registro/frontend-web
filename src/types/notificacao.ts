interface Notificacao {
  id: string;
  tipo: 'Nova solicitação recebida' | 'Chamado próximo do prazo';
  descricao: string;
  tempoAtras: string;
}

export type Notificacoes = Notificacao;
