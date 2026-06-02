import { Minus, Plus } from 'lucide-react';

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}

const QuantityStepper: React.FC<Props> = ({ value, onChange, min = 1, max = 20 }) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={dec}
        disabled={value <= min}
        className="w-12 h-12 rounded-full bg-card border-2 border-border flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all hover:border-primary/50"
        aria-label="Quitar unidad"
      >
        <Minus className="w-5 h-5" />
      </button>
      <span className="w-16 text-center text-4xl font-extrabold tabular-nums leading-none">
        {value}
      </span>
      <button
        onClick={inc}
        disabled={value >= max}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center active:scale-95 disabled:opacity-40 transition-all"
        aria-label="Añadir unidad"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuantityStepper;
