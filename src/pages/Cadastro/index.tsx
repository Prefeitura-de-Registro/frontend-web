// import { useState } from 'react';
//import { Mail, LockKeyhole, User, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ButtonBack from '../../components/ui/ButtonBack';
// import Button from '../../components/ui/Button';

import degradeRegistro from '../../assets/degrade.svg';
// import logoFatec from '../../assets/logo_fatec_de_registro.png';

// interface CampoCadastroProps {
//   placeholder: string;
//   valor: string;
//   onChange: (valor: string) => void;
//   tipo?: 'text' | 'email' | 'password';
//   icon: React.ReactNode;
// }

// function CampoCadastro({
//   placeholder,
//   valor,
//   onChange,
//   tipo = 'text',
//   icon,
// }: CampoCadastroProps) {
//   return (
//     <div className="relative w-full">
//       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
//         {icon}
//       </div>

//       <input
//         type={tipo}
//         value={valor}
//         onChange={(event) => onChange(event.target.value)}
//         placeholder={placeholder}
//         className="h-[52px] w-full rounded-full border border-primary bg-tertiary pl-14 pr-12 text-base text-black outline-none placeholder:text-primary"
//       />

//       {valor && (
//         <button
//           type="button"
//           onClick={() => onChange('')}
//           aria-label={`Limpar campo ${placeholder}`}
//           className="absolute right-5 top-1/2 -translate-y-1/2 text-primary"
//         >
//           <X className="h-5 w-5" strokeWidth={2.5} />
//         </button>
//       )}
//     </div>
//   );
// }

function Cadastro() {
  const navigate = useNavigate();

  //   const [nome, setNome] = useState('');
  //   const [cpf, setCpf] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [senha, setSenha] = useState('');
  //   const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
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
          className="mt-16"
        />

        <div className="flex flex-col items-center text-center">
          <h1 className="text-[32px] font-normal leading-[1.05] text-black">
            Crie a
            <br />
            <span className="text-[40px] font-bold text-primary">
              sua conta!
            </span>
          </h1>

          <div className="mt-1 h-[0.8px] w-[200px] rounded-full bg-primary" />
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
