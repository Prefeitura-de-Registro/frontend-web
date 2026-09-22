import iconeNotificacoes from '../../assets/icone-notificacoes.svg';

interface EmptyStateProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

export function EmptyState({
  title = 'Nada para mostrar',
  description = 'Volte mais tarde para novas atualizações.',
  imageSrc = iconeNotificacoes,
}: EmptyStateProps) {
  return (
    <div className="bg-secondary rounded-2xl p-6 flex flex-col items-center text-center space-y-4 w-77.5">
      <img
        src={imageSrc}
        alt="Estado vazio"
        className="w-28 h-28 object-contain"
      />
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-primary">{title}</h3>
        <p className="text-xs text-primary/70 leading-relaxed max-w-50 mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
