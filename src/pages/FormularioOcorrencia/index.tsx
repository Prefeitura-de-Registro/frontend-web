import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { GradientHeader } from '../../components/ui/GradientHeader';
import StepperFormulario from '../../components/ui/StepperFormulario';
import Select from '../../components/ui/Select';
import CampoTextoArea from '../../components/ui/CampoTextoArea';
import RadioButton from '../../components/ui/RadioButton';
import ButtonLarger from '../../components/ui/ButtonLarger';
import { Footer } from '../../components/ui/Footer';

export function FormularioOcorrencia() {
  const navigate = useNavigate();

  const opcoesOcorrencia = [
    { value: 'Buraco', label: 'Buraco' },
    { value: 'Poda', label: 'Poda' },
    { value: 'Luz', label: 'Luz' },
    { value: 'Vazamento', label: 'Vazamento' },
  ];

  const [tipoOcorrencia, setTipoOcorrencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tamanhoBuraco, setTamanhoBuraco] = useState('medio');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipoOcorrencia) return;
    navigate('/formulario-localizacao');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-white overflow-hidden p-6">
      <GradientHeader />

      <div className="relative z-10 flex-1 flex flex-col max-w-sm mx-auto w-full pt-12">
        {/* Topo com botão voltar e título centralizado */}
        <div className="relative flex items-center justify-center mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 w-10 h-10 rounded-full bg-primary text-secondary flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <p className="text-xs text-primary font-medium">Preencha o</p>
            <h1 className="text-2xl font-bold text-primary leading-tight select-none">
              Formulário
            </h1>
          </div>
        </div>

        {/* Card do Formulário */}
        <div className="bg-secondary/40 rounded-2xl p-5 shadow-sm mb-6">
          <StepperFormulario etapaAtual="ocorrencia" />

          <form onSubmit={handleNext} className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-1.5">
              <label className="block text-xs font-bold text-primary">
                Selecione uma ocorrência:
              </label>
              <Select
                placeholder="Selecione uma opção"
                options={opcoesOcorrencia}
                value={tipoOcorrencia}
                onChange={(value) => setTipoOcorrencia(value)}
              />
            </div>

            {tipoOcorrencia && (
              <>
                <CampoTextoArea
                  label="Descrição:"
                  placeholder="Descreva a ocorrência aqui..."
                  value={descricao}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDescricao(e.target.value)
                  }
                  rows={4}
                />

                {tipoOcorrencia === 'Buraco' && (
                  <div className="bg-white rounded-xl p-4 shadow-xs mt-1">
                    <label className="block text-xs font-bold text-primary mb-2">
                      Tamanho aproximado do buraco:
                    </label>
                    <div className="flex flex-col gap-2">
                      <RadioButton
                        label="pequeno"
                        name="tamanhoBuraco"
                        value="pequeno"
                        checked={tamanhoBuraco === 'pequeno'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTamanhoBuraco(e.target.value)
                        }
                      />
                      <RadioButton
                        label="médio"
                        name="tamanhoBuraco"
                        value="medio"
                        checked={tamanhoBuraco === 'medio'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTamanhoBuraco(e.target.value)
                        }
                      />
                      <RadioButton
                        label="grande"
                        name="tamanhoBuraco"
                        value="grande"
                        checked={tamanhoBuraco === 'grande'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setTamanhoBuraco(e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="mt-2">
                  <ButtonLarger type="submit">Avançar</ButtonLarger>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Unico rodapé da página */}
      <div className="relative z-10 pt-2">
        <Footer />
      </div>
    </div>
  );
}
