import { useNavigate } from 'react-router-dom';
import IconeFormulario, { type TipoIconeFormulario } from './IconeFormulario';

interface StepperFormularioProps {
  etapaAtual: TipoIconeFormulario;
}

const ETAPAS: TipoIconeFormulario[] = ['ocorrencia', 'endereco', 'fotos'];

// Mapeamento das rotas correspondentes a cada ícone do stepper
const ROTAS_ETAPAS: Record<TipoIconeFormulario, string> = {
  ocorrencia: '/formulario/ocorrencia',
  endereco: '/formulario/endereco',
  fotos: '/formulario/fotos',
};

function StepperFormulario({ etapaAtual }: StepperFormularioProps) {
  const navigate = useNavigate();
  const currentIndex = ETAPAS.indexOf(etapaAtual);

  return (
    <div className="relative flex items-center justify-between w-full max-w-[260px] mx-auto my-4">
      {/* Linha conectora de fundo[cite: 2] */}
      <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded -z-0" />

      {ETAPAS.map((etapa, index) => {
        const jaPassouOuAtual = index <= currentIndex;

        return (
          <button
            key={etapa}
            type="button"
            onClick={() => navigate(ROTAS_ETAPAS[etapa])}
            className="relative z-10 focus:outline-none transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title={`Ir para etapa de ${etapa}`}
          >
            <IconeFormulario tipo={etapa} ativo={jaPassouOuAtual} />
          </button>
        );
      })}
    </div>
  );
}

export default StepperFormulario;
