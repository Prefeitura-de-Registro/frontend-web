import degrade from '../../assets/degrade-registro.png';

export function GradientHeader() {
  return (
    <div className="absolute -top-2 left-0 right-0 bottom-0 h-44 overflow-hidden pointer-events-none">
      <img
        src={degrade}
        alt="Degradê decorativo"
        className="w-full h-full object-cover opacity-90 "
      />
    </div>
  );
}
