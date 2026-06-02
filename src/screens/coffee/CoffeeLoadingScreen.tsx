import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const CoffeeLoadingScreen = () => {
  const { navigate, setProcessing } = useApp();

  useEffect(() => {
    setProcessing(true);
    const id = setTimeout(() => navigate('coffee_offer'), 2000);
    return () => clearTimeout(id);
  }, [navigate, setProcessing]);

  return (
    <div className="screen-enter flex flex-col flex-1 items-center justify-center gap-4 w-full h-full">
      <div className="w-16 h-16 rounded-full border-[5px] border-primary border-t-transparent animate-spin" />
      <p className="text-sm font-semibold text-muted-foreground">Preparando tu pedido…</p>
    </div>
  );
};

export default CoffeeLoadingScreen;
