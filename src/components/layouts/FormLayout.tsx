// src/components/layouts/FormLayout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import StepperFormulario from '../ui/StepperFormulario';

export function FormLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isRevisao = location.pathname.includes('revisao');
  const isFotos = location.pathname.includes('fotos');
  const isEndereco = location.pathname.includes('endereco');

  // Identifica a etapa atual do formulário para o StepperFormulario
  const etapaAtual = isEndereco
    ? 'endereco'
    : isFotos || isRevisao
      ? 'fotos'
      : 'ocorrencia';

  // Define o texto do botão principal com base na rota atual
  const getTextoBotao = () => {
    if (isRevisao) return 'Abrir chamado';
    if (isFotos) return 'Revisão';
    return 'Próximo';
  };

  // Define a ação do botão principal de acordo com o fluxo do formulário
  const handleBotaoPrincipal = () => {
    if (isRevisao) {
      navigate('/conclusao');
    } else if (
      location.pathname.includes('ocorrencia') ||
      location.pathname === '/formulario' ||
      location.pathname === '/formulario/'
    ) {
      navigate('/formulario/endereco');
    } else if (isEndereco) {
      navigate('/formulario/fotos');
    } else if (isFotos) {
      navigate('/formulario/revisao');
    }
  };

  // Renderiza os títulos dinâmicos conforme cada tela
  const renderTitulos = () => {
    if (isRevisao) {
      return (
        <h1 className="text-slate-900 font-extrabold text-3xl sm:text-4xl leading-tight text-center">
          Está <span className="text-slate-900 font-normal">tudo</span>
          <br />
          <span className="text-[#0085C1]">Certo?</span>
        </h1>
      );
    }
    if (isEndereco) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-slate-900 text-xl sm:text-2xl font-bold tracking-tight">
            Onde <span className="font-normal">tá</span>
          </span>
          <h1 className="text-[#0085C1] font-extrabold text-3xl sm:text-4xl leading-tight">
            Rolando?
          </h1>
        </div>
      );
    }
    if (isFotos) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-slate-900 text-xl sm:text-2xl font-bold tracking-tight">
            Como <span className="font-normal">tá</span>
          </span>
          <h1 className="text-[#0085C1] font-extrabold text-3xl sm:text-4xl leading-tight">
            Rolando?
          </h1>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <span className="text-slate-900 text-xl sm:text-2xl font-bold tracking-tight">
          O que <span className="font-normal">tá</span>
        </span>
        <h1 className="text-[#0085C1] font-extrabold text-3xl sm:text-4xl leading-tight">
          Rolando?
        </h1>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50/85 overflow-x-hidden">
      <div>
        {/* Header com o seu componente Button (variant="icon") e títulos dinâmicos */}
        <header className="relative z-10 flex flex-col items-center gap-3 px-6 pt-6 mb-2 w-full max-w-md mx-auto">
          <div className="relative flex items-center w-full">
            <div className="absolute left-0 z-10">
              <Button
                variant="icon"
                icon={ChevronLeft}
                onClick={() => navigate(-1)}
                aria-label="Voltar"
              />
            </div>
            <div className="flex flex-col w-full items-center py-1">
              {renderTitulos()}
            </div>
          </div>
        </header>

        {/* Conteúdo Dinâmico das Telas do Formulário */}
        <main className="relative z-10 w-full max-w-md mx-auto px-6 pb-6 flex flex-col">
          <Outlet />
        </main>
      </div>

      {/* Rodapé Azul Fixo com o seu StepperFormulario e Botão */}
      <footer className="w-full bg-[#0085C1] rounded-t-3xl pt-2 pb-6 px-6 shadow-xl mt-auto">
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* O seu componente de Stepper do Formulário */}
          <div className="w-full flex justify-center mb-2">
            <StepperFormulario etapaAtual={etapaAtual} />
          </div>

          {/* Botão de Ação Principal utilizando o componente Button */}
          <Button
            variant={isRevisao ? 'solid' : 'outline'}
            fullWidth
            onClick={handleBotaoPrincipal}
            className={`py-3.25 text-lg shadow-md mb-2 ${
              isRevisao
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-white border-none'
                : 'bg-slate-100 hover:bg-white text-[#0073a9] border-none'
            }`}
          >
            {getTextoBotao()}
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default FormLayout;
