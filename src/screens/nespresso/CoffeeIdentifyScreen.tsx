import { useApp } from '@/context/AppContext';
import { QrCode, Mail, Phone, CreditCard, ArrowLeft } from 'lucide-react';
import { BrandFooter, NespressoLogo } from '@/components/NespressoBrand';

const CoffeeIdentifyScreen = () => {
  const { navigate, orderType } = useApp();

  const title =
    orderType === 'bono_semanal'
      ? 'Identifícate para guardar tu bono semanal.'
      : orderType === 'bono_mensual'
      ? 'Identifícate para guardar tu bono mensual.'
      : 'Identifícate para acceder a tu cuenta Nespresso.';

  const next = () => {
    if (orderType === 'puntual') navigate('coffee_account_options');
    else navigate('coffee_bundle_pay');
  };

  const back = () => {
    if (orderType === 'puntual') navigate('coffee_pay_choice');
    else navigate('coffee_bundle_summary');
  };

  const methods = [
    { icon: QrCode, label: 'Escanear QR', hint: 'Usa la app Nespresso' },
    { icon: Mail, label: 'Email', hint: 'tu@nespresso.com' },
    { icon: Phone, label: 'Teléfono', hint: '+34 6XX XXX XXX' },
    { icon: CreditCard, label: 'Tarjeta fidelización', hint: 'Acércala al lector' },
  ];

  return (
    <div className="screen-enter relative flex-1 overflow-hidden bg-nes-coffee flex flex-col">
      <button onClick={back} className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 active:scale-95">
        <ArrowLeft className="w-3.5 h-3.5" />
      </button>
      <div className="text-center pt-2 pb-2">
        <NespressoLogo className="!text-[12px] !tracking-[0.32em]" />
        <p className="text-[9px] tracking-[0.3em] text-nes-gold-text font-semibold mt-1">IDENTIFICACIÓN</p>
        <p className="text-white/90 text-[11px] mt-1 px-6 italic font-serif-nes">{title}</p>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 px-4 pb-9">
        {methods.map(m => (
          <button
            key={m.label}
            onClick={next}
            className="rounded-xl bg-nes-cream text-nes-onyx p-2.5 flex items-center gap-2.5 active:scale-[0.98] transition-transform shadow"
          >
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
              <m.icon className="w-4.5 h-4.5" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="font-serif-nes text-sm font-semibold tracking-wide leading-tight">{m.label}</p>
              <p className="text-[9px] text-nes-onyx/65">{m.hint}</p>
            </div>
          </button>
        ))}
      </div>
      <BrandFooter />
    </div>
  );
};

export default CoffeeIdentifyScreen;
