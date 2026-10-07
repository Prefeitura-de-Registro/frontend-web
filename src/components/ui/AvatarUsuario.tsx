import { Bell } from 'lucide-react';

interface AvatarUsuarioProps {
  nomeUsuario: string;
  avatarSrc: string;
  temNotificacaoNova?: boolean;
  onClickNotificacao?: () => void;
}

function AvatarUsuario({
  nomeUsuario,
  avatarSrc,
  temNotificacaoNova = false,
  onClickNotificacao,
}: AvatarUsuarioProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <img
          src={avatarSrc}
          alt={nomeUsuario}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
        />
        <div>
          <p className="font-bold text-primary">Olá, {nomeUsuario}!</p>
          <p className="text-sm font-bold text-black">
            Como podemos ajudar hoje?
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Notificações"
        onClick={onClickNotificacao}
        className="relative w-11 h-11 rounded-full bg-primary shadow-[0_5px_10px_rgba(0,0,0,0.25)] flex items-center justify-center"
      >
        <Bell className="w-5 h-5 text-white" />
        {temNotificacaoNova && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-danger" />
        )}
      </button>
    </div>
  );
}

export default AvatarUsuario;
