import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../../components/ui/ButtonBack';
import CampoTexto from '../../components/ui/CampoTexto';
import { Footer } from '../../components/ui/Footer';
import { buscarChamado } from './buscarChamado';

import lupa from '../../assets/lupa.png';
import bola from '../../assets/bola.png';
import onda from '../../assets/onda.png';

function PesquisarChamado() {
  const navigate = useNavigate();

  const [protocolo, setProtocolo] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleBuscar(e?: FormEvent) {
    if (e) e.preventDefault(); // Previne o reload padrão da página ao enviar o form
    setErro('');

    const protocoloFormatado = protocolo.trim();

    if (!protocoloFormatado) {
      setErro('Digite o número do protocolo.');
      return;
    }

    setCarregando(true);
    try {
      const resultado = await buscarChamado(protocoloFormatado);

      if (!resultado.ok) {
        setErro(resultado.erro);
        return;
      }

      // Redireciona para os detalhes do protocolo e envia o objeto do chamado no state
      navigate(`/chamado/${resultado.chamado.id}`, {
        state: { chamado: resultado.chamado },
      });
    } catch {
      setErro('Erro ao buscar protocolo. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex flex-col">
      <img
        src={bola}
        alt=""
        className="absolute -top-10 -right-10 w-72 h-72 object-contain z-0 pointer-events-none"
      />

      <main className="relative z-10 flex-1 flex flex-col px-6">
        <ButtonBack onClick={() => navigate(-1)} className="mt-10" />

        <div className="flex flex-col items-center text-center mt-8">
          <div className="w-60 h-60 flex items-center justify-center -mb-12">
            <img
              src={lupa}
              alt="Ilustração de lupa"
              className="w-full h-full object-contain -rotate-8"
            />
          </div>

          <h1 className="text-2xl">
            <span className="font-bold text-black text-3xl">Pesquise</span>{' '}
            <span className="text-black text-2xl">seu</span>
            <br />
            <span className="font-bold text-primary text-5xl">Chamado</span>
          </h1>

          <div className="h-0.5 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 my-4" />

          <p className="text-sm text-gray-800 max-w-xs">
            Digite o <b>número do protocolo</b> recebido ao registrar a
            ocorrência.
          </p>
        </div>

        {/* Formulário envelopando os campos para permitir submit via Enter */}
        <form onSubmit={handleBuscar} className="w-full">
          <div className="mt-8 flex flex-col items-center gap-2 w-full">
            <CampoTexto
              labelClassName="font-bold text-primary text-sm sm:text-base"
              label="Insira aqui o número do protocolo"
              placeholder="Insira aqui o número..."
              value={protocolo}
              onChange={(e) => setProtocolo(e.target.value)}
              className="rounded-xl!"
            />

            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="mt-6 h-14 w-full rounded-2xl bg-primary text-white font-bold text-base transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {carregando ? 'Buscando...' : 'Buscar chamado'}
          </button>
        </form>
      </main>

      <img
        src={onda}
        alt=""
        className="absolute -bottom-6 -right-10 w-60 h-60 object-contain z-0 pointer-events-none"
      />

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default PesquisarChamado;
