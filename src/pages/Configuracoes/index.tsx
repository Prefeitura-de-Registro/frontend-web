import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search,
  Bell,
  Home,
  FileCheck,
  MapPin,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Edit2,
  ChevronDown,
} from 'lucide-react';

import logoFalaRegistro from '../../assets/logo-fala-registro.svg';
import samuelPerfil from '../../assets/img/samuel-perfil.png';

export function Configuracoes() {
  const location = useLocation();

  // Lê o caminho da URL em tempo real
  const getAbaAtiva = () => {
    if (location.pathname.endsWith('/sla')) return 'sla';
    if (location.pathname.endsWith('/notificacoes')) return 'notificacoes';
    if (location.pathname.endsWith('/permissoes')) return 'permissoes';
    return 'perfil'; // Padrão se for /configuracoes ou /configuracoes/perfil
  };

  const abaAtiva = getAbaAtiva();

  // Estado da Aba 1: Perfil
  const [perfil, setPerfil] = useState({
    nome: 'Samuel Almeida Silva',
    email: 'samuel.almeida@gmail.com',
    cargo: 'Administrador',
    secretaria: 'Secretaria Meio Ambiente',
  });
  const [editandoPerfil, setEditandoPerfil] = useState(false);

  // Estado da Aba 2: Sistema & SLA
  const [sla, setSla] = useState({
    altaHoras: '02',
    altaMin: '00',
    mediaHoras: '08',
    mediaMin: '00',
    baixaHoras: '24',
    baixaMin: '00',
  });

  // Estado da Aba 3: Notificações
  const [notificacoes, setNotificacoes] = useState({
    novosChamados: true,
    atualizacaoStatus: true,
    chamadosAtraso: true,
    relatoriosSemanais: false,
  });

  // Estado da Aba 4: Permissões
  const [permissoes, setPermissoes] = useState({
    cargo: 'Administrador do Sistema',
    gerenciarOperadores: true,
    editarSLA: true,
    exportarFinanceiro: false,
    aprovarFechamento: true,
  });

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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <BarChart2 size={18} />
              Relatórios
            </a>
            <Link
              to="/configuracoes/perfil"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white text-primary font-semibold text-sm shadow-sm"
            >
              <Settings size={18} />
              Configurações
            </Link>
          </nav>
        </div>

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
        <header className="bg-white border-b border-tertiary px-8 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-4">
            <img
              src={samuelPerfil}
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

            <button className="relative p-2.5 rounded-full bg-primary text-white hover:opacity-90 transition-opacity">
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-danger border-2 border-white rounded-full" />
            </button>
          </div>
        </header>

        <main className="p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold text-primary mb-6">
              Configurações
            </h1>

            {/* ABAS COM LINK NATIVO DO REACT ROUTER DOM */}
            <div className="border-b border-tertiary flex gap-8 text-xs font-medium">
              <Link
                to="/configuracoes/perfil"
                className={`pb-3 transition-colors relative ${
                  abaAtiva === 'perfil'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Perfil
              </Link>

              <Link
                to="/configuracoes/sla"
                className={`pb-3 transition-colors relative ${
                  abaAtiva === 'sla'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Sistema & SLA
              </Link>

              <Link
                to="/configuracoes/notificacoes"
                className={`pb-3 transition-colors relative ${
                  abaAtiva === 'notificacoes'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Notificações
              </Link>

              <Link
                to="/configuracoes/permissoes"
                className={`pb-3 transition-colors relative ${
                  abaAtiva === 'permissoes'
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                Permissões
              </Link>
            </div>
          </div>

          {/* ABA 1: PERFIL */}
          {abaAtiva === 'perfil' && (
            <div className="bg-white p-8 rounded-xl border border-tertiary shadow-sm relative">
              <button
                type="button"
                onClick={() => setEditandoPerfil(!editandoPerfil)}
                className="absolute top-6 right-6 border border-tertiary bg-secondary/50 hover:bg-tertiary text-black/70 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 size={14} className="text-primary" />
                {editandoPerfil ? 'Salvar' : 'Editar'}
              </button>

              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="p-2.5 rounded-full border border-primary/20 bg-white shadow-md shrink-0 flex items-center justify-center">
                  <img
                    src={samuelPerfil}
                    alt="Samuel Almeida Silva"
                    className="w-28 h-28 rounded-full object-cover border-2 border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 flex-1 text-xs">
                  <div>
                    <span className="block font-bold text-black text-xs mb-1">
                      Nome
                    </span>
                    {editandoPerfil ? (
                      <input
                        type="text"
                        value={perfil.nome}
                        onChange={(e) =>
                          setPerfil({ ...perfil, nome: e.target.value })
                        }
                        className="bg-secondary/60 border border-tertiary rounded-lg px-3 py-2 w-full outline-none focus:border-primary text-xs"
                      />
                    ) : (
                      <span className="text-black/80 text-xs font-medium">
                        {perfil.nome}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="block font-bold text-black text-xs mb-1">
                      Secretaria
                    </span>
                    {editandoPerfil ? (
                      <input
                        type="text"
                        value={perfil.secretaria}
                        onChange={(e) =>
                          setPerfil({ ...perfil, secretaria: e.target.value })
                        }
                        className="bg-secondary/60 border border-tertiary rounded-lg px-3 py-2 w-full outline-none focus:border-primary text-xs"
                      />
                    ) : (
                      <span className="text-black/80 text-xs font-medium">
                        {perfil.secretaria}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="block font-bold text-black text-xs mb-1">
                      E-mail
                    </span>
                    {editandoPerfil ? (
                      <input
                        type="email"
                        value={perfil.email}
                        onChange={(e) =>
                          setPerfil({ ...perfil, email: e.target.value })
                        }
                        className="bg-secondary/60 border border-tertiary rounded-lg px-3 py-2 w-full outline-none focus:border-primary text-xs"
                      />
                    ) : (
                      <span className="text-black/80 text-xs font-medium">
                        {perfil.email}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="block font-bold text-black text-xs mb-1">
                      Cargo
                    </span>
                    {editandoPerfil ? (
                      <input
                        type="text"
                        value={perfil.cargo}
                        onChange={(e) =>
                          setPerfil({ ...perfil, cargo: e.target.value })
                        }
                        className="bg-secondary/60 border border-tertiary rounded-lg px-3 py-2 w-full outline-none focus:border-primary text-xs"
                      />
                    ) : (
                      <span className="text-black/80 text-xs font-medium">
                        {perfil.cargo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: SISTEMA & SLA */}
          {abaAtiva === 'sla' && (
            <div className="bg-white p-6 rounded-xl border border-tertiary shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary">
                  Tempo Limite de SLA (Atendimento)
                </h3>
                <p className="text-xs text-black/60 mt-1">
                  Configure o tempo máximo de tolerância para o início de
                  resposta de cada prioridade de chamado.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between py-2 border-b border-tertiary/40">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-danger shrink-0" />
                    <span className="text-xs font-semibold text-black">
                      Prioridade Alta (Urgente)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/60 font-medium">
                    <input
                      type="text"
                      value={sla.altaHoras}
                      onChange={(e) =>
                        setSla({ ...sla, altaHoras: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>h</span>
                    <input
                      type="text"
                      value={sla.altaMin}
                      onChange={(e) =>
                        setSla({ ...sla, altaMin: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-tertiary/40">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
                    <span className="text-xs font-semibold text-black">
                      Prioridade Média (Andamento)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/60 font-medium">
                    <input
                      type="text"
                      value={sla.mediaHoras}
                      onChange={(e) =>
                        setSla({ ...sla, mediaHoras: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>h</span>
                    <input
                      type="text"
                      value={sla.mediaMin}
                      onChange={(e) =>
                        setSla({ ...sla, mediaMin: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-warning shrink-0" />
                    <span className="text-xs font-semibold text-black">
                      Prioridade Baixa (Normal)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/60 font-medium">
                    <input
                      type="text"
                      value={sla.baixaHoras}
                      onChange={(e) =>
                        setSla({ ...sla, baixaHoras: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>h</span>
                    <input
                      type="text"
                      value={sla.baixaMin}
                      onChange={(e) =>
                        setSla({ ...sla, baixaMin: e.target.value })
                      }
                      className="w-12 text-center bg-white border border-tertiary rounded-md py-1.5 font-semibold text-black outline-none focus:border-primary"
                    />
                    <span>m</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: NOTIFICAÇÕES */}
          {abaAtiva === 'notificacoes' && (
            <div className="bg-white p-6 rounded-xl border border-tertiary shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-primary">
                Preferências de Notificação
              </h3>

              <div className="divide-y divide-tertiary/50">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <span className="block text-xs font-bold text-black">
                      Novos chamados
                    </span>
                    <span className="text-[11px] text-black/50">
                      Notificar ao receber novas demandas do município.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotificacoes({
                        ...notificacoes,
                        novosChamados: !notificacoes.novosChamados,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      notificacoes.novosChamados ? 'bg-primary' : 'bg-tertiary'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        notificacoes.novosChamados
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <span className="block text-xs font-bold text-black">
                      Atualizações de status
                    </span>
                    <span className="text-[11px] text-black/50">
                      Enviar alerta quando o chamado for concluído.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotificacoes({
                        ...notificacoes,
                        atualizacaoStatus: !notificacoes.atualizacaoStatus,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      notificacoes.atualizacaoStatus
                        ? 'bg-primary'
                        : 'bg-tertiary'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        notificacoes.atualizacaoStatus
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <span className="block text-xs font-bold text-black">
                      Chamados em atraso
                    </span>
                    <span className="text-[11px] text-black/50">
                      Avisar imediatamente ao expirar o tempo de SLA.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotificacoes({
                        ...notificacoes,
                        chamadosAtraso: !notificacoes.chamadosAtraso,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      notificacoes.chamadosAtraso ? 'bg-primary' : 'bg-tertiary'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        notificacoes.chamadosAtraso
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <span className="block text-xs font-bold text-black">
                      Relatórios semanais
                    </span>
                    <span className="text-[11px] text-black/50">
                      Compilado consolidado de chamados por e-mail.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotificacoes({
                        ...notificacoes,
                        relatoriosSemanais: !notificacoes.relatoriosSemanais,
                      })
                    }
                    className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                      notificacoes.relatoriosSemanais
                        ? 'bg-primary'
                        : 'bg-tertiary'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        notificacoes.relatoriosSemanais
                          ? 'translate-x-5'
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: PERMISSÕES */}
          {abaAtiva === 'permissoes' && (
            <div className="bg-white p-6 rounded-xl border border-tertiary shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-primary">
                Perfil de Acesso & Permissões
              </h3>

              <div className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-black/70 mb-1.5">
                    Cargo Administrativo
                  </label>
                  <div className="relative">
                    <select
                      value={permissoes.cargo}
                      onChange={(e) =>
                        setPermissoes({ ...permissoes, cargo: e.target.value })
                      }
                      className="w-full bg-white border border-tertiary text-xs text-black font-medium py-2.5 px-3 rounded-lg appearance-none outline-none cursor-pointer focus:border-primary"
                    >
                      <option value="Administrador do Sistema">
                        Administrador do Sistema
                      </option>
                      <option value="Gestor de Secretaria">
                        Gestor de Secretaria
                      </option>
                      <option value="Operador">Operador</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissoes.gerenciarOperadores}
                      onChange={(e) =>
                        setPermissoes({
                          ...permissoes,
                          gerenciarOperadores: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-tertiary text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span className="text-xs font-medium text-black/80">
                      Gerenciar operadores e departamentos
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissoes.editarSLA}
                      onChange={(e) =>
                        setPermissoes({
                          ...permissoes,
                          editarSLA: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-tertiary text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span className="text-xs font-medium text-black/80">
                      Editar configurações globais de SLA
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissoes.exportarFinanceiro}
                      onChange={(e) =>
                        setPermissoes({
                          ...permissoes,
                          exportarFinanceiro: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-tertiary text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span className="text-xs font-medium text-black/80">
                      Exportar relatórios financeiros
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={permissoes.aprovarFechamento}
                      onChange={(e) =>
                        setPermissoes({
                          ...permissoes,
                          aprovarFechamento: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-tertiary text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span className="text-xs font-medium text-black/80">
                      Aprovar fechamento de chamados críticos
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Configuracoes;
