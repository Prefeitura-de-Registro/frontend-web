import { useState, useRef, type ChangeEvent } from 'react';
import { Plus, X } from 'lucide-react';

import cameraIcon from '../../assets/camera.svg';
import galeriaIcon from '../../assets/galeria.svg';
import arquivosIcon from '../../assets/arquivos.svg';

interface MidiaItem {
  id: string;
  url: string;
  file: File;
}

export function FormularioFotos() {
  const [midias, setMidias] = useState<MidiaItem[]>([]);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galeriaInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const novosItens: MidiaItem[] = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }));

    setMidias((prev) => [...prev, ...novosItens]);
    e.target.value = '';
  };

  const handleRemove = (id: string) => {
    setMidias((prev) => {
      const itemParaRemover = prev.find((m) => m.id === id);
      if (itemParaRemover) {
        URL.revokeObjectURL(itemParaRemover.url);
      }
      return prev.filter((m) => m.id !== id);
    });
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
                <div className="bg-white rounded-full p-0.5 text-primary">
                  <Plus size={14} strokeWidth={3} />
                </div>
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
                    <img
                      src={item.url}
                      alt="Anexo"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
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
                <div className="bg-white rounded-full p-0.5 text-primary">
                  <Plus size={14} strokeWidth={3} />
                </div>
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
