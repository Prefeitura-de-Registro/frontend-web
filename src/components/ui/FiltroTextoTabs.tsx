interface FiltroOpcao {
  label: string;
  value: string;
}

interface FiltroTextoTabsProps {
  opcoes: FiltroOpcao[];
  ativo: string;
  onChange: (value: string) => void;
}

/**
 * Filtro em formato de texto separado por barras verticais (não é chip/pílula).
 * Specs do Figma: opção ativa em negrito na cor primary (#0073A9),
 * inativas em slate-700 peso normal, separador "|" em cinza claro.
 */
function FiltroTextoTabs({ opcoes, ativo, onChange }: FiltroTextoTabsProps) {
  return (
    <div className="flex items-center gap-3 text-base overflow-x-auto">
      {opcoes.map((opcao, index) => (
        <div key={opcao.value} className="flex items-center gap-3 shrink-0">
          {index > 0 && <span className="text-slate-300">|</span>}
          <button
            onClick={() => onChange(opcao.value)}
            className={
              opcao.value === ativo
                ? 'font-bold text-primary'
                : 'font-normal text-slate-700 hover:text-slate-900'
            }
          >
            {opcao.label}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FiltroTextoTabs;
