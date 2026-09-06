// src/components/layouts/HomeLayout.tsx
import { Outlet } from 'react-router-dom';
import { Footer } from '../ui/Footer';
import { Bell } from 'lucide-react';
import { GradientHeader } from '../ui/GradientHeader';

export function HomeLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/80 px-6 pt-12 pb-4 overflow-x-hidden">
      {/* Imagem de degradê no topo */}
      <GradientHeader />

      <header className="relative z-10 flex justify-between items-center mb-10 w-full max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
            alt="Perfil do Munícipe"
            className="w-12 h-12 rounded-full border-2 border-sky-600 object-cover shadow-sm"
          />
          <div className="flex flex-col">
            <h1 className="text-sky-900 font-bold text-lg leading-tight">
              Olá, Sabrina!
            </h1>
            <p className="text-slate-700 text-sm font-semibold">
              Como podemos ajudar hoje?
            </p>
          </div>
        </div>
        <button className="bg-sky-600 text-white p-2.5 rounded-full shadow-md hover:bg-sky-700 transition">
          <Bell size={20} strokeWidth={2.5} />
        </button>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-md mx-auto flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
