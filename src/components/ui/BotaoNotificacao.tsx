import { twMerge } from 'tailwind-merge';
import sino from '../../assets/sino.png';

interface BotaoNotificacaoProps {
  temNotificacaoNova?: boolean;
  onClick?: () => void;
  className?: string;
}

function BotaoNotificacao({
  temNotificacaoNova = false,
  onClick,
  className = '',
}: BotaoNotificacaoProps) {
  return (
    <button
      type="button"
      aria-label="Notificações"
      onClick={onClick}
      className={twMerge(
        'relative w-11 h-11 rounded-full bg-primary shadow-[0_5px_10px_rgba(0,0,0,0.25)] flex items-center justify-center',
        className,
      )}
    >
      <img src={sino} alt="" className="w-5 h-5 object-contain" />
      {temNotificacaoNova && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-danger" />
      )}
    </button>
  );
}

export default BotaoNotificacao;
