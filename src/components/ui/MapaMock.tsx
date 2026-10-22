import { useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const POSICAO_INICIAL: [number, number] = [-24.4883, -47.8436];

function ControllerMapa({
  onPositionChange,
}: {
  onPositionChange?: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      if (onPositionChange) {
        onPositionChange(center.lat, center.lng);
      }
    },
  });

  return null;
}

interface MapaMockProps {
  onPositionChange?: (lat: number, lng: number) => void;
}

export function MapaMock({ onPositionChange }: MapaMockProps) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={POSICAO_INICIAL}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ControllerMapa onPositionChange={onPositionChange} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default MapaMock;
