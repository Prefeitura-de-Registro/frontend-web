import { useEffect, useState, type ReactNode } from 'react';
import { ClipboardPenLine, MapPin, Camera, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import type { FormularioContext } from '../../components/layouts/FormLayout';
import mapaLocalizacao from '../../assets/mapa-localizacao.png';

function AnexoPreview({ arquivo, alt }: { arquivo: File; alt: string }) {
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

interface RevisionSectionProps {
  titulo: string;
  icon: ReactNode;
  children: ReactNode;
  onEditar: () => void;
  contentClassName?: string;
}

function RevisionSection({
  titulo,
  icon,
  children,
  onEditar,
  contentClassName = '',
}: RevisionSectionProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Cabeçalho da seção */}
      <div className="flex h-11 items-center justify-center gap-2 border-b border-slate-100 bg-white">
        <div className="flex h-5 w-5 items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="text-base font-bold text-primary">{titulo}</h2>
      </div>

      <div className={contentClassName}>{children}</div>

      {/* Botão de editar */}
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

function Revisao() {
  const navigate = useNavigate();
  const { dados, setDados } = useOutletContext<FormularioContext>();

  const nomesCategorias = {
    buraco: 'Buraco',
    luz: 'Iluminação pública',
    poda: 'Poda de árvore',
    vazamento: 'Vazamento',
  };

  const handleConfirmar = () => {
    // O envio ao backend será implementado posteriormente.
    navigate('/conclusao');
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
              ? nomesCategorias[dados.categoria]
              : 'Não informado'}
          </p>

          <div>
            <p className="mb-1.5">
              <strong className="font-semibold text-sky-900">Descrição:</strong>
            </p>

            <div className="min-h-24 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
              {dados.detalhes.trim() || 'Não informado'}
            </div>
          </div>

          <div>
            <p className="mb-1.5">
              <strong className="font-semibold text-sky-900">Condições:</strong>
            </p>

            {Object.entries(dados.respostasCarrossel).length > 0 ? (
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
            {dados.endereco.trim() || 'Endereço não informado'}
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
            </div>
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
          {dados.fotos.length > 0 ? (
            dados.fotos.map((foto) => (
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
                      fotos: prev.fotos.filter((item) => item.id !== foto.id),
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

      {/* Botões finais de confirmação e cancelamento */}
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
