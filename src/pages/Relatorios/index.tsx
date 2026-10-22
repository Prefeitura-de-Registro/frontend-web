import { useState } from 'react';
import {
  Search,
  Bell,
  Download,
  Home,
  FileCheck,
  MapPin,
  Users,
  BarChart2,
  Settings,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  LogOut,
} from 'lucide-react';

import logoFalaRegistro from '../../assets/logo-fala-registro.svg';

export function Relatorios() {
  const [periodo, setPeriodo] = useState('mensal');

  const handleExportarPDF = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-secondary text-black font-sans print:bg-white">
      {/* BARRA LATERAL (SIDEBAR FIXA) */}
      <aside className="w-64 bg-primary text-white flex flex-col justify-between p-4 print:hidden shrink-0 sticky top-0 h-screen">
        <div>
          <div className="mb-8 pt-2 px-2 flex justify-start">
            <img
              src={logoFalaRegistro}
              alt="Fala Registro!"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Menu de Navegação */}
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <Home size={18} />
              Home
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <FileCheck size={18} />
              Chamados
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <MapPin size={18} />
              Mapa de Ocorrência
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <Users size={18} />
              Operadores
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white text-primary font-semibold text-sm shadow-sm"
            >
              <BarChart2 size={18} />
              Relatórios
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <Settings size={18} />
              Configurações
            </a>
          </nav>
        </div>

        {/* Botão Sair no Rodapé da Sidebar */}
        <div className="pt-4 border-t border-white/10">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut size={18} />
            Sair
          </a>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* CABEÇALHO SUPERIOR */}
        <header className="bg-white border-b border-tertiary px-8 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Samuel"
              className="w-10 h-10 rounded-full object-cover border border-tertiary"
            />
            <div>
              <h2 className="text-base font-bold text-black leading-tight">
                Olá, Samuel!
              </h2>
              <p className="text-xs text-black/60">14 de setembro de 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Campo de Pesquisa com Lupa à Direita */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar"
                className="bg-secondary/60 text-xs pl-4 pr-9 py-2 rounded-full w-64 outline-none focus:ring-2 focus:ring-primary/20 text-black placeholder:text-black/40"
              />
              <Search
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
              />
            </div>

            {/* Botão de Notificação Azul com Ponto Vermelho */}
            <button className="relative p-2.5 rounded-full bg-primary text-white hover:opacity-90 transition-opacity">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
            </button>
          </div>
        </header>

        {/* PAINEL DE RELATÓRIOS */}
        <main className="p-8 space-y-6 overflow-y-auto">
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
                  onChange={(e) => setPeriodo(e.target.value)}
                  className="bg-white border border-tertiary text-xs text-black font-medium py-2 pl-3 pr-8 rounded-lg appearance-none outline-none cursor-pointer shadow-sm hover:border-primary transition-colors"
                >
                  <option value="semanal">Últimas 7 Semanas</option>
                  <option value="mensal">Selecione o Período</option>
                  <option value="anual">Ano de 2026</option>
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                />
              </div>

              <button
                onClick={handleExportarPDF}
                className="bg-primary hover:opacity-95 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
              >
                <Download size={14} />
                Exportar PDF
              </button>
            </div>
          </div>

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
                <span className="text-2xl font-bold text-black">1,248</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-success mt-1">
                  <TrendingUp size={12} />
                  <span>+12% em relação ao mês anterior</span>
                </div>
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
                <span className="text-2xl font-bold text-success">94.2%</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-success mt-1">
                  <TrendingUp size={12} />
                  <span>+1.5% de eficiência média</span>
                </div>
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
                <span className="text-2xl font-bold text-timer">18h 45m</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-success mt-1">
                  <TrendingDown size={12} />
                  <span>-4.2h tempo de resposta mais rápido</span>
                </div>
              </div>
            </div>

            {/* Card 4: Avaliação do Cidadão */}
            <div className="bg-white p-5 rounded-xl border border-tertiary shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-black/60">
                  Avaliação do Cidadão
                </span>
                <span className="w-3 h-3 rounded-full bg-warning/50" />
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-black">4.6 / 5.0</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-success mt-1">
                  <TrendingUp size={12} />
                  <span>+0.2 pontos de satisfação</span>
                </div>
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

              <div className="h-48 w-full relative">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 500 150"
                  preserveAspectRatio="none"
                >
                  {/* Linhas de Grade */}
                  <line
                    x1="0"
                    y1="30"
                    x2="500"
                    y2="30"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="75"
                    x2="500"
                    y2="75"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <line
                    x1="0"
                    y1="120"
                    x2="500"
                    y2="120"
                    stroke="var(--color-tertiary)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />

                  {/* Linha Abertos */}
                  <path
                    d="M 10 110 L 80 80 L 150 120 L 225 40 L 300 30 L 375 80 L 490 10"
                    fill="none"
                    stroke="var(--color-info)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Linha Concluídos */}
                  <path
                    d="M 10 120 L 80 95 L 150 98 L 225 65 L 300 50 L 375 55 L 490 5"
                    fill="none"
                    stroke="var(--color-success)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="flex justify-between text-[11px] text-black/50 mt-2">
                  <span>Semana 1</span>
                  <span>Semana 2</span>
                  <span>Semana 3</span>
                  <span>Semana 4</span>
                  <span>Semana 5</span>
                  <span>Semana 6</span>
                  <span>Semana 7</span>
                </div>
              </div>
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
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary"
                    strokeDasharray="41.7, 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-success"
                    strokeDasharray="34.4, 100"
                    strokeDashoffset="-41.7"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-timer"
                    strokeDasharray="23.9, 100"
                    strokeDashoffset="-76.1"
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-black/50 uppercase font-semibold">
                    Total
                  </span>
                  <span className="text-base font-bold text-black leading-tight">
                    1,248
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 mt-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="font-semibold text-black">Obras</span>
                  </div>
                  <span className="text-black/60 text-[11px]">
                    520 chamados (41.7%)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-success" />
                    <span className="font-semibold text-black">Iluminação</span>
                  </div>
                  <span className="text-black/60 text-[11px]">
                    430 chamados (34.4%)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-timer" />
                    <span className="font-semibold text-black">Saneamento</span>
                  </div>
                  <span className="text-black/60 text-[11px]">
                    298 chamados (23.9%)
                  </span>
                </div>
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
                    <th className="py-3 px-6 text-center">Chamados Totais</th>
                    <th className="py-3 px-6 text-center">Concluídos</th>
                    <th className="py-3 px-6 text-center">
                      Tempo Médio Solução
                    </th>
                    <th className="py-3 px-6 text-center">Status Geral</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-tertiary text-black">
                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-6 font-semibold">
                      Secretaria de Obras e Vias Públicas
                    </td>
                    <td className="py-4 px-6 text-center">450</td>
                    <td className="py-4 px-6 text-center">420</td>
                    <td className="py-4 px-6 text-center">16h 20m</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-success/15 text-success px-3 py-1 rounded-full text-[11px] font-semibold">
                        Excelente
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-6 font-semibold">
                      Departamento de Iluminação Pública
                    </td>
                    <td className="py-4 px-6 text-center">312</td>
                    <td className="py-4 px-6 text-center">290</td>
                    <td className="py-4 px-6 text-center">12h 05m</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-success/15 text-success px-3 py-1 rounded-full text-[11px] font-semibold">
                        Excelente
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-6 font-semibold">
                      Secretaria de Saneamento e Meio Ambiente
                    </td>
                    <td className="py-4 px-6 text-center">258</td>
                    <td className="py-4 px-6 text-center">210</td>
                    <td className="py-4 px-6 text-center">28h 40m</td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-timer/15 text-timer px-3 py-1 rounded-full text-[11px] font-semibold">
                        Atenção
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Relatorios;
