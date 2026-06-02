import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { NespressoLogo } from '@/components/NespressoBrand';

const CoffeeBrewingScreen = () => {
  const { navigate } = useApp();
  useEffect(() => {
    const id = setTimeout(() => navigate('coffee_ready'), 3200);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <div className="text-center pt-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        {/* Cup with pour + steam */}
        <div className="relative w-28 h-32">
          {/* steam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1.5">
            <span className="block w-1 h-6 rounded-full bg-white/60 steam-1" />
            <span className="block w-1 h-6 rounded-full bg-white/60 steam-2" />
            <span className="block w-1 h-6 rounded-full bg-white/60 steam-3" />
          </div>
          {/* machine nozzle */}
          <div className="absolute top-7 left-1/2 -translate-x-1/2 w-8 h-2 rounded-b bg-nes-gold-text/70" />
          {/* pour stream */}
          <div className="absolute top-9 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#6b3e1b] to-[#3a200f] animate-pour" />
          {/* cup */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-16 rounded-b-[28px] rounded-t-md bg-gradient-to-b from-white/15 to-white/5 border-2 border-nes-cream/70 overflow-hidden">
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-b from-[#3a200f] to-[#1a0f08]" />
            <div className="absolute top-1 inset-x-2 h-1.5 rounded-full bg-[#caa472]/80" />
          </div>
          {/* handle */}
          <div className="absolute bottom-5 right-0 w-4 h-7 border-2 border-nes-cream/70 rounded-r-full border-l-0" />
          {/* saucer */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full bg-nes-cream/60" />
        </div>
        <h1 className="font-serif-nes text-2xl text-white">Preparando tu pedido…</h1>
        <p className="text-[11px] text-white/75 italic">Tu café Nespresso estará listo en unos segundos.</p>
      </div>
      
    </div>
  );
};

export default CoffeeBrewingScreen;
