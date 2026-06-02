import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { PROMOTIONS, getDiscountPercent, formatEuro } from '@/data/promotions';

const AdScreen = () => {
  const { t, navigate, setSelectedPromotion } = useApp();
  const [index, setIndex] = useState(0);

  const promo = PROMOTIONS[index];
  const total = PROMOTIONS.length;
  const discount = getDiscountPercent(promo);
  const isSub = promo.kind === 'subscription';

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const handleSelect = () => {
    setSelectedPromotion(promo.id);
    if (isSub) {
      navigate('promo_pay', 'promotion');
    } else {
      navigate('promo_quantity', 'promotion');
    }
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-black">
      <button
        onClick={handleSelect}
        className="absolute inset-0 grid grid-cols-2 active:opacity-95"
        aria-label={promo.title}
      >
        {/* Left: image */}
        <div className="relative overflow-hidden bg-black">
          <img
            key={promo.id}
            src={promo.mediaUrl}
            alt={promo.title}
            className={`absolute inset-0 h-full w-full object-cover ${promo.animate ? 'animate-ken-burns' : 'animate-fade-in'}`}
          />
          {isSub && (
            <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Suscripción
            </div>
          )}
        </div>

        {/* Right: info panel */}
        <div className="relative flex flex-col justify-center items-start gap-3 px-6 py-5 bg-gradient-to-br from-[#1a1410] to-black text-white text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold">Nespresso</span>
          <h2 className="text-2xl font-extrabold leading-tight">{promo.title}</h2>
          <p className="text-xs text-white/75 leading-snug">{promo.subtitle}</p>

          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-white/55 text-sm font-medium line-through">
              {formatEuro(promo.originalPrice)}
            </span>
            <span className="text-3xl font-extrabold tracking-tight">
              {formatEuro(promo.price)}
            </span>
            {isSub && <span className="text-xs text-white/70">/mes</span>}
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>

          {isSub && promo.perDay && (
            <p className="text-[10px] text-white/60">≈ {promo.perDay} al día</p>
          )}

          <div className="mt-1 inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
            {t('ad.tap')}
          </div>
        </div>
      </button>

      {/* Dots */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 pointer-events-none">
        {PROMOTIONS.map((p, i) => (
          <div
            key={p.id}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AdScreen;
