import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import buraco from '../../assets/img/buraco.png';
import { SimNaoButton } from '../../components/ui/SimNaoButton';
import { perguntasRevisao } from '../../data/perguntasRevisao';

const ocorrencia = {
  tipo: 'Buraco',
  detalhes: 'Buraco grande, oferecendo riscos de quedas.',
};

function Revisao() {
  const navigate = useNavigate();

  const [paginaPergunta, setPaginaPergunta] = useState(0);

  const [respostas, setRespostas] = useState<Record<number, 'sim' | 'nao'>>({});

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
    <div className="relative left-1/2 w-screen -translate-x-1/2 flex flex-col gap-7 px-6">
      <section className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="flex h-7 items-center justify-center bg-[#20C997]">
          <h2 className="text-xl font-bold text-white">Ocorrência</h2>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-bold text-[#0073A9]">Tipo:</p>
              <p className="text-lg text-slate-600">{ocorrencia.tipo}</p>
            </div>

            <img
              src={buraco}
              alt="Buraco ilustrativo"
              className="w-50 object-contain"
            />
          </div>

          <div className="mt-1">
            <p className="mb-2 text-xl font-bold text-[#0073A9]">Detalhes:</p>

            <div className="min-h-24 rounded-lg border border-slate-200 bg-[#F2F2F2] px-4 py-3 text-base leading-snug text-slate-500">
              {ocorrencia.detalhes}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
        <div className="absolute left-0 top-0 flex h-full w-7 items-center justify-center bg-[#0073A9]">
          <button
            type="button"
            onClick={irParaAnterior}
            aria-label="Pergunta anterior"
            className="relative z-10 flex h-full w-full items-center justify-center text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute right-0 top-0 flex h-full w-7 items-center justify-center  bg-[#0073A9]">
          <button
            type="button"
            onClick={irParaProxima}
            aria-label="Próxima pergunta"
            className="relative z-10 flex h-full w-full items-center justify-center text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="px-10 py-7">
          <h2 className="flex min-h-10 items-center justify-center text-center text-xl font-bold leading-snug text-[#0073A9]">
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

      <button
        type="button"
        onClick={() =>
          navigate('/respostas', {
            state: { respostas },
          })
        }
        className="mx-auto flex items-center gap-3 rounded-lg bg-[#0073A9] px-14 py-3 text-lg font-bold text-white"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Plus className="h-5 w-5 text-[#0073A9]" />
        </span>
        Ver todas as respostas
      </button>
    </div>
  );
}

export default Revisao;
