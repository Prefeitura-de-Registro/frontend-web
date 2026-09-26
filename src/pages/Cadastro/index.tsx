import { useState } from 'react';

import ButtonBack from '../../components/ui/ButtonBack';
import CampoCadastro from '../../components/ui/CampoCadastro';
import type { ReactNode } from 'react';

import { Mail, LockKeyhole, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import brasao from '../../assets/brasao.svg';
import degradeRegistro from '../../assets/degrade.svg';
import logoFatec from '../../assets/logo_fatec_de_registro.png';
import { cadastrar } from './cadastrarUsuario';

function CampoCadastro({
  label,
  placeholder,
  valor,
  onChange,
  tipo = 'text',
  icon,
}: CampoCadastroProps) {
  return (
    <div className="w-full">
      <label className="mb-1 block text-[17px] font-medium text-primary">
        {label}
      </label>

      <div className="relative flex h-[45px] w-full items-center border-b-[1.5px] border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="ml-2 text-primary">{icon}</div>

        <input
          type={tipo}
          value={valor}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full flex-1 bg-transparent px-3 text-[15px] text-black outline-none placeholder:text-[#AAB1BC]"
        />

        {valor && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={`Limpar campo ${label}`}
            className="mr-2 text-[#4A5565]"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleCadastrar() {
    setErro('');

    if (!nome.trim() || !cpf.trim() || !email.trim() || !senha.trim()) {
      setErro('Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      const resultado = await cadastrar({
        nomeCompleto: nome,
        CPF: cpf,
        email,
        senha,
        confirmarSenha: confirmacaoSenha,
      });

      if (!resultado.ok) {
        setErro(resultado.erro);
        return;
      }

      navigate('/');
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <img
        src={degradeRegistro}
        alt=""
        className="absolute left-0 top-0 z-0 h-[125px] w-full object-cover [mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_35%,transparent_100%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6">
        <ButtonBack
          type="button"
          onClick={() => navigate('/login')}
          aria-label="Voltar para a tela de login"
          className="mt-12"
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-[33px] font-normal leading-[1.05] text-black">
            Crie a
            <br />
            <span className="text-[40px] font-bold text-primary">
              sua conta!
            </span>
          </h1>

          <div className="mt-1 h-[1px] w-[300px] rounded-full bg-primary" />

          <p className="mt-3 text-center text-[16px] text-black">
            Cadastre-se para <b>acompanhar</b> <br />
            seus <b>chamados</b>
          </p>
        </div>
        <div className="mt-8 flex w-full flex-col gap-4">
          <CampoCadastro
            label="Nome Completo"
            placeholder="Insira aqui seu nome"
            valor={nome}
            onChange={setNome}
            icon={<Mail className="h-4 w-4" />}
          />

          <CampoCadastro
            label="CPF"
            placeholder="xxx.xxx.xxx-xx"
            valor={cpf}
            onChange={setCpf}
            icon={<Mail className="h-4 w-4" />}
          />

          <CampoCadastro
            label="E-mail"
            placeholder="Insira aqui seu email"
            valor={email}
            onChange={setEmail}
            tipo="email"
            icon={<Mail className="h-4 w-4" />}
          />

          <CampoCadastro
            label="Senha"
            placeholder="Insira aqui sua senha"
            valor={senha}
            onChange={setSenha}
            tipo="password"
            icon={<Mail className="h-4 w-4" />}
          />

          <CampoCadastro
            label="Confirmar senha"
            placeholder="Confirme aqui sua senha"
            valor={confirmacaoSenha}
            onChange={setConfirmacaoSenha}
            tipo="password"
            icon={<LockKeyhole className="h-4 w-4" />}
          />
        </div>

        {erro && (
          <p className="mt-3 text-center text-sm text-red-500">{erro}</p>
        )}

        <button
          type="button"
          disabled={carregando}
          className="mx-auto mt-7 h-16 w-[350px] max-w-full rounded-3xl bg-primary text-[20px] font-medium text-white disabled:opacity-50"
          onClick={handleCadastrar}
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="mt-5 text-center text-[15px] text-black">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-bold text-primary underline"
          >
            Já está cadastrado? <b>Entrar</b>
          </button>
        </p>

        <div className="flex items-center justify-center gap-4 pb-4 pt-8">
          <img
            src={brasao}
            alt="Brasão da Prefeitura de Registro"
            className="h-[40px] w-[40px] object-contain"
          />

          <img
            src={logoFatec}
            alt="Fatec Registro"
            className="w-[70px] object-contain"
          />
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
