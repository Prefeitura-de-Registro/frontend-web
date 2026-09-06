interface CardChamadoMunicipeProps {
  categoria: string;
  numero: string;
  status: string;
  endereco: string;
  data: string;
  onClick?: () => void;
}

/**
 * Card de chamado exibido para o munícipe (Home com chamados listados).
 * Layout: título da categoria + número do chamado à esquerda, status com
 * bolinha à direita; embaixo, endereço (com ícone de pin) à esquerda e
 * data à direita. Borda esquerda em destaque na cor primária.
 */
function CardChamadoMunicipe({
  categoria,
  numero,
  status,
  endereco,
  data,
  onClick,
}: CardChamadoMunicipeProps) {
  return (
    <button
      onClick={onClick}
      className="w-full max-w-md flex flex-col gap-3 p-4 bg-secondary rounded-xl border-l-4 border-primary text-left"
    >
      {/* Linha 1: categoria + status */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-bold text-primary leading-tight">
            {categoria}
          </p>
          <p className="text-sm text-slate-800">#{numero}</p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-sm text-slate-600">{status}</span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        </div>
      </div>

      {/* Linha 2: endereço + data */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <svg
            className="w-4 h-4 text-primary shrink-0"
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
