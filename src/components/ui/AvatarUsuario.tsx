import BotaoNotificacao from './BotaoNotificacao';

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

      <BotaoNotificacao
        temNotificacaoNova={temNotificacaoNova}
        onClick={onClickNotificacao}
      />
    </div>
  );
}

export default AvatarUsuario;
