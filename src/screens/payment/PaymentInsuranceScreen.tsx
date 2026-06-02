import { useApp, getInsurancePrice } from '@/context/AppContext';
import { ArrowLeft, ShieldCheck, ShieldOff } from 'lucide-react';

const PaymentInsuranceScreen = () => {
  const { t, navigate, paymentAmount, setPaymentInsurance } = useApp();
  const insurance = getInsurancePrice(paymentAmount);
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const choose = (withInsurance: boolean) => {
    setPaymentInsurance(withInsurance ? insurance : 0);
    navigate('payment_pay');
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-3 w-full">
      <button onClick={() => navigate('payment_amount')} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>

      <h1 className="text-lg font-bold text-center">{t('payment.insurance.title')}</h1>
      <p className="text-xs text-muted-foreground text-center -mt-1">
        {t('payment.insurance.subtitle')} <span className="font-semibold text-foreground">€{fmt(paymentAmount)}</span>
      </p>

      <div className="grid grid-cols-1 gap-3 flex-1">
        <button
          onClick={() => choose(true)}
          className="kiosk-card flex items-center gap-3 p-4 hover:border-primary/50 active:bg-primary/5 transition-colors"
        >
          <div className="w-14 h-14 shrink-0 rounded-xl bg-success/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-success" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-base font-semibold">{t('payment.insurance.add')}</span>
            <span className="text-xs text-muted-foreground">+€{fmt(insurance)} · {t('payment.insurance.annual')}</span>
          </div>
        </button>

        <button
          onClick={() => choose(false)}
          className="kiosk-card flex items-center gap-3 p-4 hover:border-primary/50 active:bg-primary/5 transition-colors"
        >
          <div className="w-14 h-14 shrink-0 rounded-xl bg-muted flex items-center justify-center">
            <ShieldOff className="w-8 h-8 text-muted-foreground" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-base font-semibold">{t('payment.insurance.skip')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaymentInsuranceScreen;
