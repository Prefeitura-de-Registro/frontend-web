import { Outlet } from 'react-router-dom';
import headerwave from '../../assets/img/header-wave.png';
import footerwave from '../../assets/img/footer-wave.png';
import brasaoregistro from '../../assets/brasao_prefeitura_de_registro.png';
import fatecregistro from '../../assets/logo_fatec_de_registro.png';

export function StandardLayout() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen bg-[#f8fafc] overflow-hidden px-6 py-8 font-sans">
      <div className="absolute top-0 left-0 pointer-events-none z-0">
        <img
          src={headerwave}
          alt="Detalhe decorativo superior"
          className="w-40 h-auto object-contain"
        />
      </div>

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto z-10 my-auto">
        <Outlet />
      </main>

      <div className="absolute bottom-0 right-0 pointer-events-none z-0">
        <img
          src={footerwave}
          alt="Detalhe decorativo inferior"
          className="w-40 h-auto object-contain"
        />
      </div>

      <footer className="flex items-center justify-center gap-1 mt-6 z-10">
        <img
          src={brasaoregistro}
          alt="Prefeitura de Registro"
          className="h-6 w-auto object-contain"
        />
        <span className="text-slate-300 font-light">|</span>
        <img
          src={fatecregistro}
          alt="Fatec Registro"
          className="h-5 w-auto object-contain"
        />
      </footer>
    </div>
  );
}

export default StandardLayout;
