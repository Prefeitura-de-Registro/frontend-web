import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  MapPin,
  UploadCloud,
  type LucideIcon,
} from 'lucide-react';

export type TipoIconeFormulario = 'ocorrencia' | 'endereco' | 'fotos';

interface StepperFormularioProps {
  etapaAtual: TipoIconeFormulario;
}

const ETAPAS: TipoIconeFormulario[] = ['ocorrencia', 'endereco', 'fotos'];

const ICONES: Record<TipoIconeFormulario, LucideIcon> = {
  ocorrencia: AlertTriangle,
  endereco: MapPin,
  fotos: UploadCloud,
};

const ROTAS_ETAPAS: Record<TipoIconeFormulario, string> = {
  ocorrencia: '/formulario/ocorrencia',
  endereco: '/formulario/endereco',
  fotos: '/formulario/fotos',
};

export function StepperFormulario({ etapaAtual }: StepperFormularioProps) {
  const navigate = useNavigate();
  const currentIndex = ETAPAS.indexOf(etapaAtual);

  return (
    <div className="relative flex items-center justify-between w-full max-w-[280px] mx-auto py-4 px-2">
      {/* Linha conectora posicionada perfeitamente entre as bordas dos círculos */}
      <div className="absolute top-1/2 left-[44px] right-[44px] h-[2px] bg-white/40 -translate-y-1/2 z-0" />

      {ETAPAS.map((etapa, index) => {
        const Icon = ICONES[etapa];
        const jaPassou = index < currentIndex;
        const ehAtual = index === currentIndex;
        const alcancavel = index <= currentIndex;

        return (
          <button
            key={etapa}
            type="button"
            onClick={() => {
              if (alcancavel) {
                navigate(ROTAS_ETAPAS[etapa]);
              }
            }}
            disabled={!alcancavel}
            className={`
              relative z-10 focus:outline-none transition-transform
              ${alcancavel ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-not-allowed opacity-60'}
            `}
            title={`Etapa ${etapa}`}
          >
            {ehAtual ? (
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
                <Icon size={24} className="text-[#0085C1]" strokeWidth={2.2} />
              </div>
            ) : jaPassou ? (
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300">
                <Icon size={22} className="text-[#0085C1]" strokeWidth={2.2} />
              </div>
            ) : (
              <div className="w-11 h-11 bg-[#0085C1] border-2 border-white/80 rounded-full flex items-center justify-center shadow-sm transition-all duration-300">
                <Icon size={20} className="text-white" strokeWidth={2} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default StepperFormulario;
