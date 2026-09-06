import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/ui/SearchInput';
import FiltroTextoTabs from '../../components/ui/FiltroTextoTabs';
import CardChamadoMunicipe from '../../components/layouts/CardChamadoMunicipe';

function HomeSecundaria() {
  const navigate = useNavigate();
  const [filtroAtivo, setFiltroAtivo] = useState('todos');

  return (
    <div>
      <h1 className="text-4xl font-bold text-primary">Chamados</h1>

      <SearchInput />

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

      <CardChamadoMunicipe
        categoria="Buraco"
        numero="2026-00001"
        status="aberto"
        endereco="Jardim das Flores, 220"
        data="28/08/2026"
        onClick={() => navigate('/chamados/2026-00001')}
      />

      <button
        type="button"
        onClick={() => navigate('/formulario/ocorrencia')}
        className="fixed bottom-24 right-5 w-16 h-16 rounded-full bg-primary text-white text-4xl shadow-lg flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export default HomeSecundaria;
