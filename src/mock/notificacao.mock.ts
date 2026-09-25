import type { Notificacoes } from '../types/notificacao';

export const notificacoesMock: Notificacoes[] = [
  {
    id: '1',
    tipo: 'Nova solicitação recebida',
    descricao:
      'A secretaria de Meio Ambiente enviou uma solicitação referente ao chamado 2026-00030',
    tempoAtras: '30 minutos atrás',
  },
  {
    id: '2',
    tipo: 'Chamado próximo do prazo',
    descricao: 'Chamado #123 está próximo do prazo de atendimento',
    tempoAtras: '2025-01-11T07:30:00Z',
  },
  {
    id: '3',
    tipo: 'Nova solicitação recebida',
    descricao: 'Nova ocorrência registrada: Poda na Av. Central',
    tempoAtras: '2025-01-10T16:45:00Z',
  },
];
