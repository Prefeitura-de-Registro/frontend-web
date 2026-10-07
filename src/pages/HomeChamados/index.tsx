import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Plus, SlidersHorizontal } from 'lucide-react';

import CardChamadoMunicipe from '../../components/layouts/CardChamadoMunicipe';
import { ocorrenciasMock } from '../../mock/ocorrencia.mock';
import pinLocalizao from '../../assets/img/pinLocalizacao.png';

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR');
}

function SeusChamados() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

  const nomeUsuario = 'Sabrina';

  const chamadosFiltrados = useMemo(() => {
    if (!busca.trim()) return ocorrenciasMock;
    const termo = busca.toLowerCase();
    return ocorrenciasMock.filter(
      (c) =>
        c.tipo.toLowerCase().includes(termo) ||
        c.id.toLowerCase().includes(termo) ||
        c.endereco.toLowerCase().includes(termo),
    );
  }, [busca]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={pinLocalizao}
              alt={nomeUsuario}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <p className="font-bold text-primary">Olá, {nomeUsuario}!</p>
              <p className="text-sm font-bold text-black">
                Como podemos ajudar hoje?
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Notificações"
            className="relative w-11 h-11 rounded-full bg-primary flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-danger" />
          </button>
        </div>

        <h1 className="mt-6 text-center text-2xl">
          <span className="font-bold text-black">Seus</span>
          <br />
          <span className="font-bold text-primary text-4xl">Chamados</span>
        </h1>
      </header>

      <div className="bg-primary px-6 py-4 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar"
            className="w-full h-11 rounded-full bg-white pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Filtros"
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5 text-primary" />
        </button>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 pb-24">
        {chamadosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            Nenhum chamado encontrado.
          </p>
        )}

        {chamadosFiltrados.map((chamado) => (
          <CardChamadoMunicipe
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

      <button
        type="button"
        onClick={() => navigate('/formulario/ocorrencia')}
        aria-label="Abrir novo chamado"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-7 h-7" strokeWidth={2.5} />
      </button>
    </div>
  );
}

export default SeusChamados;
