import { useCallback, useEffect, useState } from 'react';
import { mensagemDeErro } from '../services/erros';

interface EstadoRequisicao<T> {
  origem: (() => Promise<T>) | null;
  tentativa: number;
  dados: T | null;
  erro: string | null;
}

/**
 * Executa `buscar` sempre que ela mudar. Passe uma função estável (useCallback)
 * cujas dependências sejam os filtros da tela.
 *
 * Enquanto a nova resposta não chega, `dados` mantém o valor anterior e
 * `carregando` fica true (a lista não "pisca" ao trocar de página).
 */
export function useRequisicao<T>(buscar: () => Promise<T>) {
  const [tentativa, setTentativa] = useState(0);
  const [estado, setEstado] = useState<EstadoRequisicao<T>>({
    origem: null,
    tentativa: 0,
    dados: null,
    erro: null,
  });

  useEffect(() => {
    let ativo = true;

    buscar()
      .then((dados) => {
        if (ativo) setEstado({ origem: buscar, tentativa, dados, erro: null });
      })
      .catch((erro: unknown) => {
        if (ativo) {
          setEstado((anterior) => ({
            origem: buscar,
            tentativa,
            dados: anterior.dados,
            erro: mensagemDeErro(erro, 'Não foi possível carregar os dados.'),
          }));
        }
      });

    return () => {
      ativo = false;
    };
  }, [buscar, tentativa]);

  const recarregar = useCallback(() => setTentativa((valor) => valor + 1), []);

  const pronto = estado.origem === buscar && estado.tentativa === tentativa;

  return {
    dados: estado.dados,
    erro: pronto ? estado.erro : null,
    carregando: !pronto,
    recarregar,
  };
}
