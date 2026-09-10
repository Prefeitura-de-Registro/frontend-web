import { useNavigate } from 'react-router-dom';
import { FileUploadBox } from '../../components/ui/FileUploadBox';

export function FormularioFotos() {
  const navigate = useNavigate();

  return (
    <div className="bg-tertiary px-5 py-8 rounded-3xl space-y-6 shadow-sm border border-secondary min-h-90 flex flex-col justify-between">
      <div className="space-y-3">
        <label className="block text-sm font-bold text-primary">
          Anexar fotos ou vídeos:
        </label>
        <FileUploadBox />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate('/formulario/endereco')}
          className="w-full py-2.5 rounded-xl border-2 border-primary bg-secondary text-primary font-bold text-sm hover:bg-secondary/80 transition-colors"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={() => navigate('/formulario/confirmacao')}
          className="w-full py-2.5 rounded-xl bg-primary text-secondary font-bold text-sm hover:bg-primary/90 transition-colors shadow-sm"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
