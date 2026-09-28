import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import ButtonBack from '../../components/ui/ButtonBack';
import { CategoriaCard } from '../../components/ui/CategoriaCard';
// import { StepperFormulario } from '../../components/ui/StepperFormulario';
import { CarrosselPerguntas } from '../../components/ui/CarrosselPerguntas';

// Tipo definido direto aqui para não precisar alterar o CategoriaCard.tsx
type TipoCategoria = 'buraco' | 'luz' | 'poda' | 'vazamento';

export default function OqueTaRolando() {
  const navigate = useNavigate();

  const [categoriaAtiva, setCategoriaAtiva] = useState<TipoCategoria | null>(
    null,
  );
  const [detalhes, setDetalhes] = useState('');
  const [respostasCarrossel, setRespostasCarrossel] = useState<
    Record<string, 'sim' | 'nao'>
  >({});

  const handleProximo = () => {
    if (!categoriaAtiva) return;

    navigate('/formulario/endereco', {
      state: {
        categoria: categoriaAtiva,
        detalhes: detalhes.trim(),
        respostasCarrossel, // <--- Aqui o estado é utilizado!
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between relative overflow-hidden">
      {/* Conteúdo Principal */}
      <main className="px-4 pt-8 pb-32 flex-1 max-w-md mx-auto w-full">
        {/* Seção 1: Qual é o problema? */}
        <div className="mb-6">
          <h2 className="text-[#0085C1] font-bold text-lg mb-3">
            Qual é o problema?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <CategoriaCard
              tipo="buraco"
              isActive={categoriaAtiva === 'buraco'}
              onClick={() => setCategoriaAtiva('buraco')}
            />
            <CategoriaCard
              tipo="poda"
              isActive={categoriaAtiva === 'poda'}
              onClick={() => setCategoriaAtiva('poda')}
            />
            <CategoriaCard
              tipo="luz"
              isActive={categoriaAtiva === 'luz'}
              onClick={() => setCategoriaAtiva('luz')}
            />
            <CategoriaCard
              tipo="vazamento"
              isActive={categoriaAtiva === 'vazamento'}
              onClick={() => setCategoriaAtiva('vazamento')}
            />
          </div>
        </div>

        {/* Seção 2: Conta os detalhes */}
        <div>
          <h2 className="text-[#0085C1] font-bold text-lg mb-3">
            Conta os detalhes:
          </h2>

          <textarea
            value={detalhes}
            onChange={(e) => setDetalhes(e.target.value)}
            placeholder="Descreva o problema aqui..."
            rows={4}
            className="w-full bg-[#f1f5f9] rounded-2xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085C1] resize-none border-none"
          />
        </div>

        <CarrosselPerguntas
          categoria={categoriaAtiva}
          onRespostaChange={(respostas) => setRespostasCarrossel(respostas)}
        />
      </main>

      {/* Container Fixo Inferior (Stepper + Botão Próximo) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0085C1] rounded-t-3xl pt-2 pb-6 px-6 z-20 max-w-md mx-auto shadow-lg">
        {/* <StepperFormulario etapaAtual="ocorrencia" /> */}

        <button
          type="button"
          onClick={handleProximo}
          disabled={!categoriaAtiva}
          className="w-full py-3.5 mt-2 bg-white text-[#0085C1] font-bold text-base rounded-2xl shadow-md transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
