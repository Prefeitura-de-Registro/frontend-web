import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SimNaoButton } from './SimNaoButton';

export type TipoCategoria = 'buraco' | 'luz' | 'poda' | 'vazamento';

interface CarrosselPerguntasProps {
  categoria: TipoCategoria | null;
  onRespostaChange?: (respostas: Record<string, 'sim' | 'nao'>) => void;
}

const PERGUNTAS_POR_CATEGORIA: Record<TipoCategoria, string[]> = {
  buraco: [
    'O buraco é grande?',
    'Cabe uma roda inteira dentro?',
    'Dá pra ver bem à noite ou o local é escuro?',
  ],
  luz: [
    'A lâmpada está apagada à noite?',
    'A lâmpada fica acesa de dia?',
    'O poste está danificado?',
  ],
  poda: [
    'Os galhos encostam nos fios elétricos?',
    'A árvore está com risco de queda?',
    'Bloqueia a passagem de pedestres?',
  ],
  vazamento: [
    'O vazamento é de água limpa?',
    'É na rua ou na calçada?',
    'O fluxo de água é alto?',
  ],
};

export function CarrosselPerguntas({
  categoria,
  onRespostaChange,
}: CarrosselPerguntasProps) {
  const [prevCategoria, setPrevCategoria] = useState<TipoCategoria | null>(
    categoria,
  );
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, 'sim' | 'nao'>>({});

  if (categoria !== prevCategoria) {
    setPrevCategoria(categoria);
    setIndexAtual(0);
    setRespostas({});
  }

  if (!categoria) return null;

  const perguntas = PERGUNTAS_POR_CATEGORIA[categoria] || [];
  const perguntaAtual = perguntas[indexAtual];
  const respostaSelecionada = respostas[perguntaAtual];

  const handleResposta = (valor: 'sim' | 'nao') => {
    const novasRespostas = {
      ...respostas,
      [perguntaAtual]: valor,
    };
    setRespostas(novasRespostas);

    if (onRespostaChange) {
      onRespostaChange(novasRespostas);
    }

    if (indexAtual < perguntas.length - 1) {
      setIndexAtual((prev) => prev + 1);
    }
  };

  const anterior = () => {
    if (indexAtual > 0) setIndexAtual((prev) => prev - 1);
  };

  const proximo = () => {
    if (indexAtual < perguntas.length - 1) setIndexAtual((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col items-center my-3">
      {/* Card Principal */}
      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex items-stretch min-h-[120px] relative">
        {/* Seta Esquerda */}
        <button
          type="button"
          onClick={anterior}
          disabled={indexAtual === 0}
          className="bg-[#0085C1] w-10 flex items-center justify-center text-white disabled:opacity-30 transition-opacity active:bg-[#0073a9] shrink-0"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Pergunta + Botões */}
        <div className="flex-1 px-3 py-3.5 flex flex-col justify-between items-center text-center overflow-hidden">
          <h3 className="text-[#0085C1] font-bold text-sm sm:text-base leading-tight mb-2">
            {perguntaAtual}
          </h3>

          <div className="flex gap-2 w-full max-w-[220px] justify-center">
            <SimNaoButton
              tipo="sim"
              variante={respostaSelecionada === 'sim' ? 'solid' : 'outline'}
              onClick={() => handleResposta('sim')}
              className="w-1/2 !min-w-0 !px-0 !py-1.5 text-xs sm:text-sm"
            />

            <SimNaoButton
              tipo="nao"
              variante={respostaSelecionada === 'nao' ? 'solid' : 'outline'}
              onClick={() => handleResposta('nao')}
              className="w-1/2 !min-w-0 !px-0 !py-1.5 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Seta Direita */}
        <button
          type="button"
          onClick={proximo}
          disabled={indexAtual === perguntas.length - 1}
          className="bg-[#0085C1] w-10 flex items-center justify-center text-white disabled:opacity-30 transition-opacity active:bg-[#0073a9] shrink-0"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Paginação */}
      <div className="flex gap-2 mt-2.5 justify-center items-center">
        {perguntas.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setIndexAtual(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === indexAtual
                ? 'w-2.5 h-2.5 bg-[#0085C1]'
                : 'w-2.5 h-2.5 bg-white border border-slate-300'
            }`}
            aria-label={`Ir para pergunta ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default CarrosselPerguntas;
