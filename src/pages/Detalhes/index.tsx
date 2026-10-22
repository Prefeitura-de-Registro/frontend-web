import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

import buraco from '../../assets/img/buraco.png';
import emAndamento from '../../assets/img/emAndamento.png';
import anexo1 from '../../assets/img/anexo-1.png';
import anexo2 from '../../assets/img/anexo-2.png';
import anexo3 from '../../assets/img/anexo-3.png';

import StatusDot from '../../components/ui/StatusDot';

const chamado = {
  tipo: 'Buraco',
  protocolo: '#2026-00001',
  criadoEm: '28/08/2026',
  detalhes: 'Buraco grande, oferecendo riscos de quedas.',
};

const anexos = [anexo1, anexo2, anexo3];

const perguntasRespostas = [
  {
    pergunta: 'O buraco é grande?',
    resposta: 'Sim',
  },
  {
    pergunta: 'Cabe uma roda inteira dentro?',
    resposta: 'Sim',
  },
  {
    pergunta: 'Dá para ver bem à noite ou o local é escuro?',
    resposta: 'Não',
  },
  {
    pergunta: 'Tá aumentando de tamanho com a chuva?',
    resposta: 'Sim',
  },
  {
    pergunta: 'Tá muito perigoso para quem passa?',
    resposta: 'Sim',
  },
];

export function DetalhesChamado() {
  const navigate = useNavigate();
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  return (
    <main className="min-h-screen bg-[#F2F2F2] py-10">
      <header className="relative flex items-start justify-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
          className="absolute left-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#0073A9] text-white shadow-md"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <h1 className="text-center text-3xl leading-tight font-extrabold text-slate-900">
          Detalhes <span className="font-normal">do</span>
          <br />
          <span className="text-4xl text-[#0073A9]">Chamado</span>
        </h1>
      </header>

      <section className="mt-8 overflow-hidden rounded-t-none bg-[#0073A9] px-7 py-4 text-white">
        <h2 className="text-3xl font-bold">Andamento</h2>

        <div className="flex items-center justify-between gap-4">
          <div className="relative flex flex-col gap-5">
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/50" />

            <div className="relative flex items-center gap-3">
              <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                <Check className="h-3 w-3 text-[#0073A9]" />
              </span>
              <span>Solicitação recebida</span>
            </div>

            <div className="relative flex items-center gap-3">
              <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white">
                <Check className="h-3 w-3 text-[#0073A9]" />
              </span>
              <span>Solicitação aberta</span>
            </div>

            <div className="relative flex items-center gap-3">
              <span className="relative z-10 h-4 w-4 rounded-full border-2 border-white bg-[#0073A9]" />
              <span>Em andamento</span>
            </div>

            <div className="relative flex items-center gap-3">
              <span className="relative z-10 h-4 w-4 rounded-full border-2 border-white bg-[#0073A9]" />
              <span>Concluído</span>
            </div>
          </div>

          <img
            src={emAndamento}
            alt="Ilustração do andamento do chamado"
            className="w-46 shrink-0 object-contain"
          />
        </div>
      </section>
      <section className="mt-3 px-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0073A9]">
              {chamado.tipo}
            </h2>

            <div className="relative mt-1 flex h-6 w-40 rounded-md bg-[#DFE8F1] items-center justify-between pl-3 pr-0">
              <span className="text-sm m-2 font-medium">
                {chamado.protocolo}
              </span>

              <button
                type="button"
                aria-label="Copiar protocolo"
                onClick={() => navigator.clipboard.writeText(chamado.protocolo)}
                className="absolute right-0 top-0 bottom-0 flex w-10 items-center justify-center bg-[#0073A9] text-white rounded-r-md"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <img
            src={buraco}
            alt="Ilustração de buraco"
            className="w-48 object-contain"
          />
        </div>

        <div className="mt-2 space-y-3 text-sm">
          <p className="text-slate-700">
            <strong className="text-[#0073A9]">Criado em:</strong>{' '}
            {chamado.criadoEm}
          </p>

          <p className="flex items-center gap-2 text-slate-700">
            <strong className="text-[#0073A9]">Status:</strong>
            <StatusDot status="aberto" />
          </p>
        </div>

        <div className="mt-3">
          <h3 className="mb-2 font-bold text-[#0073A9]">Detalhes:</h3>

          <div className="rounded-xl border-1 border-[#E5E7EB] bg-[#F9FAFB] px-4 py-20 text-base leading-relaxed items-start pt-2 text-slate-600 ">
            {chamado.detalhes}
          </div>
        </div>
      </section>

      <section className="px-5 mt-7">
        <h2 className="text-xl font-bold text-[#0073A9]">
          Arquivos anexados ({anexos.length})
        </h2>

        <div className="mt-3 rounded-2xl bg-white px-5 py-4 shadow-xl">
          <div className="mt-1 grid grid-cols-3 gap-3">
            {anexos.map((anexo, indice) => (
              <img
                key={anexo}
                src={anexo}
                alt={`Arquivo anexado ${indice + 1}`}
                className="aspect-square w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-xl font-bold text-[#0073A9]">
          Perguntas e respostas
        </h2>

        <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex h-40">
            <button
              type="button"
              aria-label="Pergunta anterior"
              onClick={() =>
                setPerguntaAtual((prev) =>
                  prev === 0 ? perguntasRespostas.length - 1 : prev - 1,
                )
              }
              className="flex w-9 shrink-0 items-center justify-center bg-[#0073A9] text-white"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
              <p className="text-xl font-semibold text-[#0073A9]">
                {perguntasRespostas[perguntaAtual].pergunta}
              </p>

              <span
                className={`mt-4 rounded-xl px-12 py-2 text-base font-medium text-white ${
                  perguntasRespostas[perguntaAtual].resposta === 'Sim'
                    ? 'bg-[#20C997]'
                    : 'bg-[#D92117]'
                }`}
              >
                {perguntasRespostas[perguntaAtual].resposta}
              </span>
            </div>

            <button
              type="button"
              aria-label="Próxima pergunta"
              onClick={() =>
                setPerguntaAtual((prev) =>
                  prev === perguntasRespostas.length - 1 ? 0 : prev + 1,
                )
              }
              className="flex w-9 shrink-0 items-center justify-center bg-[#0073A9] text-white"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {perguntasRespostas.map((_, indice) => (
            <span
              key={indice}
              className={`h-2.5 w-2.5 rounded-full ${
                indice === perguntaAtual ? 'bg-[#0073A9]' : 'bg-white'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate('/respostas')}
          className="mx-auto mt-4 flex h-12 w-85 items-center justify-center gap-2 rounded-xl bg-[#0073A9] text-lg font-medium text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-2xl leading-none text-[#0073A9]">
            +
          </span>
          Ver todas as respostas
        </button>
      </section>
    </main>
  );
}

export default DetalhesChamado;
