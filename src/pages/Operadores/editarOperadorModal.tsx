import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { ChevronDown, X } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import type { NivelPermissao, Operador } from '../../types/operador';
import { atualizarOperador, excluirOperador } from './operadorService';

const DEPARTAMENTOS = [
  { value: 'Suporte N1', label: 'Suporte N1' },
  { value: 'Suporte N2', label: 'Suporte N2' },
  { value: 'Infraestrutura', label: 'Infraestrutura' },
  { value: 'Redes', label: 'Redes' },
];

const NIVEIS = [
  { value: 'visualizacao', label: 'Visualização' },
  { value: 'operador_standard', label: 'Operador Standard' },
  { value: 'administrador_local', label: 'Administrador Local' },
];

const TIPOS_FOTO = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_FOTO_BYTES = 10 * 1024 * 1024;

const inputClass =
  'h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:outline-none focus:border-primary';

function Linha({
  label,
  htmlFor,
  erro,
  children,
}: {
  label: string;
  htmlFor?: string;
  erro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <label htmlFor={htmlFor} className="text-sm font-bold text-slate-800">
        {label}
      </label>
      <div>
        {children}
        {erro && <p className="mt-1 text-sm text-danger">{erro}</p>}
      </div>
    </>
  );
}

function CampoSelect({
  id,
  value,
  onChange,
  opcoes,
}: {
  id: string;
  value: string;
  onChange: (valor: string) => void;
  opcoes: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10`}
      >
        {opcoes.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
    </div>
  );
}

function Toggle({
  ligado,
  onChange,
}: {
  ligado: boolean;
  onChange: (valor: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!ligado)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        ligado ? 'bg-primary' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          ligado ? 'left-[22px]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

interface EditarOperadorModalProps {
  operador: Operador;
  onFechar: () => void;
  onAlterado: () => void; // recarrega após qualquer alteração na tabela
}

function EditarOperadorModal({
  operador,
  onFechar,
  onAlterado,
}: EditarOperadorModalProps) {
  // Os campos são preenchidos com os valores do mock até o momento (passado pelos props)
  const [form, setForm] = useState({
    nomeCompleto: operador.nomeCompleto,
    matricula: operador.matricula,
    departamento: operador.departamento,
    cargo: operador.cargo,
  });
  const [ativo, setAtivo] = useState(operador.status === 'ativo');
  const [nivel, setNivel] = useState<string>(
    operador.nivelPermissao ?? 'visualizacao',
  );
  const [foto, setFoto] = useState<string | undefined>(operador.foto);

  const [erros, setErros] = useState<Record<string, string>>({});
  const [erroGeral, setErroGeral] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  // Esc: com a confirmação aberta fecha só ela, senão fecha o modal
  useEffect(() => {
    function aoPressionar(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (confirmandoExclusao) {
        setConfirmandoExclusao(false);
      } else {
        onFechar();
      }
    }
    window.addEventListener('keydown', aoPressionar);
    return () => window.removeEventListener('keydown', aoPressionar);
  }, [onFechar, confirmandoExclusao]);

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
    if (!form.nomeCompleto.trim()) novosErros.nomeCompleto = 'Informe o nome.';
    if (!form.matricula.trim()) novosErros.matricula = 'Informe a matrícula.';
    if (!form.cargo.trim()) novosErros.cargo = 'Informe o cargo.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function handleSalvar(e: FormEvent) {
    e.preventDefault();
    setErroGeral('');

    if (!validar()) return;

    setSalvando(true);
    try {
      const resultado = await atualizarOperador(operador.id, {
        nomeCompleto: form.nomeCompleto.trim(),
        matricula: form.matricula.trim(),
        departamento: form.departamento,
        cargo: form.cargo.trim(),
        status: ativo ? 'ativo' : 'inativo',
        nivelPermissao: nivel as NivelPermissao,
        foto,
      });

      if (!resultado.ok) {
        setErroGeral(resultado.erro);
        return;
      }

      onAlterado();
      onFechar();
    } catch {
      setErroGeral('Erro ao salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  }

  async function handleExcluir() {
    setErroGeral('');
    setExcluindo(true);
    try {
      const resultado = await excluirOperador(operador.id);

      if (!resultado.ok) {
        setErroGeral(resultado.erro);
        setConfirmandoExclusao(false);
        return;
      }

      onAlterado();
      onFechar();
    } catch {
      setErroGeral('Erro ao excluir. Tente novamente.');
      setConfirmandoExclusao(false);
    } finally {
      setExcluindo(false);
    }
  }

  const ocupado = salvando || excluindo;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onFechar();
      }}
    >
      <form
        onSubmit={handleSalvar}
        className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-10 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary">Editar Operador</h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="text-primary"
          >
            <X className="h-8 w-8" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 p-8">
          <div className="flex gap-8">
            <div className="w-[180px] shrink-0">
              <p className="text-sm font-bold text-slate-800">Foto do Perfil</p>
              <div className="mt-3 flex flex-col items-center gap-3">
                {foto ? (
                  <img
                    src={foto}
                    alt={form.nomeCompleto}
                    className="h-24 w-24 rounded-full border-[3px] border-primary object-cover"
                  />
                ) : (
                  <span className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-primary bg-tertiary text-3xl font-bold text-primary">
                    {form.nomeCompleto.charAt(0).toUpperCase()}
                  </span>
                )}
                <label
                  htmlFor="foto-editar"
                  className="cursor-pointer text-sm font-medium text-primary"
                >
                  Alterar foto
                </label>
                <input
                  id="foto-editar"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFoto}
                  className="hidden"
                />
              </div>
              {erros.foto && (
                <p className="mt-1 text-center text-xs text-danger">
                  {erros.foto}
                </p>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-5">
              <div>
                <label
                  htmlFor="editar-nome"
                  className="text-xs font-bold text-slate-800"
                >
                  Nome
                </label>
                <input
                  id="editar-nome"
                  className={`${inputClass} mt-1.5`}
                  value={form.nomeCompleto}
                  onChange={(e) => atualizar('nomeCompleto', e.target.value)}
                />
                {erros.nomeCompleto && (
                  <p className="mt-1 text-sm text-danger">
                    {erros.nomeCompleto}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="editar-matricula"
                  className="text-xs font-bold text-slate-800"
                >
                  Matrícula
                </label>
                <input
                  id="editar-matricula"
                  className={`${inputClass} mt-1.5`}
                  value={form.matricula}
                  onChange={(e) => atualizar('matricula', e.target.value)}
                />
                {erros.matricula && (
                  <p className="mt-1 text-sm text-danger">{erros.matricula}</p>
                )}
              </div>
            </div>
          </div>

          {/* Linhas com rótulo à esquerda */}
          <div className="mt-8 grid grid-cols-[180px_1fr] items-center gap-x-8 gap-y-6">
            <Linha label="Departamento" htmlFor="editar-departamento">
              <CampoSelect
                id="editar-departamento"
                value={form.departamento}
                onChange={(v) => atualizar('departamento', v)}
                opcoes={DEPARTAMENTOS}
              />
            </Linha>

            <Linha label="Cargo" htmlFor="editar-cargo" erro={erros.cargo}>
              <input
                id="editar-cargo"
                className={inputClass}
                value={form.cargo}
                onChange={(e) => atualizar('cargo', e.target.value)}
              />
            </Linha>

            <Linha label="Status">
              <div className="flex items-center gap-3">
                <Toggle ligado={ativo} onChange={setAtivo} />
                <span
                  className={`text-sm font-bold ${
                    ativo ? 'text-success' : 'text-gray-500'
                  }`}
                >
                  {ativo ? 'Ativo' : 'Inativo'}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-500">Status da conta</span>
              </div>
            </Linha>

            <Linha label="Nível de permissão" htmlFor="editar-nivel">
              <CampoSelect
                id="editar-nivel"
                value={nivel}
                onChange={setNivel}
                opcoes={NIVEIS}
              />
            </Linha>
          </div>
        </div>

        {erroGeral && <p className="mt-4 text-sm text-danger">{erroGeral}</p>}

        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={() => setConfirmandoExclusao(true)}
            disabled={ocupado}
            className="whitespace-nowrap text-sm font-medium text-danger disabled:opacity-50"
          >
            Excluir Operador
          </button>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={ocupado}
              className="whitespace-nowrap rounded-lg px-6 py-2.5 text-sm"
            >
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onFechar}
              disabled={ocupado}
              className="whitespace-nowrap rounded-lg border-gray-300 bg-white px-6 py-2.5 text-sm text-slate-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>

      {/* Confirmação de exclusão */}
      {confirmandoExclusao && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !excluindo) {
              setConfirmandoExclusao(false);
            }
          }}
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-primary">
              Excluir operador?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Você está prestes a excluir{' '}
              <strong className="text-slate-800">
                {operador.nomeCompleto}
              </strong>
              . Essa ação não pode ser desfeita.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmandoExclusao(false)}
                disabled={excluindo}
                className="rounded-lg border-gray-300 bg-white px-5 py-2 text-sm text-slate-700 hover:bg-gray-50"
              >
                Cancelar
              </Button>
              <button
                type="button"
                onClick={handleExcluir}
                disabled={excluindo}
                className="rounded-lg bg-danger px-5 py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {excluindo ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditarOperadorModal;
