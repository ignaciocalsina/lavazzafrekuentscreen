import { useApp } from '@/context/AppContext';
import { Coffee } from 'lucide-react';

const CoffeeIdleScreen = () => {
  const { navigate } = useApp();
  return (
    <button
      onClick={() => navigate('coffee_loading', 'coffee')}
      className="screen-enter flex flex-col flex-1 items-center justify-center gap-3 w-full h-full active:scale-[0.99] transition-transform"
      aria-label="Pedir Cappuccino"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Coffee className="w-10 h-10 text-primary" strokeWidth={1.8} />
      </div>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Café del día</p>
        <h1 className="text-2xl font-extrabold leading-tight mt-0.5">Cappuccino</h1>
        <p className="text-3xl font-extrabold text-primary tabular-nums mt-1">3,50 €</p>
      </div>
      <p className="text-xs text-muted-foreground animate-pulse mt-1">Toca para pedir</p>
    </button>
  );
};

export default CoffeeIdleScreen;
