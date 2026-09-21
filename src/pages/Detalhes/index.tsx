import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Footer } from '../../components/ui/Footer';
import { GradientHeader } from '../../components/ui/GradientHeader';
import StatusDot from '../../components/ui/StatusDot';

export function DetalhesChamado() {
  const navigate = useNavigate();
  const [mostrarMais, setMostrarMais] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/80 px-6 pt-8 pb-4 overflow-x-hidden">
      {/* Topo decorativo com degradê */}
      <GradientHeader />

      {/* Header Centralizado com Botão Voltar */}
      <header className="relative z-10 flex items-center justify-center mb-2 w-full max-w-md mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 bg-sky-700 text-white p-2 rounded-full shadow-md hover:bg-sky-800 transition z-10"
        >
          <ChevronLeft size={26} strokeWidth={3} />
        </button>
        <div className="flex flex-col items-center text-center mt-4">
          <span className="text-xl font-medium leading-tight">Detalhes do</span>
          <h1 className="text-sky-900 font-bold text-4xl leading-tight">
            Chamado
          </h1>
        </div>
      </header>

      {/* Linha com degradê simétrico nas pontas */}
      <div className="relative z-10 w-83 max-w-xs mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#0073A9] to-transparent mb-4 opacity-40" />

      {/* Card Principal de Detalhes */}
      <main className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col">
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 shadow-md flex flex-col gap-4">
          {/* Título e Protocolo */}
          <div className="text-center">
            <h2 className="text-sky-800 font-semibold text-2xl">Buraco</h2>
            <div className="relative z-10 w-full max-w-xs mx-auto h-[2px] bg-gradient-to-r from-transparent via-[#0073A9] to-transparent opacity-40" />
            <p className="text-slate-600 text-sm font-medium">#2026-00001</p>
            <div className="w-full h-[1px] bg-slate-200/80 mt-3" />
          </div>

          {/* Informações do Chamado */}
          <div className="text-sm text-slate-700 flex flex-col gap-2.5">
            <p>
              <strong className="text-slate-900 font-semibold">
                Criado em:
              </strong>{' '}
              28/08/2026
            </p>

            <p className="flex items-center gap-2">
              <strong className="text-slate-900 font-semibold">Status:</strong>
              <StatusDot status="aberto" />
            </p>

            <p className="leading-relaxed">
              <strong className="text-slate-900 font-semibold">
                Descrição:
              </strong>{' '}
              Buraco grande, oferecendo riscos de quedas.
            </p>

            <p>
              <strong className="text-slate-900 font-semibold">Fotos:</strong>{' '}
              <span className="text-sky-700 underline cursor-pointer hover:text-sky-800">
                imagem1.jpg, imagem2.jpg
              </span>
            </p>
          </div>

          {/* Botão "Mais detalhes" (Accordion interativo) */}
          <div>
            <button
              type="button"
              onClick={() => setMostrarMais(!mostrarMais)}
              className="flex items-center gap-2 border border-sky-700 text-sky-700 px-3.5 py-1.5 rounded-xl text-sm font-semibold hover:bg-sky-50 transition"
            >
              Mais detalhes
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${mostrarMais ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Seção de Status / Timeline */}
          <div className="mt-2 border-t border-slate-200/80">
            <h3 className="text-sky-900 font-extrabold text-xl mb-3">
              Status:
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              {/* Etapa 1: Concluída */}
              <div className="flex items-center gap-3 text-slate-800 font-medium">
                <CheckCircle2
                  size={18}
                  className="text-sky-700 fill-sky-100 flex-shrink-0"
                />
                <span>Solicitação recebida</span>
              </div>

              {/* Etapa 2: Concluída */}
              <div className="flex items-center gap-3 text-slate-800 font-medium">
                <CheckCircle2
                  size={18}
                  className="text-sky-700 fill-sky-100 flex-shrink-0"
                />
                <span>Solicitação aberta</span>
              </div>

              {/* Etapa 3: Pendente (Em atendimento) */}
              <div className="flex items-center gap-3 text-slate-400 font-normal">
                <div className="w-[18px] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                </div>
                <span>Em atendimento</span>
              </div>

              {/* Etapa 4: Pendente (Concluído) */}
              <div className="flex items-center gap-3 text-slate-400 font-normal">
                <div className="w-[18px] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                </div>
                <span>Concluído</span>
              </div>
            </div>
          </div>

          {/* Botão de Cancelar Chamado */}
          <div className="mt-4 pt-2">
            <button
              type="button"
              onClick={() =>
                alert('Tem certeza que deseja cancelar o chamado?')
              }
              className="w-full h-10 bg-danger text-white font-medium py-3.5 px-4 shadow-md hover:bg-red-700 transition justify-center items-center flex"
            >
              Cancelar chamado
            </button>
          </div>
        </div>
      </main>

      {/* Rodapé fixo */}
      <Footer />
    </div>
  );
}

export default DetalhesChamado;
