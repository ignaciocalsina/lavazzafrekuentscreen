import { useEffect, useState } from 'react';
import coffeeBg from '@/assets/nespresso-coffee-bg.jpg';
import { NespressoLogo, BrandFooter } from '@/components/NespressoBrand';

const SLIDES = [
  { eyebrow: 'EXPERIENCIA', title: 'El mejor café del mundo,', em: 'ahora más fácil que nunca.' },
  { eyebrow: 'TU RITUAL', title: 'Tu café Nespresso,', em: 'siempre a mano.' },
  { eyebrow: 'BONO SEMANAL', title: 'Compra 5 cafés', em: 'y paga solo 4.' },
  { eyebrow: 'BONO MENSUAL', title: 'Paga 15 cafés', em: 'y disfruta 20.' },
  { eyebrow: 'AHORRO', title: 'Asegúrate', em: 'todos los cafés del mes.' },
];

const NespressoAdScreen = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);
  const s = SLIDES[i];
  return (
    <div className="relative flex-1 overflow-hidden bg-nes-coffee">
      <img
        src={coffeeBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns opacity-90"
        width={1280}
        height={768}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
      </div>

      <div key={i} className="absolute inset-0 z-10 flex flex-col items-start justify-center pl-8 pr-[45%] animate-fade-in">
        <p className="text-[9px] tracking-[0.32em] text-nes-gold-text font-semibold mb-2">{s.eyebrow}</p>
        <h2 className="font-serif-nes text-[28px] leading-[1.05] text-white">{s.title}</h2>
        <h2 className="font-serif-nes italic text-[28px] leading-[1.05] text-nes-gold-text">{s.em}</h2>
        <div className="mt-3 h-px w-16 bg-nes-gold-text/70" />
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {SLIDES.map((_, idx) => (
          <div key={idx} className={`h-1 rounded-full transition-all ${idx === i ? 'w-6 bg-nes-gold-text' : 'w-1.5 bg-white/40'}`} />
        ))}
      </div>

      <BrandFooter />
    </div>
  );
};

export default NespressoAdScreen;
