// src/components/layouts/FormLayout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Footer } from '../ui/Footer';
import { ChevronLeft } from 'lucide-react';
import { GradientHeader } from '../ui/GradientHeader';
import StepperFormulario from '../ui/StepperFormulario';
import type { TipoIconeFormulario } from '../ui/IconeFormulario';

export function FormLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRevisao = location.pathname.includes('revisao');

  // deriva a etapa ativa a partir da rota, mesmo padrão do isRevisao
  const etapaAtual: TipoIconeFormulario | null = location.pathname.includes(
    'endereco',
  )
    ? 'endereco'
    : location.pathname.includes('fotos')
      ? 'fotos'
      : location.pathname.includes('ocorrencia')
        ? 'ocorrencia'
        : null;

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/80 px-6 pt-10 pb-4 overflow-x-hidden">
      <GradientHeader />

      <header className="relative z-10 flex flex-col items-center gap-4 mb-8 w-full max-w-md mx-auto">
        <div className="relative flex items-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 bg-sky-700 text-white p-2 rounded-full shadow-md hover:bg-sky-800 transition z-10"
          >
            <ChevronLeft size={26} strokeWidth={3} />
          </button>
          <div className="flex flex-col w-full items-center py-2">
            {isRevisao ? (
              <h1 className="text-sky-900 font-extrabold text-2xl leading-tight">
                Revisão
              </h1>
            ) : (
              <>
                <span className="text-slate-700 text-base font-medium leading-tight">
                  Preencha o
                </span>
                <h1 className="text-sky-900 font-extrabold text-2xl leading-tight">
                  Formulário
                </h1>
              </>
            )}
          </div>
        </div>

        {/* Stepper só aparece nas 3 etapas de preenchimento, some na Revisão */}
        {etapaAtual && <StepperFormulario etapaAtual={etapaAtual} />}
      </header>

      <main className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
