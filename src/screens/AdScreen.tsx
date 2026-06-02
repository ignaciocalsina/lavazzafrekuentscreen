import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { PROMOTIONS, getDiscountPercent, formatEuro } from '@/data/promotions';

const AdScreen = () => {
  const { t, navigate, setSelectedPromotion } = useApp();
  const [index, setIndex] = useState(0);

  const promo = PROMOTIONS[index];
  const total = PROMOTIONS.length;
  const discount = getDiscountPercent(promo);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const handleSelect = () => {
    setSelectedPromotion(promo.id);
    navigate('promo_pay', 'promotion');
  };

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-black">
      <button
        onClick={handleSelect}
        className="absolute inset-0 active:opacity-95"
        aria-label={promo.title}
      >
        {promo.mediaType === 'video' ? (
          <video
            key={promo.id}
            src={promo.mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            key={promo.id}
            src={promo.mediaUrl}
            alt={promo.title}
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 p-5 pt-10 text-center pointer-events-none">
          <p className="text-white text-2xl font-extrabold leading-tight drop-shadow-lg mb-1.5 px-2">
            {promo.title}
          </p>
          <p className="text-white/85 text-sm font-medium leading-snug drop-shadow-md mb-4 px-4">
            {promo.subtitle}
          </p>

          <div className="flex items-baseline justify-center gap-2.5 mb-3">
            <span className="text-white/60 text-base font-medium line-through">
              {formatEuro(promo.originalPrice)}
            </span>
            <span className="text-white text-3xl font-extrabold tracking-tight drop-shadow-lg">
              {formatEuro(promo.price)}
            </span>
            <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          </div>

          <p className="text-white/80 text-xs font-medium animate-pulse">
            {t('ad.tap')}
          </p>
        </div>
      </button>

      {/* Dots */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
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
