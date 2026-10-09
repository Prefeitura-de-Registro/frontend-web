import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import CardChamado from '../../components/layouts/CardChamado';
import AvatarUsuario from '../../components/ui/AvatarUsuario';
import FiltroChamadosModal, {
  type FiltrosChamado,
} from '../../components/ui/FiltroChamadosModal';

import { ocorrenciasMock } from '../../mock/ocorrencia.mock';

import user from '../../assets/img/user.png';
import filtro from '../../assets/filtro.png';

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function SeusChamados() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosChamado>({
    prioridade: null,
    tipos: [],
  });

  const nomeUsuario = 'Sabrina';

  const chamadosFiltrados = useMemo(() => {
    return ocorrenciasMock.filter((c) => {
      const termo = busca.trim().toLowerCase();
      const bateBusca =
        !termo ||
        c.tipo.toLowerCase().includes(termo) ||
        c.id.toLowerCase().includes(termo) ||
        c.endereco.toLowerCase().includes(termo);

      const batePrioridade =
        !filtros.prioridade || c.status === filtros.prioridade;

      const bateTipo =
        filtros.tipos.length === 0 || filtros.tipos.includes(c.tipo);

      return bateBusca && batePrioridade && bateTipo;
    });
  }, [busca, filtros]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-6 pt-10 pb-4">
        <AvatarUsuario
          nomeUsuario={nomeUsuario}
          avatarSrc={user}
          temNotificacaoNova //Se não houver notificação, não utilizar essa prop no elemento
          onClickNotificacao={() => navigate('/notificacoes')}
        />

        <h1 className="mt-6 text-center text-4xl">
          <span className="font-semibold text-black">Seus</span>
          <br />
          <span className="font-bold text-primary text-5xl">Chamados</span>
        </h1>
      </header>

      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar"
            className="w-full h-9 rounded-full bg-white pl-5 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>

        <button
          type="button"
          onClick={() => setFiltroAberto(true)}
          aria-label="Filtros"
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0"
        >
          <img src={filtro} alt="" className="w-5 h-5 object-contain" />
        </button>
      </div>

      {/* Se não houver nenhum chamado, somente um texto centralizado vai aparecer, nada muito detalhado */}
      <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 pb-24">
        {chamadosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Nenhum chamado encontrado.
          </p>
        )}

        {chamadosFiltrados.map((chamado) => (
          <CardChamado
            key={chamado.id}
            categoria={
              chamado.tipo.charAt(0).toUpperCase() + chamado.tipo.slice(1)
            }
            numero={chamado.id}
            status={chamado.status}
            endereco={chamado.endereco}
            data={formatarData(chamado.createdAt)}
            onClick={() =>
              navigate(`/chamado/${chamado.id}`, { state: { chamado } })
            }
          />
        ))}
      </main>

      <Button
        variant="icon"
        icon={Plus}
        iconSize={40}
        aria-label="Abrir novo chamado"
        onClick={() => navigate('/formulario/ocorrencia')}
        className="fixed bottom-6 right-6 w-14 h-14 shadow-[0_5px_10px_rgba(0,0,0,0.25)]"
      />

      <FiltroChamadosModal
        aberto={filtroAberto}
        onFechar={() => setFiltroAberto(false)}
        filtrosAtuais={filtros}
        onAplicar={setFiltros}
      />
    </div>
  );
}

export default SeusChamados;
