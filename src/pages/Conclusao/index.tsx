import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Copy, CheckCheck } from 'lucide-react';
import { Footer } from '../../components/ui/Footer';
import { GradientHeader } from '../../components/ui/GradientHeader';
import ButtonLarger from '../../components/ui/ButtonLarger';

export function Conclusao() {
  const navigate = useNavigate();
  const [copiado, setCopiado] = useState(false);
  const protocolo = '#2026-00001';

  const handleCopiarProtocolo = () => {
    navigator.clipboard.writeText(protocolo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/80 px-6 pt-8 pb-4 overflow-x-hidden">
      {/* Topo */}
      <GradientHeader />

      {/* Corpo */}
      <main className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col items-center justify-center text-center my-auto py-6">
        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg mb-6 animate-bounce-short">
          <Check size={60} strokeWidth={3} strokeLinecap="square" />
        </div>

        <div className="mb-6 w-full">
          <h1 className="text-slate-800 text-2xl font-normal leading-tight">
            Chamado
          </h1>
          <h2 className="text-primary text-4xl font-extrabold tracking-tight leading-tight">
            Aberto!
          </h2>
          <div className="w-60 h-[1px] bg-primary mx-auto mt-2 opacity-50" />
        </div>

        <p className="text-slate-700 text-sm mb-6 max-w-xs leading-relaxed">
          Copie o{' '}
          <strong className="font-bold text-slate-900">
            Código do protocolo
          </strong>{' '}
          abaixo para pesquisar o chamado
        </p>

        <div className="w-full max-w-xs bg-slate-100/90 border border-slate-200 rounded-2xl p-3 flex items-center justify-between shadow-sm mb-2">
          <span className="font-mono font-bold text-slate-800 text-lg tracking-wider pl-2">
            {protocolo}
          </span>
          <button
            type="button"
            onClick={handleCopiarProtocolo}
            className="bg-sky-700 text-white p-2.5 rounded-xl shadow hover:bg-sky-800 transition flex items-center justify-center"
            title="Copiar protocolo"
          >
            {copiado ? <CheckCheck size={20} /> : <Copy size={20} />}
          </button>
        </div>

        <span
          className={`text-xs text-emerald-600 font-semibold mb-6 transition-opacity duration-200 ${copiado ? 'opacity-100' : 'opacity-0'}`}
        >
          Protocolo copiado com sucesso!
        </span>

        <p className="text-slate-600 text-xs mb-8 max-w-xs">
          Solicitação encaminhada para o{' '}
          <strong className="font-semibold text-slate-900">
            setor de infraestrutura
          </strong>
          .
        </p>

        <div className="w-full max-w-xs flex flex-col gap-3">
          <ButtonLarger onClick={() => navigate('/detalhes')}>
            Acompanhar chamado
          </ButtonLarger>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full bg-slate-100 border border-primary text-sky-700 font-bold py-3.5 px-6 shadow-sm hover:bg-slate-200 transition"
          >
            Voltar ao início
          </button>
        </div>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}

export default Conclusao;
