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
  const handlePromotion = () => navigate('ad', 'promotion');

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <h1 className="text-sm font-bold text-center">{t('role.title')}</h1>

      <div className="grid grid-cols-[1fr_1.6fr] gap-3 flex-1 min-h-0">
        {/* Left column: Pago + Promoción stacked */}
        <div className="flex flex-col gap-2 min-h-0">
          <button onClick={handlePayment} className="kiosk-card flex flex-col items-center justify-center gap-1 p-2 hover:border-primary/50 active:bg-primary/5 transition-colors flex-1">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" strokeWidth={1.75} />
            </div>
            <span className="text-xs font-semibold">{t('role.payment')}</span>
            <span className="text-[9px] text-muted-foreground">{t('role.payment.subtitle')}</span>
          </button>
          <button onClick={handlePromotion} className="kiosk-card flex flex-col items-center justify-center gap-1 p-2 hover:border-primary/50 active:bg-primary/5 transition-colors flex-1 overflow-hidden">
            <div className="w-10 h-10 rounded-md overflow-hidden">
              <img src={promoThumb} alt="" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="text-xs font-semibold">{t('role.promotion')}</span>
            <span className="text-[9px] text-muted-foreground">{t('role.promotion.price')}</span>
          </button>
        </div>

        {/* Right column: Marketplace brands */}
        <div className="flex flex-col gap-1 min-h-0">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-center">
            {t('role.giftcards')}
          </p>
          <div className="grid grid-cols-3 grid-rows-2 gap-1.5 flex-1 min-h-0">
            {MARKETPLACE_BRANDS.map(b => (
              <button
                key={b.id}
                onClick={() => handleBrand(b.id)}
                className="rounded-lg bg-card border border-border flex flex-col items-center justify-between p-1.5 hover:border-primary active:scale-95 transition-all shadow-sm min-h-0"
                aria-label={b.name}
              >
                <div className="flex-1 min-h-0 w-full flex items-center justify-center">
                  <img src={b.logo} alt={b.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
                <span className="text-xs font-bold text-primary">€{b.amount},00</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectScreen;
