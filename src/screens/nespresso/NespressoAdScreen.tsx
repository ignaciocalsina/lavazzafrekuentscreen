import { useEffect, useState } from 'react';
import ad1 from '@/assets/nespresso-ad-1.jpg';
import ad2 from '@/assets/nespresso-ad-2.jpg';
import ad3 from '@/assets/nespresso-ad-3.jpg';
import ad4 from '@/assets/nespresso-ad-4.jpg';
import ad5 from '@/assets/nespresso-ad-5.jpg';
import { NespressoLogo } from '@/components/NespressoBrand';

const SLIDES = [
  { img: ad1, eyebrow: 'EXPERIENCIA', title: 'El mejor café del mundo,', em: 'ahora más fácil que nunca.' },
  { img: ad2, eyebrow: 'TU RITUAL', title: 'Tu café Nespresso,', em: 'siempre a mano.' },
  { img: ad3, eyebrow: 'BONO SEMANAL', title: 'Compra 5 cafés', em: 'y paga solo 4.' },
  { img: ad4, eyebrow: 'BONO MENSUAL', title: 'Paga 15 cafés', em: 'y disfruta 20.' },
  { img: ad5, eyebrow: 'AHORRO', title: 'Asegúrate', em: 'todos los cafés del mes.' },
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
        key={i}
        src={s.img}
        alt=""
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
        <NespressoLogo className="!text-[15px] !tracking-[0.34em]" />
      </div>

      <div key={`text-${i}`} className="absolute inset-0 z-10 flex flex-col items-start justify-center pl-8 pr-[40%] animate-fade-in">
        <p className="text-[12px] tracking-[0.32em] text-nes-gold-text font-semibold mb-2">{s.eyebrow}</p>
        <h2 className="font-serif-nes text-[37px] leading-[1.05] text-white">{s.title}</h2>
        <h2 className="font-serif-nes italic text-[37px] leading-[1.05] text-nes-gold-text">{s.em}</h2>
        <div className="mt-3 h-px w-20 bg-nes-gold-text/70" />
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-nes-gold-text' : 'w-2 bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

export default NespressoAdScreen;
