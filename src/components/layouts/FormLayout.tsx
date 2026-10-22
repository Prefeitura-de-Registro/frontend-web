import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import StepperFormulario from '../ui/StepperFormulario';

import {
  recuperarFormulario,
  salvarFormulario,
} from '../../services/formulario-storage';

export interface CoordenadasFormulário {
  latitude: number;
  longitude: number;
}

export interface FotoFormulario {
  id: string;
  arquivo: File;
}

export interface DadosFormulario {
  categoria: number | null; // CORREÇÃO: Tipado corretamente como número
  detalhes: string;
  respostasCarrossel: Record<string, 'sim' | 'nao'>;
  endereco: string;
  coordenadas: CoordenadasFormulário | null;
  fotos: FotoFormulario[];
}

export interface FormularioContext {
  dados: DadosFormulario;
  setDados: React.Dispatch<React.SetStateAction<DadosFormulario>>;
}

export function FormLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [dados, setDados] = useState<DadosFormulario>({
    categoria: null,
    detalhes: '',
    respostasCarrossel: {},
    endereco: '',
    coordenadas: null,
    fotos: [],
  });

  const [carregandoRascunho, setCarregandoRascunho] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarRascunho() {
      try {
        const dadosSalvos = await recuperarFormulario<DadosFormulario>();

        if (ativo && dadosSalvos) {
          setDados(dadosSalvos);
        }
      } catch (erro) {
        console.error('Erro ao recuperar o rascunho do formulário:', erro);
      } finally {
        if (ativo) {
          setCarregandoRascunho(false);
        }
      }
    }

    void carregarRascunho();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (carregandoRascunho) return;

    void salvarFormulario(dados).catch((erro: unknown) => {
      console.error('Erro ao salvar o rascunho do formulário:', erro);
    });
  }, [dados, carregandoRascunho]);

  const isRevisao = location.pathname.includes('revisao');
  const isFotos = location.pathname.includes('fotos');
  const isEndereco = location.pathname.includes('endereco');

  const etapaAtual = isEndereco
    ? 'endereco'
    : isFotos || isRevisao
      ? 'fotos'
      : 'ocorrencia';

  const getTextoBotao = () => {
    if (isRevisao) return 'Abrir chamado';
    if (isFotos) return 'Revisão';
    return 'Próximo';
  };

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
    <div className="h-[100dvh] w-full flex flex-col bg-slate-50/85 overflow-hidden">
      <header className="shrink-0 relative z-10 flex flex-col items-center gap-3 px-6 pt-6 mb-2 w-full max-w-md mx-auto">
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

      <main className="flex-1 overflow-y-auto relative z-10 w-full max-w-md mx-auto px-6 pb-2 flex flex-col">
        {carregandoRascunho ? (
          <p className="py-8 text-center text-slate-600">
            A carregar formulário...
          </p>
        ) : (
          <Outlet context={{ dados, setDados } satisfies FormularioContext} />
        )}
      </main>

      <footer className="shrink-0 w-full bg-[#0085C1] rounded-t-3xl pt-2 pb-6 px-6 shadow-xl relative z-20">
        <div className="absolute top-10 -bottom-20 left-0 right-0 bg-[#0085C1] -z-10" />

        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-full flex justify-center mb-2">
            <StepperFormulario etapaAtual={etapaAtual} />
          </div>

          <Button
            variant={isRevisao ? 'solid' : 'outline'}
            fullWidth
            onClick={handleBotaoPrincipal}
            className={`py-3.5 text-lg shadow-md mb-2 ${
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
