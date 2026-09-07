// import {useNavigate} from "react-router-dom";
import CampoTexto from '../../components/ui/CampoTexto';
import ButtonLarger from '../../components/ui/ButtonLarger';
import { Lock } from 'lucide-react';

function ListaChamadosAnonimo() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-red-100 relative p-0.5 items-center justify-center">
        <p className="text-center text-balance max-w-sm">
          Digite o <b>número do protocolo</b> recebido ao registrar a
          ocorrência.
        </p>

        <CampoTexto
          label="Insira aqui o número do protocolo"
          labelClassName="text-md mx-16 font-bold"
          icon={<Lock className="w-full h-full" />}
          placeholder="Insira aqui o número..."
          className="rounded shadow-md md:shadow-xl w-80 mx-auto"
        />

        <ButtonLarger className="rounded-3xl! font-light text-xl w-20 h-14 px-6 py-3">
          Acompanhar Chamado
        </ButtonLarger>
      </div>
    </>
  );
}

export default ListaChamadosAnonimo;
// Header: Criar o cabeçalho com a seta é o título da página seguido do texto.

// Instrução: Adicionar o texto explicativo: "Digite o número do protocolo recebido ao registrar a ocorrência."

// Campo de Entrada (Input): utilizar o componente de input e o placeholder com ícone de cadeado/segurança.

// Botão de Ação: Incluir o botão primário "Acompanhar chamado" centralizado ButtonLarger.

// Estrutura Visual: Garantir o posicionamento correto com o degradê no topo e o rodapé padrão da aplicação.
