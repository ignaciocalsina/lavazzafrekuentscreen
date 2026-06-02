import { Link } from 'react-router-dom';
import { Monitor } from 'lucide-react';
import vendingAsset from '@/assets/nespresso-machine.png.asset.json';
const vending = vendingAsset.url;

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
          {/* CTA "Ver demo" junto a la pasarela de pago Frekuent */}
          <Link
            to="/demo"
            aria-label="Ver demo interactiva"
            className="absolute left-[72%] top-[37%] -translate-y-1/2 inline-flex items-center gap-2.5 rounded-full bg-white/95 px-5 py-2.5 text-base font-semibold text-black shadow-lg hover:bg-white transition-colors whitespace-nowrap"
          >
            <Monitor className="w-5 h-5" />
            Ver demo
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Soportes;
