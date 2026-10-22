import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import RadioButton from '../../components/ui/RadioButton';
import type { StatusOperador } from '../../types/operador';
import { cadastrarOperador } from './cadastrarOperador';

const DEPARTAMENTOS = ['Suporte N1', 'Suporte N2', 'Infraestrutura', 'Redes'];
const CARGOS = [
  'Analista Jr.',
  'Analista Pleno',
  'Analista Sr.',
  'Técnico Jr.',
  'Técnico Pleno',
  'Especialista',
  'Coordenador',
];

const TIPOS_FOTO = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FOTO_BYTES = 10 * 1024 * 1024;

const inputClass =
  'w-full h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary';

interface CampoProps {
  label: string;
  htmlFor?: string;
  obrigatorio?: boolean;
  erro?: string;
  children: ReactNode;
}

function Campo({ label, htmlFor, obrigatorio, erro, children }: CampoProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-slate-800">
        {label}
        {obrigatorio && ' *'}
      </label>
      {children}
      {erro && <p className="text-sm text-danger">{erro}</p>}
    </div>
  );
}

interface CampoSelectProps {
  id: string;
  value: string;
  onChange: (valor: string) => void;
  opcoes: string[];
  placeholder?: string;
}

function CampoSelect({
  id,
  value,
  onChange,
  opcoes,
  placeholder,
}: CampoSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10 ${
          value ? 'text-gray-800' : 'text-gray-400'
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {opcoes.map((o) => (
          <option key={o} value={o} className="text-gray-800">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
    </div>
  );
}

function NovoOperador() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeCompleto: '',
    matricula: '',
    email: '',
    telefone: '',
    departamento: 'Suporte N1',
    cargo: '',
    status: 'ativo',
  });
  const [foto, setFoto] = useState<string | undefined>();
  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState('');
  const [enviando, setEnviando] = useState(false);

  function atualizar(campo: string, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleFoto(e: ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    if (!TIPOS_FOTO.includes(arquivo.type)) {
      setErros((prev) => ({ ...prev, foto: 'Use PNG, JPG ou WEBP.' }));
      return;
    }
    if (arquivo.size > MAX_FOTO_BYTES) {
      setErros((prev) => ({
        ...prev,
        foto: 'A imagem deve ter no máximo 10 MB.',
      }));
      return;
    }

    setErros((prev) => ({ ...prev, foto: '' }));
    setFoto(URL.createObjectURL(arquivo));
  }

  function validar() {
    const novosErros: Record<string, string> = {};
    if (!form.nomeCompleto.trim())
      novosErros.nomeCompleto = 'Informe o nome completo.';
    if (!form.matricula.trim()) novosErros.matricula = 'Informe a matrícula.';
    if (!form.email.trim()) novosErros.email = 'Informe o e-mail corporativo.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      novosErros.email = 'E-mail inválido.';
    if (!form.cargo) novosErros.cargo = 'Selecione o cargo.';
    // Telefone opcional no Figma. Pra tornar obrigatório:
    // if (!form.telefone.trim()) novosErros.telefone = 'Informe o telefone.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroGeral('');

    if (!validar()) return;

    setEnviando(true);
    try {
      const resultado = await cadastrarOperador({
        ...form,
        status: form.status as StatusOperador,
        foto,
      });

      if (!resultado.ok) {
        setErroGeral(resultado.erro);
        return;
      }

      navigate('/servidor/operadores');
    } catch {
      setErroGeral('Erro ao cadastrar. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="px-10 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl bg-white p-8 shadow-md"
      >
        <p className="mb-2 text-sm font-bold text-slate-800">Foto de Perfil</p>
        <label
          htmlFor="foto-operador"
          className="flex h-28 w-48 cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-xl bg-gray-100"
        >
          {foto ? (
            <img
              src={foto}
              alt="Foto do operador"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <ImageIcon className="h-7 w-7 text-black" />
              <span className="mt-1 text-[11px] font-medium text-slate-700">
                PNG, JPG ou WEBP
              </span>
              <span className="text-[9px] text-gray-500">(máximo 10 MB)</span>
            </>
          )}
        </label>
        <input
          id="foto-operador"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFoto}
          className="hidden"
        />
        {erros.foto && <p className="mt-1 text-sm text-danger">{erros.foto}</p>}

        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
          <Campo
            label="Nome completo"
            htmlFor="nome"
            obrigatorio
            erro={erros.nomeCompleto}
          >
            <input
              id="nome"
              className={inputClass}
              placeholder="Digite o nome completo do operador"
              value={form.nomeCompleto}
              onChange={(e) => atualizar('nomeCompleto', e.target.value)}
            />
          </Campo>

          <Campo
            label="Matrícula"
            htmlFor="matricula"
            obrigatorio
            erro={erros.matricula}
          >
            <input
              id="matricula"
              className={inputClass}
              placeholder="Ex: OP-00123"
              value={form.matricula}
              onChange={(e) => atualizar('matricula', e.target.value)}
            />
          </Campo>

          <Campo
            label="E-mail corporativo"
            htmlFor="email"
            obrigatorio
            erro={erros.email}
          >
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder="nome@empresa.com"
              value={form.email}
              onChange={(e) => atualizar('email', e.target.value)}
            />
          </Campo>

          <Campo
            label="Telefone para contato"
            htmlFor="telefone"
            erro={erros.telefone}
          >
            <input
              id="telefone"
              className={inputClass}
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={(e) => atualizar('telefone', e.target.value)}
            />
          </Campo>

          <Campo label="Departamento" htmlFor="departamento" obrigatorio>
            <CampoSelect
              id="departamento"
              value={form.departamento}
              onChange={(v) => atualizar('departamento', v)}
              opcoes={DEPARTAMENTOS}
            />
          </Campo>

          <Campo label="Cargo" htmlFor="cargo" obrigatorio erro={erros.cargo}>
            <CampoSelect
              id="cargo"
              value={form.cargo}
              onChange={(v) => atualizar('cargo', v)}
              opcoes={CARGOS}
              placeholder="Selecione o cargo"
            />
          </Campo>

          <div>
            <p className="text-sm font-bold text-slate-800">Status inicial *</p>
            <div className="-ml-2.5 -mt-1 flex items-center">
              <RadioButton
                name="status"
                value="ativo"
                label="Ativo"
                checked={form.status === 'ativo'}
                onChange={() => atualizar('status', 'ativo')}
              />
              <RadioButton
                name="status"
                value="inativo"
                label="Inativo"
                checked={form.status === 'inativo'}
                onChange={() => atualizar('status', 'inativo')}
              />
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {erroGeral && (
          <p className="mb-4 text-right text-sm text-danger">{erroGeral}</p>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/servidor/operadores')}
            className="rounded-lg border-transparent bg-gray-100 px-6 py-2.5 text-sm text-slate-700 hover:bg-gray-200"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={enviando}
            className="rounded-lg px-6 py-2.5 text-sm"
          >
            {enviando ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NovoOperador;
