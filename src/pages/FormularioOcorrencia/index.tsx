import { useOutletContext } from 'react-router-dom';
import { CategoriaCard } from '../../components/ui/CategoriaCard';
import { CarrosselPerguntas } from '../../components/ui/CarrosselPerguntas';
import type { FormularioContext } from '../../components/layouts/FormLayout';

export default function FormularioOcorrencia() {
  const { dados, setDados } = useOutletContext<FormularioContext>();

  return (
    <div className="h-full flex-1 bg-[#f8fafc] flex flex-col relative overflow-hidden w-full">
      <main className="px-4 pt-4 pb-6 flex-1 w-full max-w-md mx-auto overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-[#0085C1] font-bold text-lg mb-3">
            Qual é o problema?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <CategoriaCard
              tipo="buraco"
              isActive={Number(dados.categoria) === 1}
              onClick={() => setDados((prev) => ({ ...prev, categoria: 1 }))}
            />
            <CategoriaCard
              tipo="poda"
              isActive={Number(dados.categoria) === 2}
              onClick={() => setDados((prev) => ({ ...prev, categoria: 2 }))}
            />
            <CategoriaCard
              tipo="luz"
              isActive={Number(dados.categoria) === 3}
              onClick={() => setDados((prev) => ({ ...prev, categoria: 3 }))}
            />
            <CategoriaCard
              tipo="vazamento"
              isActive={Number(dados.categoria) === 4}
              onClick={() => setDados((prev) => ({ ...prev, categoria: 4 }))}
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
    </div>
  );
}
