/** Shared Nespresso brand bits */
import React from 'react';
import flowBg from '@/assets/nespresso-ad-1.jpg';

export const NespressoLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`font-serif-nes font-medium tracking-[0.32em] text-white ${className}`}>
    NESPRESSO<span className="text-nes-gold-text">.</span>
  </span>
);

/** Fondo compartido para todo el flujo de pago de café:
 * misma imagen (ad-1) con blur y opacidad ~50% (15% más visible que antes). */
export const FlowBackground: React.FC = () => (
  <>
    <img
      src={flowBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[6px] scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
  </>
);

/** Header común para pantallas del flujo de pago.
 * Texto +40% respecto a la versión previa. */
export const KioskHeader: React.FC<{
  caption: React.ReactNode;
  tagline?: string;
}> = ({ caption, tagline = 'Elige cómo quieres pagarlo' }) => (
  <div className="text-center pt-2.5 pb-1.5">
    <NespressoLogo className="!text-[17px] !tracking-[0.34em]" />
    <p className="mt-1 text-nes-gold-text font-serif-nes text-[18px] leading-tight">{caption}</p>
    <p className="text-white text-[15px] mt-0.5">{tagline}</p>
  </div>
);

/** Icono contactless oficial (imagen proporcionada por el cliente). */
import contactlessIcon from '@/assets/contactless-icon.png';
export const ContactlessIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <img src={contactlessIcon} alt="Contactless" className={`${className} object-contain`} />
);
