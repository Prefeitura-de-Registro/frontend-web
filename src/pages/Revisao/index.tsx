import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

import buraco from '../../assets/img/buraco.png';
import { SimNaoButton } from '../../components/ui/SimNaoButton';
import { perguntasRevisao } from '../../data/perguntasRevisao';

const ocorrencia = {
  tipo: 'Buraco',
  detalhes: 'Buraco grande, oferecendo riscos de quedas.',
};

function Revisao() {
  const [paginaPergunta, setPaginaPergunta] = useState(0);

  const [, setRespostas] = useState<Record<number, 'sim' | 'nao'>>({});

  const perguntaAtual = perguntasRevisao[paginaPergunta];

  const irParaAnterior = () => {
    setPaginaPergunta((paginaAtual) =>
      paginaAtual === 0 ? perguntasRevisao.length - 1 : paginaAtual - 1,
    );
  };

  const irParaProxima = () => {
    setPaginaPergunta((paginaAtual) =>
      paginaAtual === perguntasRevisao.length - 1 ? 0 : paginaAtual + 1,
    );
  };

  const responder = (resposta: 'sim' | 'nao') => {
    setRespostas((respostasAtuais) => ({
      ...respostasAtuais,
      [paginaPergunta]: resposta,
    }));

    irParaProxima();
  };

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 flex flex-col gap-4 px-6">
      {/* Resumo da ocorrência */}
      <section className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex h-7 items-center justify-center bg-[#20C997]">
          <h2 className="text-sm font-bold text-white">Ocorrência</h2>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-bold text-[#0073A9]">Tipo:</p>
              <p className="text-base text-slate-600">{ocorrencia.tipo}</p>
            </div>

            <img
              src={buraco}
              alt="Imagem da ocorrência"
              className="h-16 w-36 object-contain"
            />
          </div>

          <div className="mt-4">
            <p className="mb-2 text-base font-bold text-[#0073A9]">Detalhes:</p>

            <div className="min-h-24 rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-sm leading-snug text-slate-500">
              {ocorrencia.detalhes}
            </div>
          </div>
        </div>
      </section>

      {/* Pergunta */}
      <section className="relative w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
        {/* Seta esquerda */}
        <div className="absolute left-0 top-0 flex h-full w-6 items-center justify-center bg-[#0073A9]">
          <button
            type="button"
            onClick={irParaAnterior}
            aria-label="Pergunta anterior"
            className="text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Seta direita */}
        <div className="absolute right-0 top-0 flex h-full w-6 items-center justify-center bg-[#0073A9]">
          <button
            type="button"
            onClick={irParaProxima}
            aria-label="Próxima pergunta"
            className="text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="px-10 py-5">
          <h2 className="flex min-h-10 items-center justify-center text-center text-base font-bold leading-snug text-[#0073A9]">
            {perguntaAtual}
          </h2>

          <div className="mt-4 flex gap-3">
            <SimNaoButton
              tipo="sim"
              variante="outline"
              onClick={() => responder('sim')}
            />

            <SimNaoButton
              tipo="nao"
              variante="solid"
              onClick={() => responder('nao')}
            />
          </div>

          {/* Indicadores */}
          <div className="mt-4 flex justify-center gap-1.5">
            {perguntasRevisao.map((_, indice) => (
              <span
                key={indice}
                className={`h-2 w-2 rounded-full ${
                  paginaPergunta === indice ? 'bg-[#0073A9]' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ver todas as respostas */}
      <button
        type="button"
        className="mx-auto flex items-center gap-2 rounded-lg bg-[#0073A9] px-4 py-2 text-sm font-bold text-white"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
          <Plus className="h-3.5 w-3.5 text-[#0073A9]" />
        </span>
        Ver todas as respostas
      </button>
    </div>
  );
}

export default Revisao;
