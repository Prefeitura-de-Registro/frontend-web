import { useState } from 'react';
import {
  Bell,
  ClipboardList,
  Home,
  MapPinned,
  Settings,
  Users,
  FileText,
  LogOut,
  Search,
  X,
  MapPin,
  Clock3,
  CalendarDays,
  AlertTriangle,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../../contexts/useAuth';
import { ocorrenciasMock } from '../../mock/ocorrencia.mock';
import type { Ocorrencias } from '../../types/ocorrencia';
import logoPrefeitura from '../../assets/logo-fala-registro.svg';
import samuelPerfil from '../../assets/img/samuel-perfil.png';

function GestaoChamados() {
  const { signOut } = useAuth();
  const [busca, setBusca] = useState('');
  const [buscaTopo, setBuscaTopo] = useState('');
  const [chamadoSelecionado, setChamadoSelecionado] =
    useState<Ocorrencias | null>(null);

  const dataAtual = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const termoBusca = `${busca} ${buscaTopo}`.trim().toLocaleLowerCase('pt-BR');

  const chamadosFiltrados = ocorrenciasMock.filter((chamado) => {
    const conteudo = [
      chamado.id,
      chamado.tipo,
      chamado.endereco,
      chamado.descricao,
    ]
      .join(' ')
      .toLocaleLowerCase('pt-BR');

    return conteudo.includes(termoBusca);
  });

  const nomeTipo: Record<Ocorrencias['tipo'], string> = {
    buraco: 'Buraco',
    poda: 'Poda de árvore',
    vazamento: 'Vazamento',
    luz: 'Iluminação pública',
  };

  const statusInfo = (status: Ocorrencias['status']) => {
    if (status === 'aberto') {
      return {
        label: 'Aberto',
        badge: 'bg-red-100 text-red-700',
        dot: 'bg-red-600',
        border: 'border-l-red-600',
      };
    }

    if (status === 'em andamento') {
      return {
        label: 'Em atendimento',
        badge: 'bg-sky-100 text-sky-700',
        dot: 'bg-sky-600',
        border: 'border-l-sky-600',
      };
    }

    return {
      label: 'Concluído',
      badge: 'bg-teal-100 text-teal-700',
      dot: 'bg-teal-500',
      border: 'border-l-emerald-400',
    };
  };

  const prioridadeInfo = (estado: Ocorrencias['estado']) => {
    if (estado === 'urgente') {
      return {
        label: 'Urgente',
        badge: 'bg-red-100 text-red-700',
        icon: true,
      };
    }

    if (estado === 'normal') {
      return {
        label: 'Normal',
        badge: 'bg-gray-100 text-gray-700',
        icon: false,
      };
    }

    return {
      label: 'Média',
      badge: 'bg-amber-100 text-amber-700',
      icon: false,
    };
  };

  return (
    <div className="min-h-screen bg-white md:flex">
      <aside className="flex w-full shrink-0 flex-col bg-[#0073A9] text-white md:min-h-screen md:w-[220px]">
        <div className="flex h-[112px] items-center justify-between border-b border-white/15 px-5">
          <img
            src={logoPrefeitura}
            alt="Fala Registro"
            className="h-auto max-h-[72px] max-w-[155px] object-contain"
          />

          <button
            type="button"
            aria-label="Recolher menu"
            className="hidden h-8 w-8 translate-x-9 items-center justify-center rounded-full border-2 border-[#0073A9] bg-white text-[#0073A9] md:flex"
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 pt-7" aria-label="Menu principal">
          <a
            href="/"
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/10"
          >
            <Home size={17} />
            Home
          </a>

          <a
            href="/gestao-chamados"
            aria-current="page"
            className="flex items-center gap-3 bg-white px-5 py-3 text-sm font-medium text-[#0073A9]"
          >
            <ClipboardList size={17} />
            Chamados
          </a>

          <a
            href="#mapa"
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/10"
          >
            <MapPinned size={17} />
            Mapa de Ocorrência
          </a>

          <a
            href="#operadores"
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/10"
          >
            <Users size={17} />
            Operadores
          </a>

          <a
            href="#relatorios"
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/10"
          >
            <FileText size={17} />
            Relatórios
          </a>

          <a
            href="#configuracoes"
            className="flex items-center gap-3 px-5 py-3 text-sm transition-colors hover:bg-white/10"
          >
            <Settings size={17} />
            Configurações
          </a>
        </nav>

        <button
          type="button"
          onClick={signOut}
          className="flex items-center gap-3 border-t border-white/20 px-5 py-5 text-left text-sm hover:bg-white/10"
        >
          <LogOut size={18} />
          Sair
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex min-h-[108px] flex-col gap-4 bg-[#F7F7F7] px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="flex items-center gap-3">
            <img
              src={samuelPerfil}
              alt="Foto de Samuel"
              className="h-12 w-12 shrink-0 rounded-full border-2 border-[#0073A9] object-cover"
            />

            <div>
              <h2 className="text-lg font-bold text-[#0073A9]">Olá, Samuel!</h2>
              <p className="text-sm text-gray-800">{dataAtual}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full border border-gray-100 bg-white px-4 shadow-sm lg:w-[280px] lg:flex-none">
              <input
                type="search"
                value={buscaTopo}
                onChange={(event) => setBuscaTopo(event.target.value)}
                placeholder="Pesquisar"
                aria-label="Pesquisar chamados"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
              <Search size={19} className="shrink-0 text-[#0073A9]" />
            </div>

            <button
              type="button"
              aria-label="Notificações"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0073A9] text-white shadow-md transition-colors hover:bg-[#005d89]"
            >
              <Bell size={19} />
            </button>
          </div>
        </header>

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
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Pesquisar por protocolo, ocorrência ou endereço"
              aria-label="Buscar por protocolo, ocorrência ou endereço"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {busca ? (
              <button
                type="button"
                aria-label="Limpar pesquisa"
                onClick={() => setBusca('')}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            ) : (
              <Search size={19} className="shrink-0 text-[#0073A9]" />
            )}
          </div>

          <section aria-label="Lista de chamados" className="space-y-3">
            <div className="grid grid-cols-[minmax(0,1fr)_125px_145px_85px] items-center gap-5 rounded-xl bg-[#F1F1F1] px-5 py-4 text-sm font-semibold text-[#0073A9] sm:grid-cols-[minmax(0,1fr)_135px_155px_90px] sm:gap-8 sm:px-7">
              <span className="flex items-center gap-1">
                Ocorrência <span aria-hidden="true">↕</span>
              </span>
              <span className="text-center">Status</span>
              <span className="text-center">Prioridade</span>
              <span className="text-center">SLA</span>
            </div>

            {chamadosFiltrados.map((chamado) => {
              const status = statusInfo(chamado.status);
              const prioridade = prioridadeInfo(chamado.estado);

              return (
                <button
                  type="button"
                  key={chamado.id}
                  onClick={() => setChamadoSelecionado(chamado)}
                  className={`grid w-full grid-cols-[minmax(0,1fr)_125px_145px_85px] items-center gap-5 rounded-xl border-l-[3px] ${status.border} bg-white px-4 py-4 text-left shadow-[0_2px_4px_rgba(0,0,0,0.16)] transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0073A9] sm:grid-cols-[minmax(0,1fr)_135px_155px_90px] sm:gap-8 sm:px-7`}
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-[#0073A9]">
                      {nomeTipo[chamado.tipo]}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-600">
                      #{chamado.id}
                    </p>
                    <p className="mt-1 truncate text-sm text-gray-700">
                      {chamado.endereco}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-semibold ${status.badge}`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${status.dot}`}
                      />
                      <span className="hidden sm:inline">{status.label}</span>
                      <span className="sm:hidden">
                        {chamado.status === 'em andamento'
                          ? 'Atend.'
                          : chamado.status === 'aberto'
                            ? 'Aberto'
                            : 'Concl.'}
                      </span>
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${prioridade.badge}`}
                    >
                      {prioridade.icon && <AlertTriangle size={14} />}
                      {prioridade.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-base font-medium text-gray-700">
                    <Clock3
                      size={16}
                      className="hidden text-[#FD7E14] sm:block"
                    />
                    {chamado.sla}
                  </div>
                </button>
              );
            })}

            {chamadosFiltrados.length === 0 && (
              <div className="rounded-xl bg-gray-50 px-5 py-12 text-center text-sm text-gray-500">
                Nenhum chamado encontrado para essa pesquisa.
              </div>
            )}
          </section>
        </main>
      </div>

      {chamadoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setChamadoSelecionado(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detalhes-chamado-titulo"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-sm text-gray-500">
                  Protocolo #{chamadoSelecionado.id}
                </p>
                <h2
                  id="detalhes-chamado-titulo"
                  className="mt-1 text-xl font-bold text-[#0073A9]"
                >
                  {nomeTipo[chamadoSelecionado.tipo]}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Fechar detalhes"
                onClick={() => setChamadoSelecionado(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <p className="text-sm leading-6 text-gray-700">
                {chamadoSelecionado.descricao}
              </p>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-[#0073A9]" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Endereço
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {chamadoSelecionado.endereco}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 size={18} className="mt-0.5 text-[#FD7E14]" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Prazo SLA
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {chamadoSelecionado.sla}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={18} className="mt-0.5 text-[#0073A9]" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Data de registro
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Intl.DateTimeFormat('pt-BR', {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    }).format(new Date(chamadoSelecionado.createdAt))}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setChamadoSelecionado(null)}
                className="rounded-lg bg-[#0073A9] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005d89]"
              >
                Fechar
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default GestaoChamados;
