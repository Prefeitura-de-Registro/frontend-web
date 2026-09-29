import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logoFalaRegistro from '../../assets/logo-fala-registro.svg';
import formaSuperior from '../../assets/splash-forma-superior.svg';
import formaInferior from '../../assets/splash-forma-inferior.svg';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F2F2F2]">
      <img src={formaSuperior} alt="" className="absolute left-0 top-0" />

      <img
        src={logoFalaRegistro}
        alt="Fala Registro!"
        className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2"
      />

      <img src={formaInferior} alt="" className="absolute bottom-0 right-0" />
    </main>
  );
}

export default Splash;
