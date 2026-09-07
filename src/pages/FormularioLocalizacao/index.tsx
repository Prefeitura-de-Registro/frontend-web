import CampoTexto from '../../components/ui/CampoTexto';
import { MapaMock } from '../../components/ui/MapaMock';

export function FormularioLocalizacao() {
  return (
    <div className="bg-tertiary p-5 rounded-3xl space-y-3 shadow-sm border border-secondary [&_input]:bg-white [&_input]:border-secondary [&_input]:py-3">
      <CampoTexto label="Bairro" placeholder="Insira o bairro aqui..." />

      <div className="grid grid-cols-2 gap-3">
        <CampoTexto label="Rua" placeholder="Insira a rua aqui..." />
        <CampoTexto label="Número" placeholder="Nº da Rua" />
      </div>

      <CampoTexto
        label="Complemento"
        placeholder="Insira o complemento aqui..."
      />

      <div className="mt-1 space-y-1.5">
        <label className="block text-sm font-bold text-primary">
          Escolha um ponto no mapa:
        </label>
        <div className="h-40 rounded-2xl overflow-hidden [&_>_div]:h-full">
          <MapaMock />
        </div>
      </div>
    </div>
  );
}
