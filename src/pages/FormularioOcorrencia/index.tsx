import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RadioButton from '../../components/ui/RadioButton';
import SelectCustomizado from '../../components/ui/SelectCustomizado';

export function FormularioOcorrencia() {
  const navigate = useNavigate();

  const [tipoOcorrencia, setTipoOcorrencia] = useState('vazamento');
  const [descricao, setDescricao] = useState('');
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [paginaPergunta, setPaginaPergunta] = useState(0);

  const opcoesOcorrencia = [
    { label: 'Buraco', value: 'buraco' },
    { label: 'Poda', value: 'poda' },
    { label: 'Luz', value: 'luz' },
    { label: 'Vazamento', value: 'vazamento' },
  ];

  const nomeOcorrenciaBaixa = tipoOcorrencia.toLowerCase();
  const isLuz = tipoOcorrencia === 'luz';

  const artigo = tipoOcorrencia === 'poda' ? 'da' : 'do';

  const perguntasOcorrencia = [
    {
      titulo: `Tamanho aproximado ${artigo} ${nomeOcorrenciaBaixa}:`,
      campo: `tamanho_${nomeOcorrenciaBaixa}`,
      opcoes: [
        { label: 'pequeno', value: 'pequeno' },
        { label: 'médio', value: 'medio' },
        { label: 'grande', value: 'grande' },
      ],
    },
    {
      titulo: 'Risco de acidente?',
      campo: `risco_${nomeOcorrenciaBaixa}`,
      opcoes: [
        { label: 'sim', value: 'sim' },
        { label: 'não', value: 'nao' },
      ],
    },
  ];

  const isUltimaPergunta = paginaPergunta === perguntasOcorrencia.length - 1;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/formulario/endereco');
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-2 flex flex-col items-center font-sans">
      {/* Card Principal do Formulário */}
      <div className="bg-tertiary rounded-[28px] p-4 shadow-md flex flex-col gap-3 w-full mt-2">
        <form onSubmit={handleNext} className="flex flex-col gap-3 w-full">
          {/* Seletor Customizado */}
          <SelectCustomizado
            label="Selecione uma ocorrência:"
            value={tipoOcorrencia}
            opcoes={opcoesOcorrencia}
            onChange={(novaOpcao) => {
              setTipoOcorrencia(novaOpcao);
              setPaginaPergunta(0);
            }}
          />

          {/* Campo Descrição */}
          <div className="flex flex-col gap-1 w-full">
            <label className="block text-sm font-bold text-primary">
              Descrição:
            </label>
            <textarea
              placeholder="Descreva a ocorrência aqui..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={2}
              className="w-full bg-white text-gray-700 text-sm rounded-xl p-3 shadow-inner border border-gray-100 focus:outline-none resize-none leading-tight"
            />
          </div>

          {/* Card de Perguntas */}
          {!isLuz && (
            <div className="relative bg-secondary rounded-xl p-3.5 shadow-sm border border-gray-200 flex flex-col justify-between">
              <div className="pr-6">
                <label className="block text-sm font-bold text-primary mb-2 leading-snug">
                  {perguntasOcorrencia[paginaPergunta].titulo}
                </label>
                <div className="flex flex-col gap-1.5">
                  {perguntasOcorrencia[paginaPergunta].opcoes.map((opcao) => {
                    const campo = perguntasOcorrencia[paginaPergunta].campo;
                    return (
                      <RadioButton
                        key={opcao.value}
                        label={opcao.label}
                        name={campo}
                        value={opcao.value}
                        checked={respostas[campo] === opcao.value}
                        onChange={() =>
                          setRespostas((prev) => ({
                            ...prev,
                            [campo]: opcao.value,
                          }))
                        }
                      />
                    );
                  })}
                </div>
              </div>

              {/* Seta do carrossel */}
              <button
                type="button"
                onClick={() =>
                  setPaginaPergunta((prev) =>
                    prev === perguntasOcorrencia.length - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:opacity-75 transition-opacity cursor-pointer p-1"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Indicadores de página */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {perguntasOcorrencia.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 w-2 rounded-full transition-all ${
                      paginaPergunta === idx ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Botão Próximo */}
          {(isLuz || isUltimaPergunta) && (
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="bg-primary hover:opacity-90 text-white font-bold text-sm px-7 py-2 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
              >
                Próximo
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FormularioOcorrencia;
