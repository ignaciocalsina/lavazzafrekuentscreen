/** Shared Lavazza brand bits */
import React from 'react';
import flowBg from '@/assets/lavazza-ad-1.jpg';
import lavazzaLogo from '@/assets/lavazza-logo.png.asset.json';
import contactlessAsset from '@/assets/contactless-icon.png.asset.json';
const contactlessIcon = contactlessAsset.url;

/** Logo Lavazza (imagen oficial). Mantiene el nombre exportado `NespressoLogo`
 *  para no romper imports en el resto del proyecto. */
export const LavazzaLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Convertimos el sizing por className en altura del logo.
  // Si la clase trae text-[NNpx], lo usamos como altura; si no, h-4 por defecto.
  const m = className.match(/text-\[(\d+(?:\.\d+)?)px\]/);
  const h = m ? `${Math.round(Number(m[1]) * 1.6)}px` : '22px';
  return (
    <img
      src={lavazzaLogo.url}
      alt="Lavazza"
      className={`inline-block align-middle ${className}`}
      style={{ height: h, width: 'auto' }}
    />
  );
};

// Alias retro-compatible
export const NespressoLogo = LavazzaLogo;

/** Fondo compartido para todo el flujo de pago de café */
export const FlowBackground: React.FC = () => (
  <>
    <img
      src={flowBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-55 blur-[5px] scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
  </>
);

/** Header común para pantallas del flujo de pago. */
export const KioskHeader: React.FC<{
  caption: React.ReactNode;
  tagline?: string;
}> = ({ caption, tagline = 'Elige cómo quieres pagarlo' }) => (
  <div className="text-center pt-2.5 pb-1.5">
    <LavazzaLogo className="text-[17px]" />
    <p className="mt-1 text-nes-gold-text font-serif-nes text-[18px] leading-tight">{caption}</p>
    <p className="text-white text-[15px] mt-0.5">{tagline}</p>
  </div>
);

/** Icono contactless (recoloreado a azul Lavazza). */
export const ContactlessIcon: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <img src={contactlessIcon} alt="Contactless" className={`${className} object-contain`} />
);

/** Footer "Pago 100% seguro" con icono de candado. */
export const SecureFooter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`px-6 ${className}`}>
    <div className="flex items-center gap-2">
      <div className="flex-1 h-px bg-white/15" />
      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white/60">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <div className="flex-1 h-px bg-white/15" />
    </div>
    <p className="text-center text-white/55 text-[10px] tracking-[0.15em] mt-1.5">Pago 100% seguro</p>
  </div>
);
