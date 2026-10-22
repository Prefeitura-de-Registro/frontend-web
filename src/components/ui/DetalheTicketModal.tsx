import { useCallback, useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  CalendarDays,
  Clock3,
  UserCheck,
  X,
} from 'lucide-react';
import { useRequisicao } from '../../hooks/useRequisicao';
import { mensagemDeErro } from '../../services/erros';
import { listarFuncionarios } from '../../services/funcionarios.service';
import {
  assumirTicket,
  atualizarTicket,
  buscarTicket,
} from '../../services/tickets.service';
import type { Funcionario } from '../../types/gestao';
import type {
  AtualizacaoTicket,
  SolicitacaoStatus,
  TicketDetalhe,
  TicketHistorico,
  TicketPrioridade,
  TicketStatus,
} from '../../types/ticket';
import {
  PRIORIDADE_INFO,
  STATUS_INFO,
  STATUS_ORDEM,
  calcularPrazo,
  formatarDataHora,
  formatarProtocolo,
} from '../../utils/ticket';

const SOLICITACAO_STATUS_LABEL: Record<SolicitacaoStatus, string> = {
  pendente: 'Pendente',
  em_analise: 'Em análise',
  respondida: 'Respondida',
  recusada: 'Recusada',
};

const CLASSE_CAMPO =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-[#0073A9] focus:outline-none focus:ring-1 focus:ring-[#0073A9]';

function minutosParaHoras(minutos: number): string {
  return String(Math.round((minutos / 60) * 100) / 100);
}

// Retorna null quando o valor digitado não é um número positivo
function horasParaMinutos(texto: string): number | null {
  const horas = Number(texto.replace(',', '.'));
  if (!Number.isFinite(horas) || horas <= 0) return null;
  return Math.max(1, Math.round(horas * 60));
}

function descreverEvento(evento: TicketHistorico): string {
  switch (evento.tipoEvento) {
    case 'criacao':
      return 'Chamado aberto';
    case 'mudanca_status':
      return evento.status
        ? `Status alterado para ${STATUS_INFO[evento.status].label}`
        : 'Status alterado';
    case 'ajuste_prazo':
      return evento.texto ?? 'Prazo ajustado';
    case 'atribuicao':
      return 'Responsável atribuído';
  }
}

interface MensagemForm {
  tipo: 'ok' | 'erro';
  texto: string;
}

interface FormEdicaoProps {
  ticket: TicketDetalhe;
  funcionarios: Funcionario[] | null;
  onSalvo: (ticket: TicketDetalhe) => void;
}

function FormEdicao({ ticket, funcionarios, onSalvo }: FormEdicaoProps) {
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [prioridade, setPrioridade] = useState<TicketPrioridade>(
    ticket.prioridade,
  );
  const [responsavel, setResponsavel] = useState(
    ticket.idFuncionarioResponsavel === null
      ? ''
      : String(ticket.idFuncionarioResponsavel),
  );
  const [prazoResposta, setPrazoResposta] = useState(
    minutosParaHoras(ticket.prazoPrimeiraRespostaMinutos),
  );
  const [prazoResolucao, setPrazoResolucao] = useState(
    minutosParaHoras(ticket.prazoResolucaoMinutos),
  );
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<MensagemForm | null>(null);

  // O back só aceita como responsável quem pertence ao departamento do ticket
  const opcoesResponsavel = (funcionarios ?? [])
    .filter(
      (funcionario) =>
        funcionario.ativo &&
        funcionario.departamentos.some(
          (departamento) => departamento.id === ticket.idDepartamento,
        ),
    )
    .map((funcionario) => ({ id: funcionario.id, nome: funcionario.name }));

  const atual = ticket.funcionarioResponsavel;
  if (atual && !opcoesResponsavel.some((opcao) => opcao.id === atual.id)) {
    opcoesResponsavel.unshift({ id: atual.id, nome: atual.name });
  }

  const idResponsavel = responsavel === '' ? null : Number(responsavel);
  const minutosResposta = horasParaMinutos(prazoResposta);
  const minutosResolucao = horasParaMinutos(prazoResolucao);
  const prazoInvalido = minutosResposta === null || minutosResolucao === null;

  const alteracoes: AtualizacaoTicket = {};
  if (status !== ticket.status) alteracoes.status = status;
  if (prioridade !== ticket.prioridade) alteracoes.prioridade = prioridade;
  if (idResponsavel !== ticket.idFuncionarioResponsavel) {
    alteracoes.idFuncionarioResponsavel = idResponsavel;
  }
  if (
    minutosResposta !== null &&
    minutosResposta !== ticket.prazoPrimeiraRespostaMinutos
  ) {
    alteracoes.prazoPrimeiraRespostaMinutos = minutosResposta;
  }
  if (
    minutosResolucao !== null &&
    minutosResolucao !== ticket.prazoResolucaoMinutos
  ) {
    alteracoes.prazoResolucaoMinutos = minutosResolucao;
  }
  const temAlteracoes = Object.keys(alteracoes).length > 0;

  const handleSalvar = async (evento: FormEvent) => {
    evento.preventDefault();
    if (!temAlteracoes || prazoInvalido) return;

    setSalvando(true);
    setMensagem(null);

    try {
      const atualizado = await atualizarTicket(ticket.id, alteracoes);
      onSalvo(atualizado);
      setMensagem({ tipo: 'ok', texto: 'Alterações salvas.' });
    } catch (erro) {
      setMensagem({
        tipo: 'erro',
        texto: mensagemDeErro(erro, 'Não foi possível salvar as alterações.'),
      });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSalvar} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-gray-700">
          Status
          <select
            value={status}
            onChange={(evento) =>
              setStatus(evento.target.value as TicketStatus)
            }
            className={`${CLASSE_CAMPO} mt-1 font-normal`}
          >
            {STATUS_ORDEM.map((opcao) => (
              <option key={opcao} value={opcao}>
                {STATUS_INFO[opcao].label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold text-gray-700">
          Prioridade
          <select
            value={prioridade}
            onChange={(evento) =>
              setPrioridade(evento.target.value as TicketPrioridade)
            }
            className={`${CLASSE_CAMPO} mt-1 font-normal`}
          >
            {(Object.keys(PRIORIDADE_INFO) as TicketPrioridade[]).map(
              (opcao) => (
                <option key={opcao} value={opcao}>
                  {PRIORIDADE_INFO[opcao].label}
                </option>
              ),
            )}
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-gray-700">
        Responsável
        <select
          value={responsavel}
          onChange={(evento) => setResponsavel(evento.target.value)}
          className={`${CLASSE_CAMPO} mt-1 font-normal`}
        >
          <option value="">Sem responsável</option>
          {opcoesResponsavel.map((opcao) => (
            <option key={opcao.id} value={String(opcao.id)}>
              {opcao.nome}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-gray-700">
          Prazo da 1ª resposta (horas)
          <input
            type="text"
            inputMode="decimal"
            value={prazoResposta}
            onChange={(evento) => setPrazoResposta(evento.target.value)}
            className={`${CLASSE_CAMPO} mt-1 font-normal`}
          />
        </label>

        <label className="block text-sm font-semibold text-gray-700">
          Prazo de resolução (horas)
          <input
            type="text"
            inputMode="decimal"
            value={prazoResolucao}
            onChange={(evento) => setPrazoResolucao(evento.target.value)}
            className={`${CLASSE_CAMPO} mt-1 font-normal`}
          />
        </label>
      </div>

      {prazoInvalido && (
        <p className="text-sm text-red-600">
          Informe os prazos em horas, com um número maior que zero.
        </p>
      )}

      {mensagem && (
        <p
          role="status"
          className={`text-sm ${mensagem.tipo === 'ok' ? 'text-emerald-600' : 'text-red-600'}`}
        >
          {mensagem.texto}
        </p>
      )}

      <button
        type="submit"
        disabled={!temAlteracoes || prazoInvalido || salvando}
        className="w-full rounded-lg bg-[#0073A9] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005d89] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {salvando ? 'Salvando...' : 'Salvar alterações'}
      </button>
    </form>
  );
}

interface DetalheTicketModalProps {
  ticketId: number;
  onClose: () => void;
  /** Chamado depois de qualquer alteração, para a lista se atualizar. */
  onAlterado: () => void;
}

export function DetalheTicketModal({
  ticketId,
  onClose,
  onAlterado,
}: DetalheTicketModalProps) {
  const buscar = useCallback(() => buscarTicket(ticketId), [ticketId]);
  const { dados, erro, carregando, recarregar } = useRequisicao(buscar);

  const buscarFuncionarios = useCallback(
    () => listarFuncionarios({ limit: 100 }),
    [],
  );
  const { dados: respostaFuncionarios } = useRequisicao(buscarFuncionarios);

  const [atualizado, setAtualizado] = useState<TicketDetalhe | null>(null);
  const [versaoForm, setVersaoForm] = useState(0);
  const [assumindo, setAssumindo] = useState(false);
  const [erroAssumir, setErroAssumir] = useState<string | null>(null);

  const ticket = atualizado ?? dados;

  const handleSalvo = (novo: TicketDetalhe) => {
    setAtualizado(novo);
    onAlterado();
  };

  const handleAssumir = async () => {
    setAssumindo(true);
    setErroAssumir(null);

    try {
      const novo = await assumirTicket(ticketId);
      setAtualizado(novo);
      // refaz o formulário para refletir o novo responsável
      setVersaoForm((versao) => versao + 1);
      onAlterado();
    } catch (erroRequisicao) {
      setErroAssumir(
        mensagemDeErro(erroRequisicao, 'Não foi possível assumir o chamado.'),
      );
    } finally {
      setAssumindo(false);
    }
  };

  const prazo = ticket ? calcularPrazo(ticket) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="detalhes-chamado-titulo"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-sm text-gray-500">
              Protocolo {ticket ? formatarProtocolo(ticket) : `#${ticketId}`}
            </p>
            <h2
              id="detalhes-chamado-titulo"
              className="mt-1 text-xl font-bold text-[#0073A9]"
            >
              {ticket?.categoria.nome ?? 'Chamado'}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Fechar detalhes"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {!ticket && carregando && (
          <p className="px-6 py-12 text-center text-sm text-gray-500">
            Carregando chamado...
          </p>
        )}

        {!ticket && erro && (
          <div className="space-y-3 px-6 py-12 text-center">
            <p className="text-sm text-red-600">{erro}</p>
            <button
              type="button"
              onClick={recarregar}
              className="rounded-lg bg-[#0073A9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005d89]"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {ticket && prazo && (
          <div className="space-y-6 px-6 py-6">
            <p className="text-sm leading-6 text-gray-700">
              {ticket.descricao?.trim() || 'Sem descrição informada.'}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-0.5 text-[#0073A9]" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Data de registro
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {formatarDataHora(ticket.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 size={18} className="mt-0.5 text-[#FD7E14]" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Prazo restante
                  </p>
                  <p
                    className={`mt-1 flex items-center gap-1 text-sm ${prazo.atrasado ? 'font-semibold text-red-600' : 'text-gray-600'}`}
                  >
                    {prazo.atrasado && <AlertTriangle size={14} />}
                    {prazo.texto}
                  </p>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-semibold text-gray-700">Departamento</p>
                <p className="mt-1 text-gray-600">{ticket.departamento.nome}</p>
              </div>

              <div className="text-sm">
                <p className="font-semibold text-gray-700">Aberto por</p>
                <p className="mt-1 text-gray-600">{ticket.usuario.name}</p>
              </div>
            </div>

            {ticket.idFuncionarioResponsavel === null && (
              <div className="rounded-xl bg-sky-50 px-4 py-3">
                <p className="text-sm text-sky-900">
                  Este chamado ainda não tem responsável.
                </p>
                <button
                  type="button"
                  onClick={handleAssumir}
                  disabled={assumindo}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg border border-[#0073A9] bg-white px-4 py-2 text-sm font-semibold text-[#0073A9] transition-colors hover:bg-sky-100 disabled:opacity-50"
                >
                  <UserCheck size={16} />
                  {assumindo ? 'Assumindo...' : 'Assumir chamado'}
                </button>
                {erroAssumir && (
                  <p className="mt-2 text-sm text-red-600">{erroAssumir}</p>
                )}
              </div>
            )}

            <section aria-label="Organizar chamado" className="space-y-3">
              <h3 className="text-base font-bold text-[#0073A9]">
                Organizar chamado
              </h3>
              <FormEdicao
                key={versaoForm}
                ticket={ticket}
                funcionarios={respostaFuncionarios?.data ?? null}
                onSalvo={handleSalvo}
              />
            </section>

            {ticket.respostas.length > 0 && (
              <section aria-label="Respostas do munícipe" className="space-y-2">
                <h3 className="text-base font-bold text-[#0073A9]">
                  Respostas do munícipe
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {ticket.respostas.map((resposta) => (
                    <li
                      key={resposta.id}
                      className="flex justify-between gap-4"
                    >
                      <span>{resposta.pergunta.enunciado}</span>
                      <strong>{resposta.valor ? 'Sim' : 'Não'}</strong>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {ticket.solicitacoes.length > 0 && (
              <section
                aria-label="Solicitações a outros departamentos"
                className="space-y-2"
              >
                <h3 className="text-base font-bold text-[#0073A9]">
                  Solicitações a outros departamentos
                </h3>
                <ul className="space-y-2">
                  {ticket.solicitacoes.map((solicitacao) => (
                    <li
                      key={solicitacao.id}
                      className="rounded-xl bg-gray-50 px-4 py-3 text-sm"
                    >
                      <p className="font-semibold text-gray-800">
                        {solicitacao.departamentoSolicitado.nome} ·{' '}
                        {SOLICITACAO_STATUS_LABEL[solicitacao.status]}
                      </p>
                      <p className="mt-1 text-gray-600">
                        {solicitacao.descricao}
                      </p>
                      {solicitacao.resposta && (
                        <p className="mt-1 text-gray-800">
                          Resposta: {solicitacao.resposta}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-label="Histórico" className="space-y-2">
              <h3 className="text-base font-bold text-[#0073A9]">Histórico</h3>
              {ticket.historicos.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Sem eventos registrados.
                </p>
              ) : (
                <ul className="space-y-2">
                  {ticket.historicos.map((evento) => (
                    <li
                      key={evento.id}
                      className="border-l-2 border-[#0073A9]/30 pl-3 text-sm"
                    >
                      <p className="font-medium text-gray-800">
                        {descreverEvento(evento)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {evento.usuario?.name ?? 'Sistema'} ·{' '}
                        {formatarDataHora(evento.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {ticket.arquivos.length > 0 && (
              <p className="text-sm text-gray-500">
                {ticket.arquivos.length} arquivo(s) anexado(s) pelo munícipe.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default DetalheTicketModal;
