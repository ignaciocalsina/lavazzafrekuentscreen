import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ZoomIn, Monitor, ArrowLeft } from 'lucide-react';
import soportes from '@/assets/soportes.png';
import vending from '@/assets/vending.png';

const Soportes = () => {
  const [showVending, setShowVending] = useState(false);

  return (
    <main className="fixed inset-0 bg-black overflow-hidden">
      <h1 className="sr-only">Soportes Frekuent: mostrador, tótem y pared</h1>
      <img
        src={soportes}
        alt="Tres tipos de soporte: mostrador, tótem de pie y pared"
        className="w-full h-full object-cover"
      />

      {/* CTA sobre la máquina de vending (izquierda) */}
      <button
        type="button"
        onClick={() => setShowVending(true)}
        aria-label="Ver máquina de vending"
        className="absolute left-[12%] top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-black shadow-lg hover:bg-white transition-colors"
      >
        <ZoomIn className="w-4 h-4" />
        Ver máquina
      </button>

      {/* Overlay con la máquina de vending centrada y fondo borroso */}
      {showVending && (
        <div
          className="absolute inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Detalle máquina de vending"
        >
          {/* Fondo borroso reutilizando la imagen de soportes */}
          <img
            src={soportes}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(24px) brightness(0.6)', transform: 'scale(1.1)' }}
          />

          {/* Imagen de la máquina, centrada en pantalla */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[95%]">
              <img
                src={vending}
                alt="Máquina de vending"
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
              {/* CTA "Ver demo" sobre la zona amarilla (APPDELIKIA), justo encima de la pantalla Frekuent */}
              <Link
                to="/demo"
                aria-label="Ver demo interactiva"
                className="absolute left-[86%] top-[12%] -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-lg hover:bg-white transition-colors whitespace-nowrap"
              >
                <Monitor className="w-3.5 h-3.5" />
                Ver demo
              </Link>
            </div>
          </div>

          {/* Botón Atrás (mismo estilo que en /demo) */}
          <button
            type="button"
            onClick={() => setShowVending(false)}
            aria-label="Volver"
            className="fixed top-3 right-3 z-50 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Atrás
          </button>
        </div>
      )}
    </main>
  );
};

export default Soportes;
