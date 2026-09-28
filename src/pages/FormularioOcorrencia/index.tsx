import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import ButtonBack from '../../components/ui/ButtonBack';

import iconeBuraco from '../../assets/img/buraco.png';
import iconePoda from '../../assets/img/poda.png';
import iconeLuz from '../../assets/img/luz.png';
import iconeVazamento from '../../assets/img/vazamento.png';

const CATEGORIAS = [
  { value: 'buraco', label: 'Buraco', icone: iconeBuraco },
  { value: 'poda', label: 'Poda', icone: iconePoda },
  { value: 'luz', label: 'Luz', icone: iconeLuz },
  { value: 'vazamento', label: 'Vazamento', icone: iconeVazamento },
];

function FormularioOcorrenciaEtapa1() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  function handleProximo() {
    if (!categoria) {
      setErro('Selecione o tipo de ocorrência.');
      return;
    }
    if (!descricao.trim()) {
      setErro('Descreva o problema.');
      return;
    }
    console.log({ categoria, descricao }); // por enquanto só isso
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col px-6 pt-10 pb-10">
        <ButtonBack onClick={() => navigate(-1)} />

        <h1 className="mt-4 text-center text-2xl">
          <span className="font-bold text-black">O que tá</span>
          <br />
          <span className="font-bold text-primary text-3xl">Rolando?</span>
        </h1>

        <h2 className="mt-8 text-lg font-bold text-primary">
          Qual é o problema?
        </h2>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {CATEGORIAS.map((cat) => {
            const selecionada = categoria === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setCategoria(cat.value)}
                className={twMerge(
                  'flex flex-col items-start gap-2 rounded-2xl bg-white p-4 shadow-sm',
                  selecionada && 'ring-2 ring-primary',
                )}
              >
                <img
                  src={cat.icone}
                  alt={cat.label}
                  className="w-12 h-12 object-contain"
                />
                <span className="font-bold text-primary">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <h2 className="mt-6 text-lg font-bold text-primary">
          Conta os detalhes:
        </h2>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={4}
          placeholder="Descreva o problema aqui..."
          className="mt-2 w-full rounded-2xl bg-gray-100 p-4 outline-none resize-none"
        />

        {erro && (
          <p className="mt-2 text-red-500 text-sm text-center">{erro}</p>
        )}

        <button
          type="button"
          onClick={handleProximo}
          className="mt-6 h-14 w-full rounded-full bg-primary text-white font-bold"
        >
          Próximo
        </button>
      </main>
    </div>
  );
}

export default FormularioOcorrenciaEtapa1;
