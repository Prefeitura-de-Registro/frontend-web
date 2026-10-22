import { useState } from 'react';
import {
  ChevronLeft,
  Bell,
  Edit3,
  SlidersHorizontal,
  EyeOff,
} from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { BottomNav } from '../../components/ui/BottomNav';
import { Stepper } from '../../components/ui/Stepper';
import StepperFormulario, {
  type TipoIconeFormulario,
} from '../../components/ui/StepperFormulario';
import { TabsListagem } from '../../components/ui/TabsListagem';
import { SimNaoButton } from '../../components/ui/SimNaoButton';
import { StatusPill } from '../../components/ui/StatusPill';
import { CategoriaCard } from '../../components/ui/CategoriaCard';

export default function TesteComponentes() {
  const [abaAtiva, setAbaAtiva] = useState<'enviadas' | 'recebidas'>(
    'enviadas',
  );
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('buraco');
  const [navAtiva, setNavAtiva] = useState<string>('inicio');
  const [etapaFormulario] = useState<TipoIconeFormulario>('endereco');

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-[#0073a9]">
            Componentes UX - Fala Registro!
          </h1>
        </header>

        {/* BOTÕES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase">Botões</h2>

          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="icon" icon={ChevronLeft} aria-label="Voltar" />
            <Button
              variant="icon"
              icon={Bell}
              hasNotification
              aria-label="Notificações"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="solid" icon={Edit3}>
              Editar
            </Button>
            <Button variant="solid">Atender chamado</Button>
            <Button variant="dark" icon={EyeOff}>
              Entrar Anônimo
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="outline">Próximo</Button>
            <Button variant="outline" icon={SlidersHorizontal}>
              Filtrar
            </Button>
            <Button variant="outline">Logar</Button>
            <Button variant="outline">Solicitar</Button>
          </div>
        </div>

        {/* STEPPER */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase">
            Stepper
          </h2>
          <Stepper currentStep={2} />
        </div>

        {/* STEPPER FORMULÁRIO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase">
            Stepper Formulário
          </h2>
          <StepperFormulario etapaAtual={etapaFormulario} />
        </div>

        {/* CATEGORIAS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase">
            Categorias
          </h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            <CategoriaCard
              tipo="buraco"
              isActive={categoriaAtiva === 'buraco'}
              onClick={() => setCategoriaAtiva('buraco')}
            />
            <CategoriaCard
              tipo="poda"
              isActive={categoriaAtiva === 'poda'}
              onClick={() => setCategoriaAtiva('poda')}
            />
            <CategoriaCard
              tipo="luz"
              isActive={categoriaAtiva === 'luz'}
              onClick={() => setCategoriaAtiva('luz')}
            />
            <CategoriaCard
              tipo="vazamento"
              isActive={categoriaAtiva === 'vazamento'}
              onClick={() => setCategoriaAtiva('vazamento')}
            />
          </div>
        </div>

        {/* ABAS E SIM/NÃO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase">
              Filtros (Abas)
            </h2>
            <TabsListagem activeTab={abaAtiva} onChange={setAbaAtiva} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase">
              Ações Sim/Não
            </h2>
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-full">
                <SimNaoButton tipo="sim" variante="solid" />
                <SimNaoButton tipo="sim" variante="outline" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <SimNaoButton tipo="nao" variante="solid" />
                <SimNaoButton tipo="nao" variante="outline" />
              </div>
            </div>
          </div>
        </div>

        {/* STATUS PILLS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase">Status</h2>
          <div className="flex flex-wrap gap-3">
            <StatusPill status="nova_solicitacao" />
            <StatusPill status="atendimento" />
            <StatusPill status="aberto" />
            <StatusPill status="concluido" />
            <StatusPill status="aprovada" />
            <StatusPill status="recusada" />
          </div>
        </div>
      </div>

      <BottomNav activeTab={navAtiva} onTabChange={setNavAtiva} />
    </div>
  );
}
