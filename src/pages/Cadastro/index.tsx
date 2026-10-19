import { useState } from 'react';
import { Mail, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../../components/ui/ButtonBack';
import CampoCadastro from '../../components/ui/CampoCadastro';
import brasao from '../../assets/brasao.svg';
import logoFatec from '../../assets/logo_fatec_de_registro.png';
import { cadastrar } from './cadastrarUsuario';

export function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const aplicarMascaraCPF = (valor: string) => {
    return valor
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
      .slice(0, 14);
  };

  const handleCpfChange = (valor: string) => {
    setCpf(aplicarMascaraCPF(valor));
  };

  async function handleCadastrar() {
    setErro('');

    if (
      !nome.trim() ||
      !cpf.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !confirmacaoSenha.trim()
    ) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmacaoSenha) {
      setErro('As senhas não coincidem.');
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
    <div className="w-full bg-white flex flex-col items-center">
      <main className="w-full max-w-md px-6 py-4 flex flex-col items-center">
        {/* BOTÃO VOLTAR */}
        <div className="w-full flex justify-start mb-2">
          <ButtonBack
            type="button"
            onClick={() => navigate('/login')}
            aria-label="Voltar para a tela de login"
          />
        </div>

        {/* CABEÇALHO */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[32px] font-normal leading-tight text-black">
            Crie a <br />
            <span className="text-[38px] font-bold text-primary">
              sua conta!
            </span>
          </h1>

          <div className="mt-2 h-px w-65 bg-primary/40" />

          <p className="mt-2 text-center text-[14px] text-black leading-tight">
            Cadastre-se para <b>acompanhar</b> <br />
            seus <b>chamados</b>
          </p>
        </div>

        {/* CAMPOS DO FORMULÁRIO */}
        <div className="mt-5 w-full flex flex-col gap-3">
          <CampoCadastro
            label="Nome Completo"
            placeholder="Insira aqui seu nome"
            valor={nome}
            onChange={setNome}
            icon={<Mail className="h-4 w-4 text-primary" />}
          />

          <CampoCadastro
            label="CPF"
            placeholder="XXX.XXX.XXX-XX"
            valor={cpf}
            onChange={handleCpfChange}
            icon={<Mail className="h-4 w-4 text-primary" />}
          />

          <CampoCadastro
            label="E-mail"
            placeholder="Insira aqui seu email"
            valor={email}
            onChange={setEmail}
            tipo="email"
            icon={<Mail className="h-4 w-4 text-primary" />}
          />

          <CampoCadastro
            label="Senha"
            placeholder="insira aqui sua senha"
            valor={senha}
            onChange={setSenha}
            tipo="password"
            icon={<Mail className="h-4 w-4 text-primary" />}
          />

          <CampoCadastro
            label="Confirmar senha"
            placeholder="Confirme aqui sua senha"
            valor={confirmacaoSenha}
            onChange={setConfirmacaoSenha}
            tipo="password"
            icon={<LockKeyhole className="h-4 w-4 text-primary" />}
          />
        </div>

        {/* MENSAGEM DE ERRO */}
        {erro && (
          <p className="mt-2 text-center text-xs font-medium text-danger">
            {erro}
          </p>
        )}

        {/* BOTÃO DE SUBMISSÃO */}
        <button
          type="button"
          disabled={carregando}
          className="mt-6 h-12 w-full max-w-[320px] rounded-full bg-primary text-[18px] font-bold text-white shadow-md hover:opacity-95 disabled:opacity-50 transition-opacity"
          onClick={handleCadastrar}
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {/* LINK PARA LOGIN */}
        <div className="mt-3 text-center text-[13px] text-black">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-bold text-primary underline"
          >
            Já está cadastrado? Entrar
          </button>
        </div>

        {/* RODAPÉ */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-2">
          <img
            src={brasao}
            alt="Brasão da Prefeitura de Registro"
            className="h-8 w-8 object-contain"
          />
          <img
            src={logoFatec}
            alt="Fatec Registro"
            className="h-6 object-contain"
          />
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
