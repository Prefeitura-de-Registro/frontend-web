import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRequisicao } from '../../hooks/useRequisicao';
import { consultarMapa } from '../../services/mapas.service';
import {
  consultarDesempenhoDepartamentos,
  consultarIndicadores,
} from '../../services/relatorios.service';
import { listarTickets } from '../../services/tickets.service';
import type { MapaTickets } from '../../types/gestao';
import type { TicketResumo, TicketStatus } from '../../types/ticket';
import { periodoUltimosDias } from '../../utils/datas';
import {
  COR_STATUS_MAPA,
  STATUS_INFO,
  calcularPrazo,
  formatarDuracao,
  formatarProtocolo,
} from '../../utils/ticket';

const DIAS_PERIODO = 30;
// O mapa mostra o último ano (máximo aceito pelo back: 366 dias)
const DIAS_PERIODO_MAPA = 365;
const LIMITE_RESUMO = 100;
const POSICAO_INICIAL: [number, number] = [-24.4883, -47.8436];
const CORES_DEPARTAMENTOS = [
  'bg-purple-600',
  'bg-emerald-600',
  'bg-orange-500',
  'bg-sky-400',
  'bg-slate-400',
];

// Status que ainda estão "em aberto" para o gestor (nem resolvidos, nem fechados)
const STATUS_EM_ABERTO: TicketStatus[] = [
  'aberto',
  'em_analise',
  'em_andamento',
  'pendente',
];
const STATUS_CONCLUIDOS: TicketStatus[] = ['resolvido', 'fechado'];

type FiltroMapa = 'todos' | 'abertos' | 'andamento' | 'atraso';

const STATUS_DO_FILTRO: Record<FiltroMapa, TicketStatus[] | undefined> = {
  todos: undefined,
  abertos: ['aberto'],
  andamento: ['em_analise', 'em_andamento', 'pendente'],
  atraso: STATUS_EM_ABERTO,
};

interface ResumoChamados {
  abertos: number;
  andamento: number;
  concluidos: number;
  atrasados: number;
  idsAtrasados: number[];
  // true quando algum status tinha mais de LIMITE_RESUMO tickets
  aproximado: boolean;
  urgentes: TicketResumo[];
}

// "Em atraso" não existe como status no back: é calculado pelo prazo de
// resolução. Os quatro grupos abaixo não se sobrepõem (atrasado sai de aberto/andamento).
async function carregarResumo(): Promise<ResumoChamados> {
  const [emAberto, concluidos] = await Promise.all([
    Promise.all(
      STATUS_EM_ABERTO.map((status) =>
        listarTickets({ status, limit: LIMITE_RESUMO }),
      ),
    ),
    Promise.all(
      STATUS_CONCLUIDOS.map((status) => listarTickets({ status, limit: 1 })),
    ),
  ]);

  let abertos = 0;
  let andamento = 0;
  const idsAtrasados: number[] = [];

  emAberto.forEach((resposta, indice) => {
    const atrasadosDoStatus = resposta.data.filter(
      (ticket) => calcularPrazo(ticket).atrasado,
    );
    const noPrazo = resposta.pagination.total - atrasadosDoStatus.length;

    idsAtrasados.push(...atrasadosDoStatus.map((ticket) => ticket.id));
    if (STATUS_EM_ABERTO[indice] === 'aberto') {
      abertos += noPrazo;
    } else {
      andamento += noPrazo;
    }
  });

  const urgentes = emAberto
    .flatMap((resposta) => resposta.data)
    .filter((ticket) => ticket.prioridade === 'urgente')
    .sort(
      (a, b) =>
        (calcularPrazo(a).minutosRestantes ?? 0) -
        (calcularPrazo(b).minutosRestantes ?? 0),
    )
    .slice(0, 6);

  return {
    abertos,
    andamento,
    atrasados: idsAtrasados.length,
    idsAtrasados,
    concluidos: concluidos.reduce(
      (soma, resposta) => soma + resposta.pagination.total,
      0,
    ),
    aproximado: emAberto.some(
      (resposta) => resposta.pagination.total > resposta.data.length,
    ),
    urgentes,
  };
}

function AjustarVista({ mapa }: { mapa: MapaTickets }) {
  const map = useMap();

  useEffect(() => {
    if (mapa.limites) {
      const { sul, norte, oeste, leste } = mapa.limites;
      map.fitBounds(
        [
          [sul, oeste],
          [norte, leste],
        ],
        { padding: [32, 32], maxZoom: 16 },
      );
    } else {
      map.setView([mapa.centro.lat, mapa.centro.lng], 14);
    }
  }, [map, mapa]);

  return null;
}

const OPCOES_FILTRO_MAPA: {
  valor: FiltroMapa;
  rotulo: string;
  ponto: string;
  classe: string;
}[] = [
  { valor: 'todos', rotulo: 'Todos', ponto: '', classe: '' },
  {
    valor: 'abertos',
    rotulo: 'Abertos',
    ponto: 'bg-red-500',
    classe: 'text-red-600 hover:bg-red-50',
  },
  {
    valor: 'andamento',
    rotulo: 'Em andamento',
    ponto: 'bg-sky-500',
    classe: 'text-sky-600 hover:bg-sky-50',
  },
  {
    valor: 'atraso',
    rotulo: 'Em atraso',
    ponto: 'bg-amber-400',
    classe: 'text-amber-600 hover:bg-amber-50',
  },
];

export function ServidorDashboard() {
  const [filtroMapa, setFiltroMapa] = useState<FiltroMapa>('todos');

  const buscarResumo = useCallback(() => carregarResumo(), []);
  const buscarIndicadores = useCallback(
    () => consultarIndicadores(periodoUltimosDias(DIAS_PERIODO)),
    [],
  );
  const buscarDepartamentos = useCallback(
    () => consultarDesempenhoDepartamentos(periodoUltimosDias(DIAS_PERIODO)),
    [],
  );
  const buscarMapa = useCallback(
    () =>
      consultarMapa({
        ...periodoUltimosDias(DIAS_PERIODO_MAPA),
        status: STATUS_DO_FILTRO[filtroMapa],
      }),
    [filtroMapa],
  );

  const resumo = useRequisicao(buscarResumo);
  const indicadores = useRequisicao(buscarIndicadores);
  const departamentos = useRequisicao(buscarDepartamentos);
  const mapa = useRequisicao(buscarMapa);

  const erro = resumo.erro ?? indicadores.erro ?? departamentos.erro;
  const dadosResumo = resumo.dados;

  const totalGeral = dadosResumo
    ? dadosResumo.abertos +
      dadosResumo.andamento +
      dadosResumo.concluidos +
      dadosResumo.atrasados
    : 0;

  // fatias do donut: porcentagem acumulada de cada grupo
  const fatias = dadosResumo
    ? [
        { cor: '#ef4444', valor: dadosResumo.abertos },
        { cor: '#0284c7', valor: dadosResumo.andamento },
        { cor: '#10b981', valor: dadosResumo.concluidos },
        { cor: '#eab308', valor: dadosResumo.atrasados },
      ]
    : [];
  const gradiente =
    totalGeral > 0
      ? fatias
          .reduce<{ partes: string[]; acumulado: number }>(
            (estado, fatia) => {
              const fim = estado.acumulado + (fatia.valor / totalGeral) * 100;
              return {
                partes: [
                  ...estado.partes,
                  `${fatia.cor} ${estado.acumulado}% ${fim}%`,
                ],
                acumulado: fim,
              };
            },
            { partes: [], acumulado: 0 },
          )
          .partes.join(', ')
      : '#e2e8f0 0% 100%';

  const listaDepartamentos = (departamentos.dados ?? []).slice(0, 5);
  const maiorDepartamento = Math.max(
    1,
    ...listaDepartamentos.map((item) => item.ticketsTotais),
  );

  const tempoMedio = indicadores.dados?.temposTicket.resolucaoMinutos;
  const mostrar = (valor: number | undefined) =>
    valor === undefined ? '–' : `${valor}${dadosResumo?.aproximado ? '+' : ''}`;

  // "Em atraso" no mapa: só marcadores que estão na lista de atrasados do resumo
  const idsAtrasados = new Set(dadosResumo?.idsAtrasados ?? []);
  const marcadores = (mapa.dados?.tickets ?? []).filter(
    (ticket) => filtroMapa !== 'atraso' || idsAtrasados.has(ticket.id),
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {erro && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-2xl bg-red-50 px-5 py-3 text-sm text-red-700"
        >
          <span>{erro}</span>
          <button
            type="button"
            onClick={() => {
              resumo.recarregar();
              indicadores.recarregar();
              departamentos.recarregar();
            }}
            className="rounded-lg bg-[#0073a9] px-3 py-1.5 font-semibold text-white hover:bg-[#005a86]"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* 2. Grid de Cards e Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Estatísticas e Departamentos */}
        <div className="lg:col-span-7 space-y-6">
          <section>
            <h2 className="text-xl font-extrabold text-[#0073a9] mb-3">
              Chamados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-red-500 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Abertos
                </span>
                <p className="text-3xl font-black text-slate-800 mt-1">
                  {mostrar(dadosResumo?.abertos)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-sky-500 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Andamento
                </span>
                <p className="text-3xl font-black text-slate-800 mt-1">
                  {mostrar(dadosResumo?.andamento)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-emerald-500 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Concluídos
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-black text-emerald-500">
                    {dadosResumo?.concluidos ?? '–'}
                  </span>
                  {tempoMedio != null && (
                    <span className="text-[10px] text-slate-400 font-semibold">
                      média {formatarDuracao(tempoMedio)}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-amber-400 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Em atraso
                </span>
                <p className="text-3xl font-black text-amber-500 mt-1">
                  {mostrar(dadosResumo?.atrasados)}
                </p>
              </div>
            </div>
          </section>

          {/* Chamados por departamento (últimos 30 dias) */}
          <div className="bg-white p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#0073a9] uppercase tracking-wide">
              Chamados por departamento · últimos {DIAS_PERIODO} dias
            </h3>
            {listaDepartamentos.length === 0 ? (
              <p className="py-12 text-center text-sm text-slate-400">
                {departamentos.carregando
                  ? 'Carregando...'
                  : 'Nenhum chamado no período.'}
              </p>
            ) : (
              <div className="h-44 flex items-end justify-between gap-4 pt-6 px-4 border-b border-dashed border-slate-200">
                {listaDepartamentos.map((item, indice) => (
                  <div
                    key={item.idDepartamento}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <span className="text-xs font-black text-slate-700">
                      {item.ticketsTotais}
                    </span>
                    <div
                      className={`w-full rounded-t-md ${CORES_DEPARTAMENTOS[indice % CORES_DEPARTAMENTOS.length]}`}
                      style={{
                        height: `${Math.max(4, (item.ticketsTotais / maiorDepartamento) * 96)}px`,
                      }}
                    />
                    <span className="text-xs font-bold text-slate-600 text-center leading-tight">
                      {item.departamento}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coluna Direita: Prioridades e Status Donut */}
        <div className="lg:col-span-5 space-y-6">
          <section>
            <h2 className="text-xl font-extrabold text-[#0073a9] mb-3">
              Prioridades
            </h2>
            {dadosResumo && dadosResumo.urgentes.length === 0 ? (
              <p className="rounded-2xl bg-white p-4 text-sm text-slate-400 shadow-xs">
                Nenhum chamado urgente em aberto.
              </p>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {(dadosResumo?.urgentes ?? []).map((ticket) => {
                  const prazo = calcularPrazo(ticket);
                  const status = STATUS_INFO[ticket.status];

                  return (
                    <Link
                      key={ticket.id}
                      to="/servidor/chamados"
                      className="min-w-[180px] bg-white p-3.5 rounded-2xl shadow-xs border border-slate-100 space-y-2 transition-shadow hover:shadow-md"
                    >
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>{ticket.categoria.nome}</span>
                        <span
                          className={`flex items-center gap-1 ${prazo.atrasado ? 'text-red-500' : 'text-amber-500'}`}
                        >
                          <Clock size={12} /> {prazo.texto}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {formatarProtocolo(ticket)}
                      </p>
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full ${status.badge}`}
                      >
                        {status.label.toLowerCase()}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>

          {/* Donut Status */}
          <div className="bg-white p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#0073a9] uppercase tracking-wide">
              Status dos chamados
            </h3>
            <div className="flex items-center justify-between gap-4">
              <div
                className="relative w-36 h-36 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `conic-gradient(${gradiente})` }}
              >
                <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-800">
                    {dadosResumo ? totalGeral : '–'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    total
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>Abertos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Em Andamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Concluídos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Em Atraso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mapa de Ocorrências Ocupando Toda a Largura Inferior (último ano) */}
      <section className="relative isolate w-full h-[450px] rounded-2xl overflow-hidden shadow-xs border border-slate-200">
        {/* Controles do Filtro Flutuando Sobre o Mapa (Overlay) */}
        <div className="absolute top-4 right-4 sm:right-6 z-[1000] flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md">
          {OPCOES_FILTRO_MAPA.map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => setFiltroMapa(opcao.valor)}
              aria-pressed={filtroMapa === opcao.valor}
              className={
                filtroMapa === opcao.valor
                  ? 'px-4 py-1.5 bg-[#0073a9] text-white text-xs font-extrabold rounded-full transition-all shadow-xs flex items-center gap-1.5'
                  : `px-3.5 py-1.5 bg-white border border-slate-200 ${opcao.classe} text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs`
              }
            >
              {opcao.ponto && (
                <span className={`w-2.5 h-2.5 rounded-full ${opcao.ponto}`} />
              )}
              {opcao.rotulo}
            </button>
          ))}
        </div>

        {mapa.dados && marcadores.length === 0 && !mapa.erro && (
          <p className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-md">
            Nenhum chamado com localização neste filtro (último ano).
          </p>
        )}

        {mapa.dados?.truncado && (
          <p className="absolute bottom-4 right-4 z-[1000] rounded-lg bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-md">
            Mostrando os {mapa.dados.tickets.length} chamados mais recentes.
          </p>
        )}

        {mapa.erro && (
          <p className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-white/90 px-3 py-2 text-xs text-red-600 shadow-md">
            {mapa.erro}
          </p>
        )}

        <MapContainer
          center={POSICAO_INICIAL}
          zoom={14}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapa.dados && <AjustarVista mapa={mapa.dados} />}
          {marcadores.map((ticket) => (
            <CircleMarker
              key={ticket.id}
              center={[ticket.lat, ticket.lng]}
              radius={9}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: COR_STATUS_MAPA[ticket.status],
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <strong>{ticket.categoria}</strong>
                <br />
                {formatarProtocolo({ id: ticket.id, protocolo: null })} ·{' '}
                {STATUS_INFO[ticket.status].label}
                {ticket.descricao ? (
                  <>
                    <br />
                    {ticket.descricao}
                  </>
                ) : null}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </section>
    </div>
  );
}

export default ServidorDashboard;
