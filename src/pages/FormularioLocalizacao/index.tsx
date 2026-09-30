import { useState, useCallback } from 'react';
import { MapaMock } from '../../components/ui/MapaMock';

export function FormularioLocalizacao() {
  const [endereco, setEndereco] = useState(
    'Bairro Centro, R. Pres; Getúlio Vargas, Número 2...',
  );
  const [carregando, setCarregando] = useState(false);

  const buscarEndereco = useCallback(async (lat: number, lng: number) => {
    setCarregando(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'pt-BR',
          },
        },
      );
      const data = await res.json();

      if (data && data.address) {
        const rua =
          data.address.road ||
          data.address.pedestrian ||
          data.address.suburb ||
          'Rua não identificada';
        const bairro =
          data.address.suburb ||
          data.address.neighbourhood ||
          data.address.city_district ||
          'Centro';
        const numero = data.address.house_number
          ? `, Número ${data.address.house_number}`
          : '';

        setEndereco(`Bairro ${bairro}, R. ${rua}${numero}`);
      } else {
        setEndereco('Localização selecionada');
      }
    } catch {
      setEndereco('Não foi possível obter o endereço');
    } finally {
      setCarregando(false);
    }
  }, []);

  return (
    <div className="relative w-[calc(100%+2rem)] -mx-4 h-[calc(100vh-320px)] min-h-70 flex flex-col justify-end -mb-4">
      <div className="absolute inset-0 z-0 h-full w-full [&>div]:h-full! [&>div]:w-full! [&_.leaflet-container]:h-full! [&_.leaflet-container]:w-full! [&_.leaflet-control-container]:hidden [&_.leaflet-marker-pane]:hidden">
        <MapaMock onPositionChange={buscarEndereco} />
      </div>

      <div className="absolute inset-0 pb-12 pointer-events-none flex items-center justify-center z-10">
        <div className="flex flex-col items-center drop-shadow-md">
          <div className="w-8 h-8 rounded-full bg-primary border-4 border-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div className="w-1.5 h-6 bg-primary rounded-b-full -mt-0.5" />
        </div>
      </div>

      <div className="w-full relative z-20 bg-info py-2.5 px-4 flex flex-col gap-1.5 rounded-t-2xl shadow-lg">
        <p className="text-corpo text-[12px] font-medium text-white! text-center tracking-tight leading-tight">
          Arraste o mapa para mover o marcador
        </p>

        <div className="text-corpo w-full bg-white text-gray-300! px-3.5 py-2 rounded-xl text-[11px] font-normal text-left truncate shadow-inner">
          {carregando ? 'Atualizando endereço...' : endereco}
        </div>
      </div>
    </div>
  );
}

export default FormularioLocalizacao;
