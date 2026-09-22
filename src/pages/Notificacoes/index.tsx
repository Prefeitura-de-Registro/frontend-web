import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { EmptyState } from '../../components/ui/EmptyState';
import { Footer } from '../../components/ui/Footer';
import { GradientHeader } from '../../components/ui/GradientHeader';

export function Notificacoes() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white overflow-hidden">
      <GradientHeader />

      <div className="relative z-10 flex-1 flex flex-col px-6 pt-10 pb-4">
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary text-secondary flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <h1 className="text-xl font-bold text-primary text-center flex-1 mx-2 drop-shadow-sm select-none">
            Notificações
          </h1>

          <button
            type="button"
            className="w-10 h-10 flex items-center justify-end text-primary hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            aria-label="Mais opções"
          >
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <EmptyState />
        </div>
      </div>

      <div className="relative z-10 p-6 pt-0">
        <Footer />
      </div>
    </div>
  );
}
