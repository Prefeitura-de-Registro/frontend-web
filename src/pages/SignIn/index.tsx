import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import projectlogo from '../../assets/img/project-logo.png';

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Dados de login capturados:', { email, senha });

    setTimeout(() => {
      setLoading(false);
      alert('Login efetuado com sucesso (Mock)!');
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col items-center mt-2">
      <div className="mb-6 text-center">
        <img
          src={projectlogo}
          alt="Fala Registro!"
          className="w-60 h-auto object-contain mx-auto drop-shadow-sm"
        />
      </div>

      <div className="w-full mb-6 text-left">
        <h2 className="text-2xl font-bold text-[#1e293b]">
          Bem-vindo <span className="text-[#0073a9]">de volta!</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="relative flex items-center w-full">
          <span className="absolute left-4 text-[#0073a9]">
            <Mail size={20} strokeWidth={2} />
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required
            className="w-full pl-12 pr-4 py-3.5 bg-[#f4f9fd] border border-[#cbd5e1] rounded-full text-[#1e293b] placeholder-[#64748b] text-sm focus:outline-none focus:border-[#0073a9] focus:ring-1 focus:ring-[#0073a9] transition-all shadow-sm"
          />
        </div>

        <div className="relative flex items-center w-full">
          <span className="absolute left-4 text-[#0073a9]">
            <Lock size={20} strokeWidth={2} />
          </span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            required
            className="w-full pl-12 pr-4 py-3.5 bg-[#f4f9fd] border border-[#cbd5e1] rounded-full text-[#1e293b] placeholder-[#64748b] text-sm focus:outline-none focus:border-[#0073a9] focus:ring-1 focus:ring-[#0073a9] transition-all shadow-sm"
          />
        </div>

        <div className="flex justify-end pr-2">
          <a
            href="#recuperar-senha"
            onClick={(e) => {
              e.preventDefault();
              alert('Fluxo de recuperação de senha será acionado aqui.');
            }}
            className="text-xs font-semibold text-[#0073a9] hover:underline"
          >
            Esqueceu a senha?
          </a>
        </div>

        <div className="mt-2">
          <Button
            type="submit"
            variant="solid"
            fullWidth={true}
            disabled={loading}
            className="shadow-md py-3.5 text-base"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
