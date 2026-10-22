import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  ArrowUpNarrowWide,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { Button } from '../../components/ui/Button';
import SearchInput from '../../components/ui/SearchInput';
import { StatusPill } from '../../components/ui/StatusPill';
import { useRequisicao } from '../../hooks/useRequisicao';
import { mensagemDeErro } from '../../services/erros';
import {
  desativarFuncionario,
  listarTodosFuncionarios,
} from '../../services/funcionarios.service';
import type { StatusOperador } from '../../types/operador';

const POR_PAGINA = 6;

type CampoOrdenavel =
  | 'nomeCompleto'
  | 'matricula'
  | 'departamento'
  | 'cargo'
  | 'chamados'
  | 'status';

const COLUNAS: { campo: CampoOrdenavel; label: string }[] = [
  { campo: 'nomeCompleto', label: 'Operador' },
  { campo: 'matricula', label: 'Matrícula' },
  { campo: 'departamento', label: 'Departamento' },
  { campo: 'cargo', label: 'Cargo' },
  { campo: 'chamados', label: 'Chamados' },
  { campo: 'status', label: 'Status' },
];

// Linha exibida na tabela, montada a partir do funcionário devolvido pela API
interface LinhaOperador {
  id: number;
  nomeCompleto: string;
  matricula: string;
  departamento: string;
  cargo: string;
  chamados: number; // chamados atribuídos a ele
  status: StatusOperador;
}

function iniciais(nome: string) {
  return nome
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function Operadores() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [ordem, setOrdem] = useState<{
    campo: CampoOrdenavel;
    direcao: 'asc' | 'desc';
  } | null>(null);

  const [paraDesativar, setParaDesativar] = useState<LinhaOperador | null>(
    null,
  );
  const [desativando, setDesativando] = useState(false);
  const [erroDesativar, setErroDesativar] = useState<string | null>(null);

  const { dados, erro, carregando, recarregar } = useRequisicao(
    listarTodosFuncionarios,
  );

  const operadores = useMemo<LinhaOperador[]>(
    () =>
      (dados ?? []).map((funcionario) => ({
        id: funcionario.id,
        nomeCompleto: funcionario.name,
        matricula: funcionario.matricula ?? '—',
        departamento:
          funcionario.departamentos
            .map((departamento) => departamento.nome)
            .join(', ') || '—',
        cargo: funcionario.cargo ?? '—',
        chamados: funcionario.totalTickets,
        status: funcionario.ativo ? 'ativo' : 'inativo',
      })),
    [dados],
  );

  const operadoresOrdenados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    const filtrados = termo
      ? operadores.filter(
          (o) =>
            o.nomeCompleto.toLowerCase().includes(termo) ||
            o.matricula.toLowerCase().includes(termo) ||
            o.departamento.toLowerCase().includes(termo),
        )
      : [...operadores];

    // sem ordenação escolhida, lista em ordem alfabética
    const { campo, direcao } = ordem ?? {
      campo: 'nomeCompleto' as CampoOrdenavel,
      direcao: 'asc' as const,
    };

    return filtrados.sort((a, b) => {
      const va = a[campo];
      const vb = b[campo];
      const cmp =
        typeof va === 'number' && typeof vb === 'number'
          ? va - vb
          : String(va).localeCompare(String(vb), 'pt-BR');
      return direcao === 'asc' ? cmp : -cmp;
    });
  }, [operadores, busca, ordem]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(operadoresOrdenados.length / POR_PAGINA),
  );
  const paginaAtual = Math.min(pagina, totalPaginas);
  const operadoresDaPagina = operadoresOrdenados.slice(
    (paginaAtual - 1) * POR_PAGINA,
    paginaAtual * POR_PAGINA,
  );

  function ordenarPor(campo: CampoOrdenavel) {
    setOrdem((atual) =>
      atual?.campo === campo
        ? { campo, direcao: atual.direcao === 'asc' ? 'desc' : 'asc' }
        : { campo, direcao: 'asc' },
    );
    setPagina(1);
  }

  async function confirmarDesativacao() {
    if (!paraDesativar) return;

    setDesativando(true);
    setErroDesativar(null);

    try {
      await desativarFuncionario(paraDesativar.id);
      setParaDesativar(null);
      recarregar();
    } catch (erroRequisicao) {
      setErroDesativar(
        mensagemDeErro(
          erroRequisicao,
          'Não foi possível desativar o operador.',
        ),
      );
    } finally {
      setDesativando(false);
    }
  }

  return (
    <div className="px-10 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Operadores</h1>

        <div className="flex items-center gap-4">
          <SearchInput
            placeholder="Buscar operador..."
            wrapperClassName="rounded-full max-w-[260px]"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setPagina(1);
            }}
          />
          <Button
            icon={Plus}
            onClick={() => navigate('novo')}
            className="px-5 py-2 text-sm rounded-lg"
          >
            Novo
          </Button>
        </div>
      </div>

      <div
        className={`mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ${carregando && dados ? 'opacity-60' : ''}`}
      >
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-primary">
            <tr>
              {COLUNAS.map((col, i) => (
                <th
                  key={col.campo}
                  className={`py-4 font-medium ${i === 0 ? 'px-6' : 'px-4'}`}
                >
                  <button
                    type="button"
                    onClick={() => ordenarPor(col.campo)}
                    className="inline-flex items-center gap-2"
                  >
                    {col.label}
                    <ArrowUpNarrowWide
                      className={`h-3.5 w-3.5 transition-transform ${
                        ordem?.campo === col.campo && ordem.direcao === 'desc'
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </th>
              ))}
              <th className="px-4 py-4 text-center font-medium">Ações</th>
            </tr>
          </thead>

          <tbody>
            {operadoresDaPagina.map((op) => (
              <tr
                key={op.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary text-xs font-bold text-primary">
                      {iniciais(op.nomeCompleto)}
                    </span>
                    <span className="font-bold text-slate-800">
                      {op.nomeCompleto}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded bg-gray-100 px-2 py-1 font-mono text-xs text-gray-500">
                    {op.matricula}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{op.departamento}</td>
                <td className="px-4 py-3 text-slate-700">{op.cargo}</td>
                <td className="px-4 py-3 font-bold text-slate-800">
                  {op.chamados}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={op.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      aria-label="Visualizar operador"
                      className="text-primary"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Editar operador"
                      className="text-warning"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Desativar operador"
                      title={
                        op.status === 'inativo'
                          ? 'Operador já está inativo'
                          : 'Desativar operador'
                      }
                      disabled={op.status === 'inativo'}
                      onClick={() => {
                        setErroDesativar(null);
                        setParaDesativar(op);
                      }}
                      className="text-danger disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {erro && (
          <div className="space-y-3 py-8 text-center">
            <p className="text-sm text-danger">{erro}</p>
            <button
              type="button"
              onClick={recarregar}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!erro && !dados && carregando && (
          <p className="py-8 text-center text-gray-500">
            Carregando operadores...
          </p>
        )}

        {!erro && dados && operadoresOrdenados.length === 0 && (
          <p className="py-8 text-center text-gray-500">
            Nenhum operador encontrado.
          </p>
        )}

        <div className="flex items-center justify-between bg-gray-50 px-6 py-3">
          <p className="text-xs text-gray-500">
            {operadoresDaPagina.length} de {operadoresOrdenados.length}{' '}
            operadores
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Página anterior"
              disabled={paginaAtual === 1}
              onClick={() => setPagina(paginaAtual - 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-400 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPagina(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                  n === paginaAtual
                    ? 'bg-primary text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              aria-label="Próxima página"
              disabled={paginaAtual === totalPaginas}
              onClick={() => setPagina(paginaAtual + 1)}
              className="flex h-8 w-8 items-center justify-center text-gray-400 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {paraDesativar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(evento) => {
            if (evento.target === evento.currentTarget && !desativando) {
              setParaDesativar(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="desativar-operador-titulo"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="desativar-operador-titulo"
              className="text-lg font-bold text-primary"
            >
              Desativar operador
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              Deseja desativar <strong>{paraDesativar.nomeCompleto}</strong>?
              Ele não conseguirá mais entrar no sistema. O histórico de chamados
              é mantido.
            </p>

            {erroDesativar && (
              <p className="mt-3 text-sm text-danger">{erroDesativar}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={desativando}
                onClick={() => setParaDesativar(null)}
                className="rounded-lg border-transparent bg-gray-100 px-6 py-2.5 text-sm text-slate-700 hover:bg-gray-200"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={desativando}
                onClick={confirmarDesativacao}
                className="rounded-lg px-6 py-2.5 text-sm"
              >
                {desativando ? 'Desativando...' : 'Desativar'}
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Operadores;
