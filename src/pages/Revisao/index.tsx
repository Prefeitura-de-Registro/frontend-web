import { useEffect, useState, type ReactNode } from 'react';
import {
  ClipboardPenLine,
  MapPin,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import type { FormularioContext } from '../../components/layouts/FormLayout';
import mapaLocalizacao from '../../assets/mapa-localizacao.png';

// --- Interface de Tipos ---
interface RevisionSectionProps {
  titulo: string;
  icon: ReactNode;
  children: ReactNode;
  onEditar: () => void;
  contentClassName?: string;
}

// --- Componentes Auxiliares ---
function AnexoPreview({ arquivo, alt }: { arquivo: File; alt: string }) {
interface FotoAnexo {
  id: string | number;
  arquivo: File;
}

// --- Mock de Dados (Ajuste conforme as perguntas reais do seu projeto) ---
const perguntasRevisao = [
  'Há risco imediato de acidentes?',
  'O problema está impedindo a passagem de pedestres?',
  'Já ocorreu algum acidente no local devido a este problema?',
];

// --- Componentes Auxiliares ---
export function AnexoPreview({ arquivo, alt }: { arquivo: File; alt: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const urlTemporaria = URL.createObjectURL(arquivo);

    const frameId = requestAnimationFrame(() => {
      setUrl(urlTemporaria);
    });

    return () => {
      cancelAnimationFrame(frameId);
      URL.revokeObjectURL(urlTemporaria);
    };
  }, [arquivo]);

  if (!url) return null;

  if (arquivo.type.startsWith('video/')) {
    return (
      <video
        src={url}
        aria-label={alt}
        className="h-full w-full object-cover"
        muted
      />
    );
  }

  return <img src={url} alt={alt} className="h-full w-full object-cover" />;
}

export function RevisionSection({
  titulo,
  icon,
  children,
  onEditar,
  contentClassName = '',
}: RevisionSectionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex h-11 items-center justify-center gap-2 border-b border-slate-100 bg-white">
        <div className="flex h-5 w-5 items-center justify-center text-sky-700">
          {icon}
        </div>
        <h2 className="text-base font-bold text-sky-900">{titulo}</h2>
      </div>

      {/* Conteúdo dinâmico da seção */}
      <div className={contentClassName}>{children}</div>

      <button
        type="button"
        onClick={onEditar}
        className="flex h-11 w-full items-center justify-center gap-2 bg-sky-700 text-sm font-bold text-white transition-colors hover:bg-sky-800"
      >
        <ClipboardPenLine size={16} />
        Editar
      </button>
    </section>
  );
}

// Pergunta pré-definidas para a revisão em carrossel
const perguntasRevisao = [
  'Há risco iminente no local?',
  'O local possui iluminação pública adequada?',
  'A via está parcialmente ou totalmente bloqueada?',
];

// --- Componente Principal ---
function Revisao() {
  const navigate = useNavigate();
  const { dados, setDados } = useOutletContext<FormularioContext>();

  // Estados locais da página
  const [paginaPergunta, setPaginaPergunta] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, 'sim' | 'nao'>>({});

  const nomesCategorias: Record<string, string> = {
    buraco: 'Buraco',
    luz: 'Iluminação pública',
    poda: 'Poda de árvore',
    vazamento: 'Vazamento',
  };

  const perguntaAtual = perguntasRevisao[paginaPergunta];
  const categoriaNome = dados?.categoria
    ? nomesCategorias[dados.categoria]
    : 'Não informado';

  const handleConfirmar = () => {
    // O envio ao backend será implementado posteriormente.
    navigate('/conclusao');
  };

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
    <div className="w-full space-y-6 pb-6">
      {/* 1. Seção de Ocorrência */}
      <RevisionSection
        titulo="Ocorrência"
        icon={<ClipboardPenLine className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/ocorrencia')}
        contentClassName="bg-slate-50/70 px-6 py-5"
      >
        <div className="space-y-4 text-sm text-slate-800">
          <p>
            <strong className="font-semibold text-sky-900">Tipo:</strong>{' '}
            {dados.categoria
              ? nomesCategorias[dados.categoria] || dados.categoria
              : 'Não informado'}
          </p>

          <div>
            <p className="mb-1.5">
              <strong className="font-semibold text-sky-900">Descrição:</strong>
            </p>

            <div className="min-h-24 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
              {dados.detalhes?.trim() || 'Não informado'}
            </div>
          </div>

          <div>
            <p className="mb-1.5">
              <strong className="font-semibold text-sky-900">Condições:</strong>
            </p>

            {dados.respostasCarrossel &&
            Object.entries(dados.respostasCarrossel).length > 0 ? (
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                {Object.entries(dados.respostasCarrossel).map(
                  ([pergunta, resposta]) => (
                    <li key={pergunta}>
                      {pergunta}: {resposta === 'sim' ? 'Sim' : 'Não'}
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <p className="text-slate-500">Nenhuma condição informada.</p>
            )}
          </div>
        </div>
      </RevisionSection>

      {/* 2. Seção de Localização */}
      <RevisionSection
        titulo="Localização"
        icon={<MapPin className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/endereco')}
        contentClassName="bg-white"
      >
        <div>
          <div className="border-b border-slate-100 px-6 py-3.5 text-sm font-medium text-slate-800">
            {dados.endereco?.trim() || 'Endereço não informado'}
          </div>

          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={mapaLocalizacao}
              alt="Mapa ilustrativo da localização da ocorrência"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-red-500/20">
                <MapPin className="h-8 w-8 text-red-600 drop-shadow" />
              </div>

              {dados?.coordenadas && (
                <p className="mt-4 px-6 py-2 text-xs text-slate-500 bg-slate-50 rounded-lg">
                  Latitude: {dados.coordenadas.latitude.toFixed(6)} | Longitude:{' '}
                  {dados.coordenadas.longitude.toFixed(6)}
                </p>
              )}
            </div>
          </div>
        </RevisionSection>

        {/* === 3. Seção de Fotos / Vídeos === */}
        <RevisionSection
          titulo="Fotos / Vídeos"
          icon={<Camera className="h-5 w-5" />}
          onEditar={() => navigate('/formulario/fotos')}
          contentClassName="bg-slate-50/70 p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            {dados?.fotos && dados.fotos.length > 0 ? (
              dados.fotos.map((foto: FotoAnexo) => (
                <div
                  key={foto.id}
                  className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
                >
                  <AnexoPreview
                    arquivo={foto.arquivo}
                    alt="Anexo da ocorrência"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setDados((prev) => ({
                        ...prev,
                        fotos: prev.fotos.filter(
                          (item: FotoAnexo) => item.id !== foto.id,
                        ),
                      }))
                    }
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    title="Remover anexo"
                    aria-label="Remover anexo"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Nenhuma foto ou vídeo anexado.
              </p>
            )}
          </div>
        </RevisionSection>
      </div>

          {dados.coordenadas && (
            <p className="px-6 py-2 text-xs text-slate-500">
              Latitude: {dados.coordenadas.latitude.toFixed(6)} | Longitude:{' '}
              {dados.coordenadas.longitude.toFixed(6)}
            </p>
          )}
        </div>
      </RevisionSection>

      {/* 3. Seção de Fotos / Vídeos */}
      <RevisionSection
        titulo="Fotos / Vídeos"
        icon={<Camera className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/fotos')}
        contentClassName="bg-slate-50/70 p-5"
      >
        <div className="flex flex-wrap items-center gap-3">
          {dados.fotos && dados.fotos.length > 0 ? (
            dados.fotos.map((foto) => (
              <div
                key={foto.id}
                className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
      {/* === 4. Carrossel de Perguntas === */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <section className="relative w-full overflow-hidden rounded-2xl bg-[#F2F2F2]">
          <div className="absolute left-0 top-0 flex h-full w-8 items-center justify-center bg-[#0073A9] transition-colors hover:bg-sky-800">
            <button
              type="button"
              onClick={irParaAnterior}
              aria-label="Pergunta anterior"
              className="relative z-10 flex h-full w-full items-center justify-center text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute right-0 top-0 flex h-full w-8 items-center justify-center bg-[#0073A9] transition-colors hover:bg-sky-800">
            <button
              type="button"
              onClick={irParaProxima}
              aria-label="Próxima pergunta"
              className="relative z-10 flex h-full w-full items-center justify-center text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="px-12 py-7">
            <h2 className="flex min-h-[3rem] items-center justify-center text-center text-lg font-bold leading-snug text-[#0073A9]">
              {perguntaAtual}
            </h2>

            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => responder('sim')}
                className="rounded-lg border-2 border-[#0073A9] px-8 py-2 font-bold text-[#0073A9] hover:bg-[#0073A9] hover:text-white transition-colors"
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => responder('nao')}
                className="rounded-lg bg-[#0073A9] px-8 py-2 font-bold text-white hover:bg-sky-800 transition-colors"
              >
                Não
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {perguntasRevisao.map((_, indice) => (
                <span
                  key={indice}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    paginaPergunta === indice ? 'bg-[#0073A9]' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={() => navigate('/respostas', { state: { respostas } })}
          className="mx-auto flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-sky-100/50 border border-[#0073A9]/20 px-6 py-3 text-sm font-bold text-[#0073A9] hover:bg-sky-100 transition-colors"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0073A9] text-white">
            <Plus className="h-4 w-4" />
          </span>
          Ver todas as respostas
        </button>
      </div>

      {/* 4. Carrossel de Perguntas Adicionais */}
      {perguntasRevisao.length > 0 && (
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

          <div className="absolute right-0 top-0 flex h-full w-7 items-center justify-center bg-[#0073A9]">
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

            <div className="mt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => responder('sim')}
                className={`rounded-xl px-6 py-2 font-bold transition ${
                  respostas[paginaPergunta] === 'sim'
                    ? 'bg-[#0073A9] text-white'
                    : 'border border-[#0073A9] bg-white text-[#0073A9]'
                }`}
              >
                Sim
              </button>

              <button
                type="button"
                onClick={() => responder('nao')}
                className={`rounded-xl px-6 py-2 font-bold transition ${
                  respostas[paginaPergunta] === 'nao'
                    ? 'bg-[#0073A9] text-white'
                    : 'border border-[#0073A9] bg-white text-[#0073A9]'
                }`}
              >
                Não
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-1.5">
              {perguntasRevisao.map((_, indice) => (
                <span
                  key={indice}
                  className={`h-2 w-2 rounded-full transition-all ${
                    paginaPergunta === indice ? 'bg-[#0073A9]' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Botões Finais */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={handleConfirmar}
          className="w-full rounded-2xl bg-sky-700 px-6 py-3.5 text-center font-bold text-white shadow-md transition hover:bg-sky-800"
        >
          Confirmar
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-6 py-3.5 text-center font-bold text-sky-700 shadow-sm transition hover:bg-slate-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Revisao;
