import React from 'react';
import { AlertTriangle, MapPin, UploadCloud } from 'lucide-react';

interface StepperProps {
  currentStep: 1 | 2 | 3;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, icon: AlertTriangle },
    { id: 2, icon: MapPin },
    { id: 3, icon: UploadCloud },
  ];

  return (
    <div className="relative flex items-center justify-between w-full max-w-[280px] mx-auto py-4 px-2">
      {/* Linha conectora posicionada perfeitamente entre as bordas dos círculos */}
      <div className="absolute top-1/2 left-[44px] right-[44px] h-[2px] bg-white/40 -translate-y-1/2 z-0" />

      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isPassed = currentStep > step.id;

        return (
          <div
            key={step.id}
            className="relative z-10 flex items-center justify-center"
          >
            {isActive ? (
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300">
                <Icon size={24} className="text-[#0085C1]" strokeWidth={2.2} />
              </div>
            ) : isPassed ? (
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300">
                <Icon size={22} className="text-[#0085C1]" strokeWidth={2.2} />
              </div>
            ) : (
              <div className="w-11 h-11 bg-[#0085C1] border-2 border-white/80 rounded-full flex items-center justify-center shadow-sm transition-all duration-300">
                <Icon size={20} className="text-white" strokeWidth={2} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
