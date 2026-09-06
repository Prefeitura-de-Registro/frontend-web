import IconeFormulario, { type TipoIconeFormulario } from './IconeFormulario';

interface StepperFormularioProps {
  etapaAtual: TipoIconeFormulario;
}

/**
 * Fileira de ícones do topo do formulário, indicando a etapa atual.
 * A ordem segue o fluxo do formulário: Ocorrência -> Endereço -> Fotos.
 */
const ETAPAS: TipoIconeFormulario[] = ['ocorrencia', 'endereco', 'fotos'];

function StepperFormulario({ etapaAtual }: StepperFormularioProps) {
  return (
    <div className="relative flex items-center gap-3">
      {/* Linha conectora, atrás dos ícones */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#BDD8E8] -z-10" />

      {ETAPAS.map((etapa) => (
        <IconeFormulario
          key={etapa}
          tipo={etapa}
          ativo={etapa === etapaAtual}
        />
      ))}
    </div>
  );
}

export default StepperFormulario;
