export type StatusChamado = 'aberto' | 'andamento' | 'urgente';

interface StatusDotProps {
  status: StatusChamado;
  label?: boolean;
}

/**
 * Indicador de estado do chamado (bolinha colorida).
 * Specs do diagrama: elipse 11x11, spacing 6.
 * Estados: Aberto, Andamento, Urgente.
 */
const STATUS_CONFIG: Record<StatusChamado, { color: string; texto: string }> = {
  aberto: { color: 'bg-emerald-500', texto: 'Aberto' },
  andamento: { color: 'bg-amber-500', texto: 'Em andamento' },
  urgente: { color: 'bg-danger', texto: 'Urgente' },
};

function StatusDot({ status, label = true }: StatusDotProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-[11px] h-[11px] rounded-full ${config.color}`} />
      {label && <span className="text-xs text-slate-600">{config.texto}</span>}
    </span>
  );
}

export default StatusDot;
