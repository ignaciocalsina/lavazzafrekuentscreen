import { useEffect, useState } from 'react';
import ad1 from '@/assets/nespresso-ad-1.jpg';
import ad2 from '@/assets/nespresso-ad-2.jpg';
import ad3 from '@/assets/nespresso-ad-3.jpg';
import ad4 from '@/assets/nespresso-ad-4.jpg';
import { NespressoLogo } from '@/components/NespressoBrand';
import { useApp, OrderType } from '@/context/AppContext';

type Slide = {
  img: string;
  eyebrow: string;
  title: string;
  em: string;
  action?: { orderType: OrderType; bundle?: 'week' | null };
};

const SLIDES: Slide[] = [
  { img: ad1, eyebrow: 'EXPERIENCIA', title: 'El mejor café del mundo,', em: 'ahora más fácil que nunca.' },
  { img: ad2, eyebrow: 'TU RITUAL', title: 'Tu café Nespresso,', em: 'siempre a mano.' },
  {
    img: ad3,
    eyebrow: 'BONO SEMANAL',
    title: 'Paga 4 cafés',
    em: 'y disfruta 5.',
    action: { orderType: 'bono_semanal', bundle: 'week' },
  },
  {
    img: ad4,
    eyebrow: 'PLAN DESAYUNO Y SOBREMESA',
    title: '29 € al mes, 1 € al día.',
    em: 'Ahorra un 6 % al año.',
    action: { orderType: 'suscripcion' },
  },
];

const NespressoAdScreen = () => {
  const [i, setI] = useState(0);
  const { setOrderType, setBundleType, setPurchaseFlow, navigate } = useApp();

  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[i];
  const clickable = !!s.action;

  const handleClick = () => {
    if (!s.action) return;
    setOrderType(s.action.orderType);
    setBundleType(s.action.bundle ?? null);
    setPurchaseFlow(true);
    navigate('coffee_payment_method');
  };

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

      <button
        key={`text-${i}`}
        onClick={handleClick}
        disabled={!clickable}
        className="absolute inset-0 z-10 flex flex-col items-start justify-center pl-8 pr-[40%] animate-fade-in text-left disabled:cursor-default"
      >
        <p className="text-[12px] tracking-[0.32em] text-nes-gold-text font-semibold mb-2">{s.eyebrow}</p>
        <h2 className="font-serif-nes text-[37px] leading-[1.05] text-white">{s.title}</h2>
        <h2 className="font-serif-nes italic text-[37px] leading-[1.05] text-nes-gold-text">{s.em}</h2>
        <div className="mt-3 h-px w-20 bg-nes-gold-text/70" />
        {clickable && (
          <span className="mt-3 inline-flex items-center gap-1 bg-nes-gold-text text-nes-onyx rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] animate-pulse">
            TOCA PARA COMPRAR
          </span>
        )}
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-8 bg-nes-gold-text' : 'w-2 bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

export default NespressoAdScreen;
