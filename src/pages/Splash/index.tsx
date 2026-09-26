import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logoFalaRegistro from '../../assets/logo-fala-registro.svg';

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F2F2F2]">
      <img
        src={logoFalaRegistro}
        alt="Fala Registro!"
        className="w-[280px] max-w-[75%]"
      />
    </main>
  );
}

export default Splash;
