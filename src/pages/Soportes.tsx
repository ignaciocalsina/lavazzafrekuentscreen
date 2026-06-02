import { Link } from 'react-router-dom';
import { Monitor } from 'lucide-react';
import vending from '@/assets/vending.png';

const Soportes = () => {
  return (
    <main className="fixed inset-0 bg-black overflow-hidden">
      <h1 className="sr-only">Máquina de vending Frekuent</h1>

      {/* Fondo borroso */}
      <img
        src={vending}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(24px) brightness(0.6)', transform: 'scale(1.1)' }}
      />

      {/* Máquina de vending centrada */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[95%]">
          <img
            src={vending}
            alt="Máquina de vending"
            className="h-full w-auto object-contain drop-shadow-2xl"
          />
          {/* CTA "Ver demo" sobre la zona amarilla */}
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
    </main>
  );
};

export default Soportes;
