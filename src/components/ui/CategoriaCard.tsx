import React from 'react';

// 1. Importe todas as imagens correspondentes
import imgBuraco from '../../assets/img/buraco.png';
import imgLuz from '../../assets/img/luz.png';
import imgPoda from '../../assets/img/poda.png';
import imgVazamento from '../../assets/img/vazamento.png';

interface CategoriaProps {
  tipo: 'buraco' | 'luz' | 'poda' | 'vazamento';
  isActive: boolean;
  onClick: () => void;
}

export const CategoriaCard: React.FC<CategoriaProps> = ({
  tipo,
  isActive,
  onClick,
}) => {
  const titulos = {
    buraco: 'Buraco',
    luz: 'Luz',
    poda: 'Poda',
    vazamento: 'Vazamento',
  };

  // 2. Crie um objeto para mapear o tipo para a imagem importada
  const imagens = {
    buraco: imgBuraco,
    luz: imgLuz,
    poda: imgPoda,
    vazamento: imgVazamento,
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative w-32 h-24 rounded-2xl p-3 flex flex-col justify-end cursor-pointer transition-all overflow-hidden shadow-sm shrink-0
        ${isActive ? 'bg-[#0073a9] text-white shadow-md scale-105' : 'bg-white text-[#0073a9] border border-gray-100'}
      `}
    >
      <img
        src={imagens[tipo]} // 3. O src agora é dinâmico e puxa a imagem correta
        alt={titulos[tipo]}
        className="absolute -top-1 right-0 w-20 h-20 object-contain drop-shadow-md"
      />
      <span className="font-bold text-sm relative z-10">{titulos[tipo]}</span>
    </div>
  );
};
