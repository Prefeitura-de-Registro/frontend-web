import { useEffect, useState, type ReactNode } from 'react';
import { ClipboardPenLine, MapPin, Camera, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import { TOKEN_STORAGE_KEY } from '../../services/api';

import type {
  FormularioContext,
  FotoFormulario,
} from '../../components/layouts/FormLayout';
import mapaLocalizacao from '../../assets/mapa-localizacao.png';

interface RevisionSectionProps {
  titulo: string;
  icon: ReactNode;
  children: ReactNode;
  onEditar: () => void;
  contentClassName?: string;
}

interface PayloadDTO {
  idCategoria: number;
  descricao: string;
  respostas: { idPergunta: number; valor: boolean }[];
  latitude?: number;
  longitude?: number;
}

export function AnexoPreview({ arquivo, alt }: { arquivo: File; alt: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const urlTemporaria = URL.createObjectURL(arquivo);
    const frameId = requestAnimationFrame(() => setUrl(urlTemporaria));

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

function Revisao() {
  const navigate = useNavigate();
  const { dados, setDados } = useOutletContext<FormularioContext>();
  const [loading, setLoading] = useState(false);

  const nomesCategorias: Record<number, string> = {
    1: 'Buraco',
    2: 'Poda de árvore',
    3: 'Iluminação pública',
    4: 'Vazamento',
  };

  const handleConfirmar = async () => {
    // 1. Trava de segurança: impede envio sem categoria
    if (!dados.categoria) {
      alert(
        'Por favor, volte à primeira tela e selecione o tipo de problema (Buraco, Poda, etc).',
      );
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);

      const respostasFormatadas = dados.respostasCarrossel
        ? Object.entries(dados.respostasCarrossel)
            .filter(([chave]) => !isNaN(Number(chave)))
            .map(([idPergunta, valor]) => ({
              idPergunta: Number(idPergunta),
              valor: valor === 'sim',
            }))
        : [];

      const nomeArquivos =
        dados.fotos && dados.fotos.length > 0
          ? `\n\n[Arquivos anexos: ${dados.fotos.map((f: FotoFormulario) => f.arquivo.name).join(', ')}]`
          : '';

      let descricaoFinal =
        (dados.detalhes?.trim() || 'Ocorrência relatada via aplicativo.') +
        nomeArquivos;

      if (descricaoFinal.length > 2000) {
        descricaoFinal = descricaoFinal.substring(0, 1997) + '...';
      }

      const payload: PayloadDTO = {
        idCategoria: Number(dados.categoria),
        descricao: descricaoFinal,
        respostas: respostasFormatadas,
      };

      if (
        dados.coordenadas &&
        dados.coordenadas.latitude !== undefined &&
        dados.coordenadas.longitude !== undefined
      ) {
        payload.latitude = Number(dados.coordenadas.latitude);
        payload.longitude = Number(dados.coordenadas.longitude);
      }

      // Imprime o que está sendo enviado para ajudar no debug
      console.log('Dados enviados para a API:', payload);

      const response = await axios.post(
        'https://backend-api-ij3c.onrender.com/api/tickets',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const protocoloGerado = response.data?.protocolo;
      navigate('/conclusao', { state: { protocolo: protocoloGerado } });
    } catch (error: unknown) {
      console.error('Erro ao enviar ocorrência:', error);

      let mensagemErro =
        'Falha no servidor. Verifique os logs do Render para saber o motivo exato.';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        mensagemErro = error.response.data.message;
      }

      alert(`Erro: ${mensagemErro}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 pb-6">
      <RevisionSection
        titulo="Ocorrência"
        icon={<ClipboardPenLine className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/ocorrencia')}
        contentClassName="bg-slate-50/70 px-6 py-5"
      >
        <div className="space-y-4 text-sm text-slate-800">
          <p>
            <strong className="font-semibold text-sky-900">Tipo:</strong>{' '}
            {dados?.categoria
              ? nomesCategorias[Number(dados.categoria)]
              : 'Não informado'}
          </p>

          <div>
            <p className="mb-1.5">
              <strong className="font-semibold text-sky-900">Descrição:</strong>
            </p>
            <div className="min-h-24 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
              {dados?.detalhes?.trim() || 'Não informado'}
            </div>
          </div>
        </div>
      </RevisionSection>

      <RevisionSection
        titulo="Localização"
        icon={<MapPin className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/endereco')}
        contentClassName="bg-white"
      >
        <div>
          <div className="border-b border-slate-100 px-6 py-3.5 text-sm font-medium text-slate-800">
            {dados?.endereco?.trim() || 'Endereço não informado'}
          </div>

          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={mapaLocalizacao}
              alt="Mapa ilustrativo"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-red-500/20">
                <MapPin className="h-8 w-8 text-red-600 drop-shadow" />
              </div>
            </div>
          </div>
        </div>
      </RevisionSection>

      <RevisionSection
        titulo="Fotos / Vídeos"
        icon={<Camera className="h-5 w-5" />}
        onEditar={() => navigate('/formulario/fotos')}
        contentClassName="bg-slate-50/70 p-5"
      >
        <div className="flex flex-wrap items-center gap-3">
          {dados?.fotos && dados.fotos.length > 0 ? (
            dados.fotos.map((foto: FotoFormulario) => (
              <div
                key={foto.id}
                className="relative h-20 w-20 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
              >
                <AnexoPreview arquivo={foto.arquivo} alt="Anexo" />
                <button
                  type="button"
                  onClick={() =>
                    setDados((prev) => ({
                      ...prev,
                      fotos: prev.fotos.filter(
                        (item: FotoFormulario) => item.id !== foto.id,
                      ),
                    }))
                  }
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
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

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={loading}
          className="w-full rounded-2xl bg-sky-700 px-6 py-3.5 text-center font-bold text-white shadow-md transition hover:bg-sky-800 disabled:opacity-70"
        >
          {loading ? 'A enviar...' : 'Confirmar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          disabled={loading}
          className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-6 py-3.5 text-center font-bold text-sky-700 shadow-sm transition hover:bg-slate-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Revisao;
