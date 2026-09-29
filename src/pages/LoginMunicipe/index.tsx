import { useNavigate } from 'react-router-dom';
import { EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import projectlogo from '../../assets/img/project-logo.png';

function LoginMunicipe() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center text-center">
      <img
        src={projectlogo}
        alt="Fala Registro!"
        className="w-60 h-auto object-contain mx-auto mb-12"
      />

      <h1 className="text-3xl font-medium leading-tight mb-3">
        Ajude a cuidar <br /> da{' '}
        <span className="text-primary text-4xl font-bold">sua Cidade!</span>
      </h1>

      <div className="w-full border-t border-slate-200 mb-3" />

      <p className="text-black font-medium text-sm mb-8 leading-relaxed">
        Registre ocorrências e acompanhe suas solicitações de forma{' '}
        <strong>simples e rápida</strong>.
      </p>

      <div className="w-full space-y-3.5">
        <Button onClick={() => navigate('/cadastro')} className="w-full">
          Criar uma conta
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate('/signin')}
          className="w-full"
        >
          Logar
        </Button>

        <div className="flex items-center my-3">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3 text-slate-400 text-xs font-medium">ou</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <Button
          variant="dark"
          icon={EyeOff}
          onClick={() => navigate('/anonimo')}
          className="w-full"
        >
          Entrar Anônimo
        </Button>
      </div>
    </div>
  );
}

export default LoginMunicipe;
