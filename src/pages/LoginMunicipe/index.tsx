import { useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Footer } from '../../components/ui/Footer';

import brasao from '../../assets/brasao.svg';
import degradeRegistro from '../../assets/degrade.svg';

function LoginMunicipe() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-[length:100%_365px] bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${degradeRegistro})` }}
    >
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-6 text-center max-w-xs mx-auto w-full">
        <img
          src={brasao}
          alt="Brasão de Registro"
          className="w-40 h-auto mb-6"
        />

        <h1 className="text-2xl font-medium leading-tight mb-3">
          Ajude a cuidar <br /> da{' '}
          <span className="text-primary font-bold">sua Cidade!</span>
        </h1>

        <div className="w-full border-t border-slate-200 mb-3" />

        <p className="text-black font-medium text-sm mb-8 leading-relaxed">
          Registre ocorrências e acompanhe suas solicitações de forma{' '}
          <strong>simples e rápida</strong>.
        </p>

        <div className="w-full space-y-3.5">
          <Button onClick={() => navigate('/em-construcao')} className="w-full">
            Criar uma conta
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/em-construcao')}
            className="w-full"
          >
            Logar
          </Button>

          <div className="flex items-center my-3">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-slate-400 text-xs font-medium">ou</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <Button
            variant="dark"
            icon={<EyeOff className="w-4 h-4" />}
            onClick={() => navigate('/em-construcao')}
            className="w-full"
          >
            Entrar Anônimo
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default LoginMunicipe;
