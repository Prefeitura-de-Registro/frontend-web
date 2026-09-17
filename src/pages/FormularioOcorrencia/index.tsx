import { useState } from 'react';
import Select from '../../components/ui/Select';
import CampoTextoArea from '../../components/ui/CampoTextoArea';
import RadioButton from '../../components/ui/RadioButton';

function FormularioOcorrencia() {
  const [ocorrencia, setOcorrencia] = useState('buraco');

  return (
    <div className="w-full max-w-[382px] mx-auto bg-slate-200/80 rounded-[20px] px-7 pt-7 pb-2 shadow-md">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-primary text-base">
            Selecione uma ocorrência:
          </span>

          <Select
            options={[
              {
                label: 'Buraco',
                value: 'buraco',
              },
            ]}
            value={ocorrencia}
            onChange={setOcorrencia}
          />
        </div>

        <CampoTextoArea
          label="Descrição"
          placeholder="Descreva a ocorrência aqui..."
          rows={3}
          className="px-4 py-3"
        />

        <div className="flex flex-col">
          <span className="font-bold text-primary text-base">
            Tamanho aproximado do buraco:
          </span>

          <div className="-my-1">
            <RadioButton name="tamanho" value="5-30cm" label="5 a 30cm" />
          </div>

          <div className="-my-1">
            <RadioButton name="tamanho" value="30cm-1m" label="30cm a 1m" />
          </div>

          <div className="-my-1">
            <RadioButton name="tamanho" value="mais-1m" label="Mais de 1m" />
          </div>
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-primary text-base">
            Localização no leito viário:
          </span>

          <div className="-my-1">
            <RadioButton
              name="localizacao"
              value="pista-rolamento"
              label="Pista de rolamento"
            />
          </div>

          <div className="-my-1">
            <RadioButton name="localizacao" value="rua" label="Rua" />
          </div>

          <div className="-my-1">
            <RadioButton name="localizacao" value="ciclovia" label="Ciclovia" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioOcorrencia;
