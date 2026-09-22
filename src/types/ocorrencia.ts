// interface base para todos as ocorrências
interface OcorrenciaBase {
  id: string;
  sla: string;
  estado: 'urgente' | 'médio' | 'normal';
  status: 'aberto' | 'em andamento' | 'concluído';
  descricao: string;
  endereco: string;
  foto: string;
  createdAt: string;
}

// uso do atributo 'tipo' para obter as especificidades da ocorrência
interface OcorrenciaBuraco extends OcorrenciaBase {
  tipo: 'buraco';
  tamanhoBuraco: 'pequeno' | 'médio' | 'grande';
  riscoAcidente: boolean;
}

interface OcorrenciaPoda extends OcorrenciaBase {
  tipo: 'poda';
  alturaArvore: number;
  proximaFiacao: boolean;
}

interface OcorrenciaVazamento extends OcorrenciaBase {
  tipo: 'vazamento';
  tipoVazamento: 'água' | 'esgoto';
  volumeEstimado?: string;
}

interface OcorrenciaLuz extends OcorrenciaBase {
  tipo: 'luz';
  quantidadePostes: number;
}

// O tipo 'Ocorrencias' é o qual deve ser usado nos outros arquivos
export type Ocorrencias =
  OcorrenciaBuraco | OcorrenciaPoda | OcorrenciaVazamento | OcorrenciaLuz;
