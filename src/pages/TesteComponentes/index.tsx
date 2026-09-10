import { useState } from 'react';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import RadioButton from '../../components/ui/RadioButton';
import SearchInput from '../../components/ui/SearchInput';
import StatusDot from '../../components/ui/StatusDot';
import CampoTexto from '../../components/ui/CampoTexto';
import CardChamadoMunicipe from '../../components/layouts/CardChamadoMunicipe';
import ButtonLarger from '../../components/ui/ButtonLarger';
import CampoTextoArea from '../../components/ui/CampoTextoArea';
import { useNavigate } from 'react-router-dom';
import CardAcaoHome from '../../components/layouts/CardAcaoHome';
import FiltroTextoTabs from '../../components/ui/FiltroTextoTabs';
import StepperFormulario from '../../components/ui/StepperFormulario';
import ButtonBack from '../../components/ui/ButtonBack';

/**
 * Página temporária só para visualizar todos os componentes do Design System
 * juntos, com suas variações de estado. Não faz parte do fluxo real do app —
 * pode ser removida (ou deixada como rota /teste-componentes) depois que o
 * time validar visualmente cada peça.
 */
function TesteComponentes() {
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-slate-800">
        Design System — Página de Teste
      </h1>

      {/* CLICÁVEIS */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-primary border-b pb-2">
          Clicáveis
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Enviar chamado</Button>
          <Button variant="outline">Cancelar</Button>
          <ButtonBack onClick={() => navigate(-1)} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ButtonLarger>Enviar chamado</ButtonLarger>
          <ButtonLarger variant="outline">Cancelar</ButtonLarger>
        </div>

        <div className="max-w-xs">
          <Select
            placeholder="Selecione uma ocorrência"
            options={[
              { label: 'Buraco na rua', value: 'buraco' },
              { label: 'Iluminação pública', value: 'iluminacao' },
              { label: 'Esgoto a céu aberto', value: 'esgoto' },
            ]}
          />
        </div>
      </section>

      {/* ÍCONES */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-primary border-b pb-2">Ícones</h2>

        <div className="flex flex-wrap items-center gap-6">
          <StatusDot status="aberto" />
          <StatusDot status="andamento" />
          <StatusDot status="urgente" />
        </div>
      </section>

      {/* INPUTS */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-primary border-b pb-2">Inputs</h2>

        <SearchInput />

        <div className="flex flex-wrap gap-4">
          <Checkbox label="Aceito os termos" defaultChecked />
          <Checkbox label="Não marcado" />
        </div>

        <div className="flex flex-wrap gap-4">
          <RadioButton name="exemplo-radio" label="Opção A" defaultChecked />
          <RadioButton name="exemplo-radio" label="Opção B" />
        </div>

        <FiltroTextoTabs
          ativo={filtroAtivo}
          onChange={setFiltroAtivo}
          opcoes={[
            { label: 'Todos', value: 'todos' },
            { label: 'Abertos', value: 'abertos' },
            { label: 'Em andamento', value: 'andamento' },
            { label: 'Concluídos', value: 'concluidos' },
          ]}
        />

        <div className="w-50">
          <CampoTexto label="Rua" placeholder="Insira o bairro aqui..." />
        </div>
        <div>
          <CampoTextoArea
            label="Descrição"
            placeholder="Descreva o problema encontrado..."
            rows={5}
          />
        </div>
      </section>

      {/* CARDS */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-primary border-b pb-2">Cards</h2>

        <CardChamadoMunicipe
          categoria="Buraco"
          numero="2026-00001"
          status="em atendimento"
          endereco="Jardim das Flores, 220"
          data="28/08/2026"
        />

        <CardAcaoHome
          variante="escuro"
          titulo="Abrir chamado"
          subtitulo="Registre uma nova ocorrência"
          textoBotao="Abrir"
          onAction={() => navigate('/formulario/ocorrencia')}
        />

        <CardAcaoHome
          variante="claro"
          titulo="Pesquisar chamado"
          subtitulo="Pesquise uma ocorrência"
          textoBotao="Pesquisar"
          onAction={() => navigate('/chamados')}
        />

        <StepperFormulario etapaAtual="ocorrencia" />
      </section>
    </div>
  );
}

export default TesteComponentes;
