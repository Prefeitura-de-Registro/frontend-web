import { useCallback, useState } from 'react';
import { Download, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { useRequisicao } from '../../hooks/useRequisicao';
import {
  consultarDesempenhoDepartamentos,
  consultarIndicadores,
  consultarTicketsPorCategoria,
  consultarVolumeSemanal,
} from '../../services/relatorios.service';
import type {
  DesempenhoDepartamento,
  Indicadores,
  StatusGeral,
  TicketsPorCategoria,
  VolumeSemana,
} from '../../types/gestao';
import {
  periodoAnterior,
  periodoDesdeInicioDoAno,
  periodoUltimosDias,
  type Periodo,
} from '../../utils/datas';
import { formatarHorasMinutos } from '../../utils/ticket';

type ChavePeriodo = 'semanal' | 'mensal' | 'anual';

const ANO_ATUAL = new Date().getFullYear();

const OPCOES_PERIODO: { valor: ChavePeriodo; rotulo: string }[] = [
  { valor: 'semanal', rotulo: 'Últimas 7 Semanas' },
  { valor: 'mensal', rotulo: 'Últimos 30 Dias' },
  { valor: 'anual', rotulo: `Ano de ${ANO_ATUAL}` },
];

function periodoDe(chave: ChavePeriodo): Periodo {
  if (chave === 'semanal') return periodoUltimosDias(49);
  if (chave === 'mensal') return periodoUltimosDias(30);
  return periodoDesdeInicioDoAno();
}

interface DadosRelatorio {
  atual: Indicadores;
  anterior: Indicadores;
  volume: VolumeSemana[];
  categorias: TicketsPorCategoria['categorias'];
  departamentos: DesempenhoDepartamento[];
}

async function carregarRelatorio(chave: ChavePeriodo): Promise<DadosRelatorio> {
  const periodo = periodoDe(chave);

  const [atual, anterior, volume, categorias, departamentos] =
    await Promise.all([
      consultarIndicadores(periodo),
      consultarIndicadores(periodoAnterior(periodo)),
      consultarVolumeSemanal(periodo),
      consultarTicketsPorCategoria(periodo),
      consultarDesempenhoDepartamentos(periodo),
    ]);

  return {
    atual,
    anterior,
    volume,
    categorias: categorias.categorias,
    departamentos,
  };
}

// ---------- Variações em relação ao período anterior ----------

interface Variacao {
  texto: string;
  tom: 'bom' | 'ruim' | 'neutro';
  icone: 'sobe' | 'desce';
}

const CLASSE_TOM: Record<Variacao['tom'], string> = {
  bom: 'text-success',
  ruim: 'text-danger',
  neutro: 'text-black/60',
};

function variacaoQuantidade(atual: number, anterior: number): Variacao {
  if (anterior === 0) {
    return {
      texto: 'Sem dados no período anterior',
      tom: 'neutro',
      icone: 'sobe',
    };
  }
  const percentual = ((atual - anterior) / anterior) * 100;
  return {
    texto: `${percentual >= 0 ? '+' : '-'}${Math.abs(percentual).toFixed(0)}% em relação ao período anterior`,
    tom: 'neutro',
    icone: percentual >= 0 ? 'sobe' : 'desce',
  };
}

function taxaResolucao(indicadores: Indicadores): number | null {
  if (indicadores.ticketsTotais === 0) return null;
  return (indicadores.ticketsResolvidos / indicadores.ticketsTotais) * 100;
}

function variacaoTaxa(atual: number | null, anterior: number | null): Variacao {
  if (atual === null || anterior === null) {
    return {
      texto: 'Sem dados no período anterior',
      tom: 'neutro',
      icone: 'sobe',
    };
  }
  const diferenca = atual - anterior;
  return {
    texto: `${diferenca >= 0 ? '+' : '-'}${Math.abs(diferenca).toFixed(1)} p.p. em relação ao período anterior`,
    tom: diferenca >= 0 ? 'bom' : 'ruim',
    icone: diferenca >= 0 ? 'sobe' : 'desce',
  };
}

// Para tempos, menor é melhor
function variacaoTempo(
  atual: number | null,
  anterior: number | null,
  rotuloMelhor: string,
  rotuloPior: string,
): Variacao {
  if (atual === null || anterior === null) {
    return {
      texto: 'Sem dados no período anterior',
      tom: 'neutro',
      icone: 'desce',
    };
  }
  const diferenca = atual - anterior;
  return {
    texto: `${diferenca <= 0 ? '-' : '+'}${formatarHorasMinutos(Math.abs(diferenca))} ${diferenca <= 0 ? rotuloMelhor : rotuloPior}`,
    tom: diferenca <= 0 ? 'bom' : 'ruim',
    icone: diferenca <= 0 ? 'desce' : 'sobe',
  };
}

function LinhaVariacao({ variacao }: { variacao: Variacao }) {
  const Icone = variacao.icone === 'sobe' ? TrendingUp : TrendingDown;

  return (
    <div
      className={`flex items-center gap-1 text-[11px] font-medium mt-1 ${CLASSE_TOM[variacao.tom]}`}
    >
      <Icone size={12} />
      <span>{variacao.texto}</span>
    </div>
  );
}

// ---------- Gráfico de linhas (volume semanal) ----------

const GRAFICO_X_INICIO = 10;
const GRAFICO_X_FIM = 490;
const GRAFICO_Y_BASE = 120;
const GRAFICO_ALTURA = 110;

function caminhoDaSerie(valores: number[], maximo: number): string {
  return valores
    .map((valor, indice) => {
      const x =
        valores.length === 1
          ? (GRAFICO_X_INICIO + GRAFICO_X_FIM) / 2
          : GRAFICO_X_INICIO +
            (indice * (GRAFICO_X_FIM - GRAFICO_X_INICIO)) /
              (valores.length - 1);
      const y = GRAFICO_Y_BASE - (valor / maximo) * GRAFICO_ALTURA;
      const comando = indice === 0 ? 'M' : 'L';
      return `${comando} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ')
    .concat(valores.length === 1 ? ' l 0.01 0' : '');
}

function rotulosDasSemanas(volume: VolumeSemana[]): string[] {
  const passo = Math.max(1, Math.ceil(volume.length / 8));

  return volume
    .filter((_, indice) => indice % passo === 0 || indice === volume.length - 1)
    .map(
      (semana) =>
        `${semana.semanaInicio.slice(8, 10)}/${semana.semanaInicio.slice(5, 7)}`,
    );
}

// ---------- Rosca (ocorrências por categoria) ----------

const CORES_CATEGORIAS = [
  { fundo: 'bg-primary', texto: 'text-primary' },
  { fundo: 'bg-success', texto: 'text-success' },
  { fundo: 'bg-timer', texto: 'text-timer' },
  { fundo: 'bg-info', texto: 'text-info' },
  { fundo: 'bg-warning', texto: 'text-warning' },
];

const TRACADO_ROSCA =
  'M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831';

interface FatiaCategoria {
  nome: string;
  quantidade: number;
  percentual: number;
  deslocamento: number;
}

// As 4 maiores categorias + "Outras"
function montarFatias(
  categorias: TicketsPorCategoria['categorias'],
): FatiaCategoria[] {
  const total = categorias.reduce((soma, item) => soma + item.quantidade, 0);
  if (total === 0) return [];

  const ordenadas = [...categorias].sort((a, b) => b.quantidade - a.quantidade);
  const principais = ordenadas
    .slice(0, CORES_CATEGORIAS.length - 1)
    .map((item) => ({ nome: item.nome, quantidade: item.quantidade }));
  const restante = ordenadas
    .slice(CORES_CATEGORIAS.length - 1)
    .reduce((soma, item) => soma + item.quantidade, 0);

  const itens =
    restante > 0
      ? [...principais, { nome: 'Outras', quantidade: restante }]
      : principais;

  let acumulado = 0;
  return itens.map((item) => {
    const percentual = (item.quantidade / total) * 100;
    const fatia = { ...item, percentual, deslocamento: acumulado };
    acumulado += percentual;
    return fatia;
  });
}

// ---------- Tabela de desempenho ----------

const CLASSE_STATUS_GERAL: Record<StatusGeral, string> = {
  Excelente: 'bg-success/15 text-success',
  Bom: 'bg-info/15 text-info',
  Regular: 'bg-timer/15 text-timer',
  Crítico: 'bg-danger/15 text-danger',
  'Sem dados': 'bg-gray-100 text-gray-500',
};

export function Relatorios() {
  const [periodo, setPeriodo] = useState<ChavePeriodo>('mensal');

  const buscar = useCallback(() => carregarRelatorio(periodo), [periodo]);
  const { dados, erro, carregando, recarregar } = useRequisicao(buscar);

  const handleExportarPDF = () => {
    window.print();
  };

  const taxaAtual = dados ? taxaResolucao(dados.atual) : null;
  const taxaAnterior = dados ? taxaResolucao(dados.anterior) : null;

  const volume = dados?.volume ?? [];
  const maximoVolume = Math.max(
    1,
    ...volume.flatMap((semana) => [semana.abertos, semana.concluidos]),
  );

  const fatias = montarFatias(dados?.categorias ?? []);
  const totalCategorias = fatias.reduce(
    (soma, item) => soma + item.quantidade,
    0,
  );

  return (
    <div className="min-h-full bg-secondary text-black font-sans print:bg-white">
      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* PAINEL DE RELATÓRIOS */}
        <main
          className={`p-8 space-y-6 overflow-y-auto ${carregando && dados ? 'opacity-60' : ''}`}
        >
          {/* TÍTULO E FILTROS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Relatórios Operacionais
              </h1>
              <p className="text-xs text-black/60">
                Acompanhamento de desempenho municipal e chamados
              </p>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <div className="relative">
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value as ChavePeriodo)}
                  aria-label="Período do relatório"
                  className="bg-white border border-tertiary text-xs text-black font-medium py-2 pl-3 pr-8 rounded-lg appearance-none outline-none cursor-pointer shadow-sm hover:border-primary transition-colors"
                >
                  {OPCOES_PERIODO.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.rotulo}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                />
              </div>

              <button
                type="button"
                onClick={handleExportarPDF}
                className="bg-primary hover:opacity-95 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
              >
                <Download size={14} />
                Exportar PDF
              </button>
            </div>
          </div>

          {erro && (
            <div
              role="alert"
              className="flex items-center justify-between gap-4 rounded-xl bg-danger/10 px-5 py-3 text-sm text-danger"
            >
              <span>{erro}</span>
              <button
                type="button"
                onClick={recarregar}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!dados && !erro && (
            <p className="py-16 text-center text-sm text-black/50">
              Carregando relatórios...
            </p>
          )}

          {dados && (
            <>
              {/* MÉTRICAS PRINCIPAIS (TOP CARDS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Card 1: Total de Ocorrências */}
                <div className="bg-white p-5 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-black/60">
                      Total de Ocorrências
                    </span>
                    <span className="w-3 h-3 rounded-full bg-info/30" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-black">
                      {dados.atual.ticketsTotais.toLocaleString('pt-BR')}
                    </span>
                    <LinhaVariacao
                      variacao={variacaoQuantidade(
                        dados.atual.ticketsTotais,
                        dados.anterior.ticketsTotais,
                      )}
                    />
                  </div>
                </div>

                {/* Card 2: Taxa de Resolução */}
                <div className="bg-white p-5 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-black/60">
                      Taxa de Resolução
                    </span>
                    <span className="w-3 h-3 rounded-full bg-success/30" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-success">
                      {taxaAtual === null ? '—' : `${taxaAtual.toFixed(1)}%`}
                    </span>
                    <LinhaVariacao
                      variacao={variacaoTaxa(taxaAtual, taxaAnterior)}
                    />
                  </div>
                </div>

                {/* Card 3: Tempo Médio (SLA) */}
                <div className="bg-white p-5 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-black/60">
                      Tempo Médio (SLA)
                    </span>
                    <span className="w-3 h-3 rounded-full bg-timer/30" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-timer">
                      {formatarHorasMinutos(
                        dados.atual.temposTicket.resolucaoMinutos,
                      )}
                    </span>
                    <LinhaVariacao
                      variacao={variacaoTempo(
                        dados.atual.temposTicket.resolucaoMinutos,
                        dados.anterior.temposTicket.resolucaoMinutos,
                        'tempo de solução mais rápido',
                        'tempo de solução mais lento',
                      )}
                    />
                  </div>
                </div>

                {/* Card 4: Tempo da primeira resposta */}
                <div className="bg-white p-5 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-black/60">
                      Tempo da 1ª Resposta
                    </span>
                    <span className="w-3 h-3 rounded-full bg-warning/50" />
                  </div>
                  <div className="mt-3">
                    <span className="text-2xl font-bold text-black">
                      {formatarHorasMinutos(
                        dados.atual.temposTicket.primeiraRespostaMinutos,
                      )}
                    </span>
                    <LinhaVariacao
                      variacao={variacaoTempo(
                        dados.atual.temposTicket.primeiraRespostaMinutos,
                        dados.anterior.temposTicket.primeiraRespostaMinutos,
                        'resposta mais rápida',
                        'resposta mais lenta',
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* GRÁFICOS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Linha: Volume de Chamados */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-tertiary shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-primary">
                      Volume de Chamados (Semanas)
                    </h3>
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-info" />
                        <span className="text-black/60">Abertos</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-success" />
                        <span className="text-black/60">Concluídos</span>
                      </div>
                    </div>
                  </div>

                  {volume.length === 0 ? (
                    <p className="h-48 flex items-center justify-center text-sm text-black/50">
                      Sem chamados no período.
                    </p>
                  ) : (
                    <div className="h-48 w-full relative">
                      <svg
                        className="w-full h-full overflow-visible"
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                      >
                        {/* Linhas de Grade */}
                        {[30, 75, 120].map((y) => (
                          <line
                            key={y}
                            x1="0"
                            y1={y}
                            x2="500"
                            y2={y}
                            stroke="var(--color-tertiary)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        ))}

                        {/* Linha Abertos */}
                        <path
                          d={caminhoDaSerie(
                            volume.map((semana) => semana.abertos),
                            maximoVolume,
                          )}
                          fill="none"
                          stroke="var(--color-info)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Linha Concluídos */}
                        <path
                          d={caminhoDaSerie(
                            volume.map((semana) => semana.concluidos),
                            maximoVolume,
                          )}
                          fill="none"
                          stroke="var(--color-success)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="flex justify-between text-[11px] text-black/50 mt-2">
                        {rotulosDasSemanas(volume).map((rotulo) => (
                          <span key={rotulo}>{rotulo}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Gráfico Rosca: Ocorrências por Categoria */}
                <div className="bg-white p-6 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-primary mb-4">
                    Ocorrências por Categoria
                  </h3>

                  <div className="flex items-center justify-center relative my-2">
                    <svg
                      className="w-36 h-36 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        className="text-secondary"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d={TRACADO_ROSCA}
                      />
                      {fatias.map((fatia, indice) => (
                        <path
                          key={fatia.nome}
                          className={CORES_CATEGORIAS[indice].texto}
                          strokeDasharray={`${fatia.percentual.toFixed(1)}, 100`}
                          strokeDashoffset={-fatia.deslocamento}
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="none"
                          d={TRACADO_ROSCA}
                        />
                      ))}
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] text-black/50 uppercase font-semibold">
                        Total
                      </span>
                      <span className="text-base font-bold text-black leading-tight">
                        {totalCategorias.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-2 text-xs">
                    {fatias.length === 0 && (
                      <p className="text-center text-black/50">
                        Sem chamados no período.
                      </p>
                    )}
                    {fatias.map((fatia, indice) => (
                      <div
                        key={fatia.nome}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`w-2.5 h-2.5 shrink-0 rounded-full ${CORES_CATEGORIAS[indice].fundo}`}
                          />
                          <span className="font-semibold text-black truncate">
                            {fatia.nome}
                          </span>
                        </div>
                        <span className="text-black/60 text-[11px] shrink-0">
                          {fatia.quantidade} chamados (
                          {fatia.percentual.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TABELA DE DESEMPENHO POR DEPARTAMENTO */}
              <div className="bg-white rounded-xl border border-tertiary shadow-sm overflow-hidden">
                <div className="p-6 border-b border-tertiary">
                  <h3 className="text-sm font-bold text-primary">
                    Desempenho por Departamento
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary text-black/70 font-semibold border-b border-tertiary">
                      <tr>
                        <th className="py-3 px-6">Secretaria / Departamento</th>
                        <th className="py-3 px-6 text-center">
                          Chamados Totais
                        </th>
                        <th className="py-3 px-6 text-center">Concluídos</th>
                        <th className="py-3 px-6 text-center">
                          Tempo Médio Solução
                        </th>
                        <th className="py-3 px-6 text-center">Status Geral</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tertiary text-black">
                      {dados.departamentos.map((departamento) => (
                        <tr
                          key={departamento.idDepartamento}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold">
                            {departamento.departamento}
                            <span className="block text-[11px] font-normal text-black/50">
                              {departamento.secretaria}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-center">
                            {departamento.ticketsTotais}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {departamento.ticketsResolvidos}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {formatarHorasMinutos(
                              departamento.tempoMedioResolucaoMinutos,
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`${CLASSE_STATUS_GERAL[departamento.statusGeral]} px-3 py-1 rounded-full text-[11px] font-semibold`}
                            >
                              {departamento.statusGeral}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {dados.departamentos.length === 0 && (
                    <p className="py-8 text-center text-sm text-black/50">
                      Nenhum departamento com chamados no período.
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Relatorios;
