import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function ChamadoAberto() {
  const navigate = useNavigate();
  const location = useLocation();
  const [copiado, setCopiado] = useState(false);

  // Se vier protocolo pela navegação, usa ele; senão usa um mock
  const protocolo: string = location.state?.protocolo ?? '#2026-00001';

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(protocolo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="relative h-screen overflow-hidden flex flex-col">
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-28 h-28 rounded-full bg-success flex items-center justify-center shadow-lg">
          <Check className="w-16 h-16 text-white" strokeWidth={3} />
        </div>

        <h1 className="mt-6 text-center text-2xl">
          <span className="text-black">Chamado</span>
          <br />
          <span className="font-bold text-primary text-6xl">Aberto!</span>
        </h1>

        <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 my-4" />

        <p className="text-center text-sm text-gray-800 max-w-xs">
          Copie o <b>Código do protocolo</b> abaixo para pesquisar o chamado
        </p>

        <div className="mt-8 flex w-full max-w-xs overflow-hidden rounded-lg">
          <span className="flex-1 bg-tertiary py-2 text-center text-2xl text-black">
            {protocolo}
          </span>
          <button
            type="button"
            onClick={handleCopiar}
            aria-label="Copiar protocolo"
            className="flex w-12 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90"
          >
            {copiado ? (
              <Check className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </button>
        </div>

        {copiado && (
          <p className="mt-1 text-xs text-primary">Protocolo copiado!</p>
        )}

        <p className="mt-3 text-center text-sm text-gray-800">
          Solicitação encaminhada para o
          <br />
          <b>setor de infraestrutura</b>.
        </p>

        <button
          type="button"
          onClick={() => navigate('/chamados')}
          className="mt-8 h-14 w-full max-w-sm rounded-2xl bg-primary text-lg text-white transition-colors hover:bg-primary/90"
        >
          Acompanhar chamado
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-3 h-12 w-full max-w-sm rounded-lg border border-primary bg-tertiary text-lg text-primary transition-colors hover:bg-tertiary/70"
        >
          Voltar ao início
        </button>
      </main>
    </div>
  );
}

export default ChamadoAberto;
