import { useState } from 'react';
import { ChevronLeft, LockKeyhole, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import brasao from '../../assets/brasao.svg';
import degradeRegistro from '../../assets/degrade.svg';

interface CampoLoginProps {
  tipo: 'matricula' | 'senha';
  valor: string;
  onChange: (valor: string) => void;
}

function CampoLogin({ tipo, valor, onChange }: CampoLoginProps) {
  const isSenha = tipo === 'senha';

  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
        {isSenha ? (
          <LockKeyhole className="h-6 w-6" strokeWidth={2} />
        ) : (
          <Mail className="h-6 w-6" strokeWidth={2} />
        )}
      </div>

      <input
        type={isSenha ? 'password' : 'text'}
        value={valor}
        onChange={(event) => onChange(event.target.value)}
        placeholder={isSenha ? 'Senha' : 'Matrícula'}
        className="h-[52px] w-full rounded-full border border-primary bg-tertiary pl-16 pr-5 text-base text-black outline-none placeholder:text-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function SignIn() {
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  function handleEntrar() {
    // A autenticação ainda não faz parte desta tela.
    // Por enquanto, apenas mantemos os valores dos campos.
    console.log({ matricula, senha });
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <img
        src={degradeRegistro}
        alt=""
        className="absolute left-0 top-0 z-0 h-[470px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6">
        <button
          type="button"
          onClick={() => navigate('/login')}
          aria-label="Voltar para a tela inicial"
          className="mt-16 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-primary/90"
        >
          <ChevronLeft className="h-8 w-8" strokeWidth={3} />
        </button>

        <div className="mt-[-2px] flex flex-col items-center text-center">
          <img
            src={brasao}
            alt="Brasão da Prefeitura de Registro"
            className="h-[246px] w-[258px] object-contain"
          />

          <h1 className="mt-2 text-[32px] font-medium leading-[1.05] text-black">
            Ajude a cuidar
            <br />
            da <span className="font-bold text-primary">sua Cidade!</span>
          </h1>

          <p className="mt-5 max-w-[330px] text-[16px] leading-[1.45] text-black">
            Registre ocorrências e acompanhe suas
            <br />
            solicitações de forma <strong>simples e rápida.</strong>
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleEntrar();
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <CampoLogin
            tipo="matricula"
            valor={matricula}
            onChange={setMatricula}
          />

          <CampoLogin tipo="senha" valor={senha} onChange={setSenha} />

          <button
            type="button"
            className="self-end text-[15px] font-bold text-primary underline underline-offset-2"
          >
            Esqueceu a senha?
          </button>

          <button
            type="submit"
            className="mt-5 h-16 w-full rounded-full bg-primary text-[24px] font-medium text-white transition-colors hover:bg-primary/90"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignIn;
