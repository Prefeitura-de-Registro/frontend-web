import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { perguntasRevisao } from '../../data/perguntasRevisao';

type RespostasState = {
  respostas: Record<number, 'sim' | 'nao'>;
};

function Respostas() {
  const navigate = useNavigate();
  const location = useLocation();

  const { respostas } = (location.state as RespostasState) ?? {
    respostas: {},
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#DFE8F1] px-6 py-14">
      <header className="relative flex items-start">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0073A9] text-white shadow-md"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <h1 className="text-slate-900 ml-10 font-extrabold text-3xl sm:text-4xl leading-tight text-center">
          Formulário <span className="text-slate-900 font-normal">de</span>
          <br />
          <span className="text-[#0085C1] text-4xl">Respostas</span>
        </h1>
      </header>

      <section className="mt-10 space-y-9">
        {perguntasRevisao.map((pergunta, indice) => {
          const resposta = respostas[indice];

          return (
            <div key={indice} className="flex items-start gap-2">
              <span className="shrink-0 text-3xl font-extrabold leading-none text-[#0073A9]">
                {indice + 1})
              </span>

              <div className="flex min-w-0 flex-1 flex-col items-start">
                <p className="text-xl font-medium leading-tight text-slate-500">
                  {pergunta}
                </p>

                {resposta && (
                  <span
                    className={`mt-3 flex min-w-[112px] items-center justify-center rounded-xl px-5 py-2 text-base font-medium text-white shadow-md ${
                      resposta === 'sim' ? 'bg-[#20C997]' : 'bg-[#E51C16]'
                    }`}
                  >
                    {resposta === 'sim' ? 'Sim' : 'Não'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Respostas;
