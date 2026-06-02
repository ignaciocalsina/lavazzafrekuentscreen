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
        className="absolute inset-0 active:opacity-95"
        aria-label={promo.title}
      >
        {/* Full-bleed image */}
        <img
          key={promo.id}
          src={promo.mediaUrl}
          alt={promo.title}
          className={`absolute inset-0 h-full w-full object-cover ${promo.animate ? 'animate-ken-burns' : 'animate-fade-in'}`}
        />

        {/* Gradient overlay for legibility (bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Text overlay centered at bottom */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end gap-1 px-6 pb-5 text-center text-white">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold">Nespresso</span>
            {isSub && (
              <span className="bg-secondary text-secondary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Suscripción
              </span>
            )}
          </div>
          <h2 className="text-2xl font-extrabold leading-tight drop-shadow-lg">{promo.title}</h2>
          <p className="text-xs text-white/85 leading-snug max-w-[80%]">{promo.subtitle}</p>

          <div className="flex items-baseline gap-2 flex-wrap justify-center mt-1">
            <span className="text-white/60 text-sm font-medium line-through">
              {formatEuro(promo.originalPrice)}
            </span>
            <span className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
              {formatEuro(promo.price)}
            </span>
            {isSub && <span className="text-xs text-white/80">/mes</span>}
            <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>

          {isSub && promo.perDay && (
            <p className="text-[10px] text-white/70">≈ {promo.perDay} al día</p>
          )}

          <p className="mt-1 text-[11px] text-white/80 font-medium animate-pulse">{t('ad.tap')}</p>
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

