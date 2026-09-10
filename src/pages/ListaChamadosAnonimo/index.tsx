// import {useNavigate} from "react-router-dom";
import CampoTexto from '../../components/ui/CampoTexto';
import ButtonLarger from '../../components/ui/ButtonLarger';
import { GradientHeader } from '../../components/ui/GradientHeader';
import { Footer } from '../../components/ui/Footer';
import ButtonBack from '../../components/ui/ButtonBack';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ListaChamadosAnonimo() {
  const navigate = useNavigate();
  const [protocolo, setProtocolo] = useState('');
  const [erro, setErro] = useState('');

  function handleAcompanhar() {
    setErro('');

    if (!protocolo.trim()) {
      setErro('Digite o número do protocolo.');
      return;
    }

    // Navega diretamente para a tela de detalhes do chamado
    navigate('/detalhes');
  }

  return (
    <div className="w-full h-200 mx-auto overflow-hidden bg-white-500 relative flex flex-col items-center p-2">
      <GradientHeader />
      <header className="shrink-0 relative mt-10 -ml-10">
        <div className="relative z-10 flex items-center gap-8 px-4 py-6">
          <ButtonBack
            onClick={() => navigate(-1)}
            className="mb-5 shadow-md md:shadow-xl"
          />
          <div className="flex flex-col">
            <span className="text-3xl text-gray-800 font-semibold">
              Acompanhar
            </span>
            <span className="text-4xl font-bold text-primary -mt-1">
              Chamado
            </span>
          </div>
        </div>
      </header>
      <div className="h-0.5 w-full bg-linear-to-r from-primary/0 via-primary to-primary/0" />

      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center gap-20 w-full">
        <p className="text-center text-balance max-w-sm font-sm">
          Digite o <b>número do protocolo</b> recebido ao registrar a
          ocorrência.
        </p>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-xs flex flex-col items-center">
            <CampoTexto
              label="Insira aqui o número do protocolo"
              labelClassName="text-sm font-bold text-center block w-full mb-1"
              icon={<Lock className="w-full h-full text-primary" />}
              placeholder="Insira aqui o número..."
              className="rounded shadow-md md:shadow-xl w-full h-10 mt-2"
              value={protocolo}
              onChange={(e) => setProtocolo(e.target.value)}
            />
          </div>

          {erro && (
            <p className="text-red-500 text-sm text-center mt-1">{erro}</p>
          )}
        </div>

        <ButtonLarger
          className="rounded-2xl! font-light text-md w-60! h-12! -mt-12"
          onClick={handleAcompanhar}
        >
          Acompanhar Chamado
        </ButtonLarger>
      </main>

      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  );
}

export default ListaChamadosAnonimo;
