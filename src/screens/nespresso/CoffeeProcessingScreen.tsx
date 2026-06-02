import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { FlowBackground, NespressoLogo } from '@/components/NespressoBrand';

const CoffeeProcessingScreen = () => {
  const { navigate } = useApp();
  useEffect(() => {
    const id = setTimeout(() => navigate('coffee_brewing'), 2000);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <FlowBackground />
      <div className="relative z-10 text-center pt-3">
        <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-[5px] border-nes-gold-text/15" />
          <div className="absolute inset-0 rounded-full border-[5px] border-nes-gold-text border-t-transparent animate-spin" />
        </div>
        <p className="font-serif-nes text-white text-lg tracking-[0.08em]">Procesando tu selección…</p>
        <p className="text-nes-gold-text text-[11px] tracking-[0.3em] font-semibold">UN MOMENTO, POR FAVOR</p>
      </div>
    </div>
  );
};

export default CoffeeProcessingScreen;
