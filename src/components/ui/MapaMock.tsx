import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const POSICAO_MOCKADA: [number, number] = [-24.4883, -47.8436];

export function MapaMock() {
  return (
    <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 z-0 relative">
      <MapContainer
        center={POSICAO_MOCKADA}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={POSICAO_MOCKADA}>
          <Popup>Ponto selecionado para a ocorrência</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
