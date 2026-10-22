import BotaoNotificacao from './BotaoNotificacao';
import SearchInput from './SearchInput';

interface NavbarServidorProps {
  nomeUsuario: string;
  avatarSrc?: string;
  temNotificacaoNova?: boolean;
  onClickNotificacao?: () => void;
  busca?: string;
  onBuscaChange?: (valor: string) => void;
}

function formatarDataHoje() {
  return new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function NavbarServidor({
  nomeUsuario,
  avatarSrc,
  temNotificacaoNova = false,
  onClickNotificacao,
  busca,
  onBuscaChange,
}: NavbarServidorProps) {
  return (
    <header className="flex shrink-0 items-center justify-between gap-6 bg-secondary px-10 py-3">
      <div className="flex items-center gap-4">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={nomeUsuario}
            className="h-16 w-16 rounded-full border-[3px] border-primary object-cover shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-primary bg-tertiary text-2xl font-bold text-primary shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            {nomeUsuario.charAt(0).toUpperCase()}
          </span>
        )}

        <div>
          <p className="text-2xl font-bold text-primary">Olá, {nomeUsuario}!</p>
          <p className="text-lg text-black">{formatarDataHoje()}</p>
        </div>
      </div>

      <SearchInput
        placeholder="Pesquisar"
        wrapperClassName="rounded-full max-w-[520px] h-12 shadow-sm"
        value={busca}
        onChange={
          onBuscaChange ? (e) => onBuscaChange(e.target.value) : undefined
        }
      />

      <BotaoNotificacao
        temNotificacaoNova={temNotificacaoNova}
        onClick={onClickNotificacao}
      />
    </header>
  );
}

export default NavbarServidor;
