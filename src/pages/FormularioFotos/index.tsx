import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, X } from 'lucide-react';

import cameraIcon from '../../assets/camera.svg';
import galeriaIcon from '../../assets/galeria.svg';
import arquivosIcon from '../../assets/arquivos.svg';
import type { FormularioContext } from '../../components/layouts/FormLayout';

interface MidiaItem {
  id: string;
  arquivo: File;
}

function MidiaPreview({ arquivo }: { arquivo: File }) {
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
        aria-label="Vídeo anexado"
        className="w-full h-full object-cover"
        muted
      />
    );
  }

  return <img src={url} alt="Anexo" className="w-full h-full object-cover" />;
}

export function FormularioFotos() {
  const { dados, setDados } = useOutletContext<FormularioContext>();

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galeriaInputRef = useRef<HTMLInputElement>(null);

  const midias: MidiaItem[] = dados.fotos;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const novosItens = Array.from(files).map((arquivo) => ({
      id: `${arquivo.name}-${Date.now()}-${Math.random()}`,
      arquivo,
    }));

    setDados((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...novosItens],
    }));

    e.target.value = '';
  };

  const handleRemove = (id: string) => {
    setDados((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((foto) => foto.id !== id),
    }));
  };

  return (
    <div className="w-full space-y-4 pb-2">
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <input
        type="file"
        ref={galeriaInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*"
        multiple
        className="hidden"
      />

      <p className="text-primary font-bold text-sm text-left">
        Nos mande uma foto ou vídeo
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="bg-white py-4 px-2 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <img
            src={cameraIcon}
            alt="Tirar foto"
            className="w-24 h-16 object-contain mb-1"
          />

          <span className="font-bold text-primary text-[13px] leading-tight">
            Tirar foto
          </span>

          <span className="text-[10px] text-gray-400 leading-tight mt-0.5">
            Use a câmera do celular
          </span>
        </button>

        <button
          type="button"
          onClick={() => galeriaInputRef.current?.click()}
          className="bg-white py-4 px-2 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <img
            src={galeriaIcon}
            alt="Galeria"
            className="w-24 h-16 object-contain mb-1"
          />

          <span className="font-bold text-primary text-[13px] leading-tight">
            Galeria
          </span>

          <span className="text-[10px] text-gray-400 leading-tight mt-0.5">
            Escolha da sua galeria
          </span>
        </button>
      </div>

      <div className="space-y-1.5 pt-0.5">
        <p className="text-primary font-bold text-sm text-left">
          Arquivos anexados ({midias.length})
        </p>

        <div className="bg-white rounded-2xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center">
          {midias.length === 0 ? (
            <div className="flex flex-col items-center py-2 w-full">
              <img
                src={arquivosIcon}
                alt="Nenhum arquivo anexado"
                className="w-32 h-24 object-contain mb-1"
              />

              <span className="text-[11px] text-gray-400 mb-3 font-normal">
                (Nenhum arquivo anexado)
              </span>

              <button
                type="button"
                onClick={() => galeriaInputRef.current?.click()}
                className="w-full bg-primary text-white py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
              >
                <span className="bg-white rounded-full p-0.5 text-primary">
                  <Plus size={14} strokeWidth={3} />
                </span>
                Adicionar mais
              </button>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <div className="grid grid-cols-3 gap-2.5 w-full">
                {midias.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <MidiaPreview arquivo={item.arquivo} />

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remover anexo"
                      className="absolute top-1 right-1 bg-danger text-white rounded-full p-0.5 shadow-md hover:opacity-90 transition-opacity"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => galeriaInputRef.current?.click()}
                className="w-full bg-primary text-white py-3 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-sm"
              >
                <span className="bg-white rounded-full p-0.5 text-primary">
                  <Plus size={14} strokeWidth={3} />
                </span>
                Adicionar mais
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormularioFotos;
