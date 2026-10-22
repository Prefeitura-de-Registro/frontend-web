import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

import SearchInput from '../../components/ui/SearchInput';
import FiltroTextoTabs from '../../components/ui/FiltroTextoTabs';
import CardChamadoMunicipe from '../../components/layouts/CardChamadoMunicipe';

import { ocorrenciasMock } from '../../mock/ocorrencia.mock';
import type { Ocorrencias } from '../../types/ocorrencia';

// Converte o tipo do mock para o nome exibido no card.
function formatarCategoria(tipo: Ocorrencias['tipo']): string {
  const categorias: Record<Ocorrencias['tipo'], string> = {
    buraco: 'Buraco',
    poda: 'Poda de árvore',
    vazamento: 'Vazamento',
    luz: 'Iluminação pública',
  };

  return categorias[tipo];
}

// Converte a data ISO para o formato DD/MM/AAAA.
function formatarData(data: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(data));
}

function HomeSecundaria() {
  const navigate = useNavigate();

  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  // Filtra os chamados conforme a aba selecionada.
  const ocorrenciasFiltradas =
    filtroAtivo === 'todos'
      ? ocorrenciasMock
      : ocorrenciasMock.filter((ocorrencia) => {
          if (filtroAtivo === 'abertos') {
            return ocorrencia.status === 'aberto';
          }

          if (filtroAtivo === 'em-andamento') {
            return ocorrencia.status === 'em andamento';
          }

          if (filtroAtivo === 'concluidos') {
            return ocorrencia.status === 'concluído';
          }

          return true;
        });

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-primary mb-5">Chamados</h1>

      <SearchInput />

      <div className="mt-8">
        <FiltroTextoTabs
          opcoes={[
            { label: 'Todos', value: 'todos' },
            { label: 'Abertos', value: 'abertos' },
            { label: 'Em andamento', value: 'em-andamento' },
            { label: 'Concluídos', value: 'concluidos' },
          ]}
          ativo={filtroAtivo}
          onChange={setFiltroAtivo}
        />
      </div>

      <div className="mt-9 flex flex-col gap-4">
        {ocorrenciasFiltradas.map((ocorrencia) => (
          <CardChamadoMunicipe
            key={ocorrencia.id}
            categoria={formatarCategoria(ocorrencia.tipo)}
            numero={ocorrencia.id}
            status={ocorrencia.status}
            endereco={ocorrencia.endereco}
            data={formatarData(ocorrencia.createdAt)}
            onClick={() => navigate(`/chamados/${ocorrencia.id}`)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('/formulario/ocorrencia')}
        className="fixed bottom-[111px] right-[22px] w-[70px] h-[70px] rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
      >
        <Plus size={75} strokeWidth={2.0} />
      </button>
    </div>
  );
}

export default HomeSecundaria;
