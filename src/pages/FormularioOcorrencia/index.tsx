import { useOutletContext, useNavigate } from 'react-router-dom';
import { CategoriaCard } from '../../components/ui/CategoriaCard';
import { CarrosselPerguntas } from '../../components/ui/CarrosselPerguntas';
import type { FormularioContext } from '../../components/layouts/FormLayout';

export default function OqueTaRolando() {
  const navigate = useNavigate();
  const { dados, setDados } = useOutletContext<FormularioContext>();

  const handleProximo = () => {
    if (!dados.categoria) return;
    navigate('/formulario/endereco');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between relative overflow-hidden">
      <main className="px-4 pt-8 pb-32 flex-1 max-w-md mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-[#0085C1] font-bold text-lg mb-3">
            Qual é o problema?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <CategoriaCard
              tipo="buraco"
              isActive={dados.categoria === 'buraco'}
              onClick={() =>
                setDados((prev) => ({ ...prev, categoria: 'buraco' }))
              }
            />
            <CategoriaCard
              tipo="poda"
              isActive={dados.categoria === 'poda'}
              onClick={() =>
                setDados((prev) => ({ ...prev, categoria: 'poda' }))
              }
            />
            <CategoriaCard
              tipo="luz"
              isActive={dados.categoria === 'luz'}
              onClick={() =>
                setDados((prev) => ({ ...prev, categoria: 'luz' }))
              }
            />
            <CategoriaCard
              tipo="vazamento"
              isActive={dados.categoria === 'vazamento'}
              onClick={() =>
                setDados((prev) => ({ ...prev, categoria: 'vazamento' }))
              }
            />
          </div>
        </div>

        <div>
          <h2 className="text-[#0085C1] font-bold text-lg mb-3">
            Conta os detalhes:
          </h2>
          <textarea
            value={dados.detalhes}
            onChange={(e) =>
              setDados((prev) => ({ ...prev, detalhes: e.target.value }))
            }
            placeholder="Descreva o problema aqui..."
            rows={4}
            className="w-full bg-[#f1f5f9] rounded-2xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0085C1] resize-none border-none"
          />
        </div>

        <CarrosselPerguntas
          categoria={dados.categoria}
          onRespostaChange={(respostas) =>
            setDados((prev) => ({ ...prev, respostasCarrossel: respostas }))
          }
        />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-[#0085C1] rounded-t-3xl pt-2 pb-6 px-6 z-20 max-w-md mx-auto shadow-lg">
        <button
          type="button"
          onClick={handleProximo}
          disabled={!dados.categoria}
          className="w-full py-3.5 mt-2 bg-white text-[#0085C1] font-bold text-base rounded-2xl shadow-md transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
