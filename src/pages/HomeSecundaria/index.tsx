import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SearchInput from '../../components/ui/SearchInput';
import FiltroTextoTabs from '../../components/ui/FiltroTextoTabs';
import CardChamadoMunicipe from '../../components/layouts/CardChamadoMunicipe';

function HomeSecundaria() {
  const navigate = useNavigate();
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

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

      <div className="mt-9">
        <CardChamadoMunicipe
          categoria="Buraco"
          numero="2026-00001"
          status="aberto"
          endereco="Jardim das Flores, 220"
          data="28/08/2026"
          onClick={() => navigate('/chamados/2026-00001')}
        />
      </div>

      <button
        type="button"
        onClick={() => navigate('/formulario/ocorrencia')}
        className="fixed bottom-[111px] right-[22px] w-[92px] h-[92px] rounded-full bg-primary text-white shadow-lg flex items-center justify-center"
      >
        <Plus size={75} strokeWidth={2.0} />
      </button>
    </div>
  );
}

export default HomeSecundaria;
