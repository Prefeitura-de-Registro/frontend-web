import fatec from '../../assets/logo_fatec_de_registro.png';
import registro from '../../assets/brasao_prefeitura_de_registro.png';

export function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center gap-3 mt-auto">
      {/* Substitua os srcs pelos caminhos reais das imagens na pasta assets */}
      <img
        src={registro}
        alt="Prefeitura de Registro"
        className="h-10 object-contain"
      />
      <img src={fatec} alt="Fatec Registro" className="h-8 object-contain" />
    </footer>
  );
}
