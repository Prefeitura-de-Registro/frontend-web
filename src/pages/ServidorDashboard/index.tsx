import React from 'react';
import { Search, Bell, Clock, Filter } from 'lucide-react';

export function ServidorDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* 1. Header do Operador Integrado no Conteúdo */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="Foto do operador"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#0073a9]"
          />
          <div>
            <h1 className="text-2xl font-extrabold text-[#0073a9]">
              Olá, Samuel!
            </h1>
            <p className="text-sm font-semibold text-slate-500">
              14 de setembro de 2026
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full pl-4 pr-10 py-2 bg-slate-100 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-[#0073a9] transition-all"
            />
            <Search
              size={18}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0073a9]"
            />
          </div>

          <button
            type="button"
            className="relative p-2.5 bg-[#0073a9] text-white rounded-full shadow-xs hover:bg-[#005a86] transition-colors"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
          </button>
        </div>
      </header>

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
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-black text-slate-800">6</span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    +2 essa semana
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-sky-500 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Andamento
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-black text-slate-800">5</span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    67% no prazo
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-emerald-500 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Concluídos
                </span>
                <p className="text-3xl font-black text-emerald-500 mt-1">42</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border-b-4 border-b-amber-400 shadow-xs">
                <span className="text-xs font-bold text-slate-500">
                  Em atraso
                </span>
                <p className="text-3xl font-black text-amber-500 mt-1">2</p>
              </div>
            </div>
          </section>

          {/* Chamados por departamento */}
          <div className="bg-white p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#0073a9] uppercase tracking-wide">
              Chamados por departamento
            </h3>
            <div className="h-44 flex items-end justify-between gap-4 pt-6 px-4 border-b border-dashed border-slate-200">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-purple-600 rounded-t-md h-28" />
                <span className="text-xs font-bold text-slate-600">Obras</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-emerald-600 rounded-t-md h-20" />
                <span className="text-xs font-bold text-slate-600 text-center leading-tight">
                  Meio Ambiente
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-orange-500 rounded-t-md h-12" />
                <span className="text-xs font-bold text-slate-600 text-center leading-tight">
                  Iluminação
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-sky-400 rounded-t-md h-10" />
                <span className="text-xs font-bold text-slate-600 text-center leading-tight">
                  Saneamento
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-400 rounded-t-md h-6" />
                <span className="text-xs font-bold text-slate-600">Outros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Prioridades e Status Donut */}
        <div className="lg:col-span-5 space-y-6">
          <section>
            <h2 className="text-xl font-extrabold text-[#0073a9] mb-3">
              Prioridades
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <div className="min-w-[180px] bg-white p-3.5 rounded-2xl shadow-xs border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Buraco</span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Clock size={12} /> 8h
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">#2026-0001</p>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-red-600 bg-red-100 rounded-full">
                  aberto
                </span>
              </div>

              <div className="min-w-[180px] bg-white p-3.5 rounded-2xl shadow-xs border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>Buraco</span>
                  <span className="flex items-center gap-1 text-amber-500">
                    <Clock size={12} /> 8h
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">#2026-0001</p>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-sky-600 bg-sky-100 rounded-full">
                  em atendimento
                </span>
              </div>
            </div>
          </section>

          {/* Donut Status */}
          <div className="bg-white p-6 rounded-2xl shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-[#0073a9] uppercase tracking-wide">
              Status dos chamados
            </h3>
            <div className="flex items-center justify-between gap-4">
              <div
                className="relative w-36 h-36 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    'conic-gradient(#ef4444 0% 15%, #0284c7 15% 45%, #10b981 45% 85%, #eab308 85% 100%)',
                }}
              >
                <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-slate-800">55</span>
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

      {/* 3. Mapa de Ocorrências Ocupando Toda a Largura Inferior */}
      <section className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xs border border-slate-200">
        {/* Controles do Filtro Flutuando Sobre o Mapa (Overlay) */}
        <div className="absolute top-4 right-4 sm:right-6 z-10 flex flex-wrap items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md">
          <button
            type="button"
            className="px-4 py-1.5 bg-[#0073a9] text-white text-xs font-extrabold rounded-full transition-all shadow-xs"
          >
            Todos
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-red-600 hover:bg-red-50 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Abertos
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Em
            andamento
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 bg-white border border-slate-200 text-amber-600 hover:bg-amber-50 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-xs"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Em atraso
          </button>
          <button
            type="button"
            className="p-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full shadow-xs"
            aria-label="Filtrar"
          >
            <Filter size={16} />
          </button>
        </div>

        {/* Renderização do Mapa */}
        <iframe
          title="Mapa de Ocorrências Registro"
          src="https://maps.google.com/maps?q=Registro%20SP&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
        />
      </section>
    </div>
  );
}

export default ServidorDashboard;
