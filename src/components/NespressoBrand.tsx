/** Shared Nespresso brand bits */
import React from 'react';

export const NespressoLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-serif-nes font-medium tracking-[0.32em] text-white ${className}`}>
    NESPRESSO<span className="text-nes-gold-text">.</span>
  </span>
);

/** Header común para pantallas de pago/elección.
 * - `caption` aparece en dorado (importe o resumen del bono).
 * - `tagline` aparece en blanco debajo. */
export const KioskHeader: React.FC<{
  caption: React.ReactNode;
  tagline?: string;
}> = ({ caption, tagline = 'Elige cómo quieres pagarlo' }) => (
  <div className="text-center pt-2 pb-1">
    <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
    <p className="mt-1 text-nes-gold-text font-serif-nes text-[13px] leading-tight">{caption}</p>
    <p className="text-white text-[11px] mt-0.5">{tagline}</p>
  </div>
);
