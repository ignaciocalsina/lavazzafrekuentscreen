import { useApp } from '@/context/AppContext';
import { CreditCard } from 'lucide-react';
import { MARKETPLACE_BRANDS } from '@/data/marketplaceBrands';
import promoThumb from '@/assets/promo-thumb.jpg';

const RoleSelectScreen = () => {
  const { t, setMarketplaceBrand, navigate } = useApp();

  const handleBrand = (id: typeof MARKETPLACE_BRANDS[number]['id']) => {
    setMarketplaceBrand(id);
    navigate('marketplace_type', 'marketplace');
  };

  const handlePayment = () => navigate('payment_amount', 'payment');
  const handlePromotion = () => navigate('promo_pay', 'promotion');

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <h1 className="text-xl font-bold text-center pt-1">{t('role.title')}</h1>

      {/* Pago + Promoción compactos */}
      <div className="grid grid-cols-2 gap-3" style={{ height: 96 }}>
        <button onClick={handlePayment} className="kiosk-card flex items-center gap-2 p-2 hover:border-primary/50 active:bg-primary/5 transition-colors">
          <div className="w-12 h-12 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-7 h-7 text-primary" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col items-start text-left leading-tight">
            <span className="text-sm font-semibold">{t('role.payment')}</span>
            <span className="text-[11px] text-muted-foreground">{t('role.payment.subtitle')}</span>
          </div>
        </button>
        <button onClick={handlePromotion} className="kiosk-card flex items-center gap-2 p-2 hover:border-primary/50 active:bg-primary/5 transition-colors overflow-hidden">
          <div className="w-12 h-12 shrink-0 rounded-md overflow-hidden">
            <img src={promoThumb} alt="" className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
          </div>
          <div className="flex flex-col items-start text-left leading-tight">
            <span className="text-sm font-semibold">{t('role.promotion')}</span>
            <span className="text-[11px] text-muted-foreground">{t('role.promotion.price')}</span>
          </div>
        </button>
      </div>

      {/* Marketplace: 3x2 con logo + precio */}
      <div className="flex flex-col gap-2 flex-1 min-h-0">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
          {t('role.giftcards')}
        </p>
        <div className="grid grid-cols-3 grid-rows-2 gap-2 flex-1 min-h-0">
          {MARKETPLACE_BRANDS.map(b => (
            <button
              key={b.id}
              onClick={() => handleBrand(b.id)}
              className="rounded-lg bg-card border border-border flex flex-col items-center justify-between p-2 hover:border-primary active:scale-95 transition-all shadow-sm min-h-0"
              aria-label={b.name}
            >
              <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                <img src={b.logo} alt={b.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              </div>
              <span className="text-sm font-bold text-primary">€{b.amount},00</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectScreen;
