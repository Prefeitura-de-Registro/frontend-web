import { useCallback, useState } from 'react';
import { AlertTriangle, Clock3, Search, X } from 'lucide-react';
import { DetalheTicketModal } from '../../components/ui/DetalheTicketModal';
import { useDebounce } from '../../hooks/useDebounce';
import { useRequisicao } from '../../hooks/useRequisicao';
import { listarTickets } from '../../services/tickets.service';
import {
  PRIORIDADE_INFO,
  STATUS_INFO,
  calcularPrazo,
  formatarProtocolo,
} from '../../utils/ticket';

const ITENS_POR_PAGINA = 10;

const GRADE_LISTA =
  'grid grid-cols-[minmax(0,1fr)_125px_145px_85px] items-center gap-5 sm:grid-cols-[minmax(0,1fr)_135px_155px_90px] sm:gap-8';

function GestaoChamados() {
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [selecionadoId, setSelecionadoId] = useState<number | null>(null);

  const buscaAtrasada = useDebounce(busca, 400);

  const buscar = useCallback(
    () =>
      listarTickets({
        page: pagina,
        limit: ITENS_POR_PAGINA,
        busca: buscaAtrasada.trim() || undefined,
      }),
    [pagina, buscaAtrasada],
  );

  const { dados, erro, carregando, recarregar } = useRequisicao(buscar);

  const tickets = dados?.data ?? [];
  const totalPaginas = dados?.pagination.totalPages ?? 0;
  const total = dados?.pagination.total ?? 0;

  const handleBusca = (valor: string) => {
    setBusca(valor);
    setPagina(1);
  };

  return (
    <div className="min-h-full bg-white">
      <div className="min-w-0 flex-1">
        <main className="space-y-6 px-5 py-8 sm:px-7 lg:px-7">
          <div>
            <h1 className="text-2xl font-bold text-[#0073A9]">
              Todos os chamados
            </h1>
          </div>

          <div className="flex h-12 items-center gap-3 rounded-2xl bg-[#F8F9FA] px-4 shadow-[0_2px_5px_rgba(0,0,0,0.12)] focus-within:ring-1 focus-within:ring-[#0073A9]">
            <input
              type="search"
              value={busca}
              onChange={(event) => handleBusca(event.target.value)}
              placeholder="Pesquisar por protocolo ou descrição"
              aria-label="Buscar por protocolo ou descrição"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {busca ? (
              <button
                type="button"
                aria-label="Limpar pesquisa"
                onClick={() => handleBusca('')}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            ) : (
              <Search size={19} className="shrink-0 text-[#0073A9]" />
            )}
          </div>

          <section aria-label="Lista de chamados" className="space-y-3">
            <div
              className={`${GRADE_LISTA} rounded-xl bg-[#F1F1F1] px-5 py-4 text-sm font-semibold text-[#0073A9] sm:px-7`}
            >
              <span className="flex items-center gap-1">Ocorrência</span>
              <span className="text-center">Status</span>
              <span className="text-center">Prioridade</span>
              <span className="text-center">Prazo</span>
            </div>

            {erro && (
              <div className="space-y-3 rounded-xl bg-red-50 px-5 py-8 text-center">
                <p className="text-sm text-red-700">{erro}</p>
                <button
                  type="button"
                  onClick={recarregar}
                  className="rounded-lg bg-[#0073A9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005d89]"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!erro && !dados && carregando && (
              <div className="rounded-xl bg-gray-50 px-5 py-12 text-center text-sm text-gray-500">
                Carregando chamados...
              </div>
            )}

            {tickets.map((ticket) => {
              const status = STATUS_INFO[ticket.status];
              const prioridade = PRIORIDADE_INFO[ticket.prioridade];
              const prazo = calcularPrazo(ticket);

              return (
                <button
                  type="button"
                  key={ticket.id}
                  onClick={() => setSelecionadoId(ticket.id)}
                  className={`${GRADE_LISTA} w-full rounded-xl border-l-[3px] ${status.border} bg-white px-4 py-4 text-left shadow-[0_2px_4px_rgba(0,0,0,0.16)] transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0073A9] sm:px-7 ${carregando ? 'opacity-60' : ''}`}
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#0073A9]">
                      {ticket.categoria.nome}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {formatarProtocolo(ticket)} · {ticket.departamento.nome}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-700">
                      {ticket.descricao?.trim() || 'Sem descrição'}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-semibold ${status.badge}`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${prioridade.badge}`}
                    >
                      {ticket.prioridade === 'urgente' && (
                        <AlertTriangle size={14} />
                      )}
                      {prioridade.label}
                    </span>
                  </div>

                  <div
                    className={`flex items-center justify-center gap-1.5 text-base font-medium ${prazo.atrasado ? 'text-red-600' : 'text-gray-700'}`}
                  >
                    <Clock3
                      size={16}
                      className="hidden text-[#FD7E14] sm:block"
                    />
                    {prazo.texto}
                  </div>
                </button>
              );
            })}

            {!erro && dados && tickets.length === 0 && (
              <div className="rounded-xl bg-gray-50 px-5 py-12 text-center text-sm text-gray-500">
                Nenhum chamado encontrado para essa pesquisa.
              </div>
            )}
          </section>

          {totalPaginas > 1 && (
            <nav
              aria-label="Paginação"
              className="flex items-center justify-between gap-4 text-sm text-gray-600"
            >
              <span>
                Página {pagina} de {totalPaginas} · {total} chamados
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPagina((atual) => Math.max(1, atual - 1))}
                  disabled={pagina <= 1}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-[#0073A9] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPagina((atual) => Math.min(totalPaginas, atual + 1))
                  }
                  disabled={pagina >= totalPaginas}
                  className="rounded-lg border border-slate-200 px-4 py-2 font-semibold text-[#0073A9] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Próxima
                </button>
              </div>
            </nav>
          )}
        </main>
      </div>

      {selecionadoId !== null && (
        <DetalheTicketModal
          key={selecionadoId}
          ticketId={selecionadoId}
          onClose={() => setSelecionadoId(null)}
          onAlterado={recarregar}
        />
      )}
    </div>
  );
}

export default GestaoChamados;
