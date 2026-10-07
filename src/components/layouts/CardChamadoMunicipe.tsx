interface CardChamadoMunicipeProps {
  categoria: string;
  numero: string;
  status: 'aberto' | 'em andamento' | 'concluído';
  endereco: string;
  data: string;
  onClick?: () => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; cor: string; bordaCor: string; iconeCor: string }
> = {
  concluído: {
    label: 'Fechado',
    cor: 'bg-success/15 text-success',
    bordaCor: 'border-l-success',
    iconeCor: 'text-success',
  },
  'em andamento': {
    label: 'Em andamento',
    cor: 'bg-info/15 text-info',
    bordaCor: 'border-l-info',
    iconeCor: 'text-info',
  },
  aberto: {
    label: 'Aberto',
    cor: 'bg-danger/15 text-danger',
    bordaCor: 'border-l-danger',
    iconeCor: 'text-danger',
  },
};

function CardChamadoMunicipe({
  categoria,
  numero,
  status,
  endereco,
  data,
  onClick,
}: CardChamadoMunicipeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG['aberto'];

  return (
    <button
      onClick={onClick}
      className={`w-full max-w-md flex flex-col gap-3 p-4 bg-secondary rounded-xl border-l-8 ${config.bordaCor} text-left`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-lg font-bold leading-tight ${config.iconeCor}`}>
            {categoria}
          </p>
          <p className="text-sm text-slate-800">#{numero}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${config.cor}`}
        >
          {config.label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <svg
            className={`w-4 h-4 shrink-0 ${config.iconeCor}`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span>{endereco}</span>
        </div>

        <span className="text-sm text-slate-500 shrink-0">{data}</span>
      </div>
    </button>
  );
}

export default CardChamadoMunicipe;
