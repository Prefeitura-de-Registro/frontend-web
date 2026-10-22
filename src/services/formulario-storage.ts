const NOME_BANCO = 'sla-prefeitura';
const NOME_ARMAZENAMENTO = 'formulario';
const VERSAO_BANCO = 1;
const CHAVE_FORMULARIO = 'rascunho';

function abrirBanco(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const requisicao = indexedDB.open(NOME_BANCO, VERSAO_BANCO);
    requisicao.onupgradeneeded = () => {
      const banco = requisicao.result;

      if (!banco.objectStoreNames.contains(NOME_ARMAZENAMENTO)) {
        banco.createObjectStore(NOME_ARMAZENAMENTO);
      }
    };

    requisicao.onsuccess = () => resolve(requisicao.result);
    requisicao.onerror = () => reject(requisicao.error);
  });
}

export async function salvarFormulario<T>(dados: T): Promise<void> {
  const banco = await abrirBanco();

  try {
    await new Promise<void>((resolve, reject) => {
      const trasacao = banco.transaction(NOME_ARMAZENAMENTO, 'readwrite');
      const armazernamento = trasacao.objectStore(NOME_ARMAZENAMENTO);

      armazernamento.put(dados, CHAVE_FORMULARIO);

      trasacao.oncomplete = () => resolve();
      trasacao.onerror = () => reject(trasacao.error);
      trasacao.onabort = () => reject(trasacao.error);
    });
  } finally {
    banco.close();
  }
}

export async function recuperarFormulario<T>(): Promise<T | null> {
  const banco = await abrirBanco();

  try {
    return await new Promise<T | null>((resolve, reject) => {
      const transacao = banco.transaction(NOME_ARMAZENAMENTO, 'readonly');
      const requisicao = transacao
        .objectStore(NOME_ARMAZENAMENTO)
        .get(CHAVE_FORMULARIO);

      requisicao.onsuccess = () => resolve((requisicao.result as T) ?? null);
      requisicao.onerror = () => reject(requisicao.error);
    });
  } finally {
    banco.close();
  }
}

export async function limparFormularioSalvo(): Promise<void> {
  const banco = await abrirBanco();

  try {
    await new Promise<void>((resolve, reject) => {
      const transacao = banco.transaction(NOME_ARMAZENAMENTO, 'readwrite');

      transacao.objectStore(NOME_ARMAZENAMENTO).delete(CHAVE_FORMULARIO);

      transacao.oncomplete = () => resolve();
      transacao.onerror = () => reject(transacao.error);
      transacao.onabort = () => reject(transacao.error);
    });
  } finally {
    banco.close();
  }
}
