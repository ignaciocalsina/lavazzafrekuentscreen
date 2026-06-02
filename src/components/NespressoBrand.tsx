/** Shared Nespresso brand bits — logo as text, brand footer */
import React from 'react';

export const NespressoLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-serif-nes font-medium tracking-[0.32em] text-white ${className}`}>
    NESPRESSO<span className="text-nes-gold-text">.</span>
  </span>
);

export const BrandFooter: React.FC = () => (
  <div className="absolute bottom-0 inset-x-0 h-7 bg-black/80 backdrop-blur flex items-center justify-center gap-3 text-[10px] tracking-[0.25em] text-white/80 font-medium">
    <NespressoLogo className="!text-[11px] !tracking-[0.28em]" />
    <span className="text-nes-gold-text">×</span>
    <span className="font-serif-nes font-medium tracking-[0.3em]">FREKUENT</span>
  </div>
);

export const OrderHeader: React.FC<{ product?: string; price?: string; tagline?: string }> = ({
  product = 'ESPRESSO NESPRESSO',
  price = '1,50 €',
  tagline = 'Elige cómo quieres pagarlo',
}) => (
  <div className="text-center pt-1 pb-2">
    <NespressoLogo className="!text-[13px] !tracking-[0.32em]" />
    <p className="mt-2 text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold">TU PEDIDO</p>
    <h1 className="font-serif-nes text-xl text-white tracking-[0.08em] leading-tight">{product}</h1>
    <div className="mx-auto my-1 h-px w-12 bg-nes-gold-text/60" />
    <p className="text-[11px] text-white/90">
      Importe: <span className="font-serif-nes text-base font-semibold">{price}</span>
    </p>
    <p className="text-[10px] italic text-nes-gold-text mt-0.5">{tagline}</p>
  </div>
);
