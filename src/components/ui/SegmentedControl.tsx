import React from 'react';

interface SegmentedControlProps {
  options: string[];
  activeOption: string;
  onChange: (option: string) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  activeOption,
  onChange,
}) => {
  return (
    <div className="inline-flex bg-blue-50 p-1 rounded-full border border-blue-100">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            px-6 py-2 text-sm font-semibold rounded-full transition-all
            ${
              activeOption === option
                ? 'bg-[#0073a9] text-white shadow-md'
                : 'text-[#0073a9] hover:bg-blue-100/50'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
