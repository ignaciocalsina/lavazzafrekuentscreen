import { useState } from 'react';
import { useApp, getInsurancePrice } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';
import contactlessIcon from '@/assets/contactless-icon.png';

const PaymentPayScreen = () => {
  const { t, navigate, paymentAmount, paymentInsurance, setProcessing: setGlobal } = useApp();
  const [processing, setProcessing] = useState(false);
  const total = paymentAmount + paymentInsurance;
  const fmt = (n: number) => n.toFixed(2).replace('.', ',');

  const back = () => navigate(getInsurancePrice(paymentAmount) > 0 ? 'payment_insurance' : 'payment_amount');

  const handlePay = () => {
    if (processing) return;
    setProcessing(true);
    setGlobal(true);
    setTimeout(() => navigate('payment_done'), 2000);
  };

  return (
    <div className="screen-enter flex flex-col flex-1 gap-2 w-full h-full">
      <button onClick={back} className="self-start flex items-center gap-1 text-muted-foreground active:scale-95 transition-transform text-xs">
        <ArrowLeft className="w-3.5 h-3.5" /> {t('id.back')}
      </button>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        {/* Left: ticket */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-full max-w-[230px] bg-card border border-border rounded-xl p-3 flex flex-col gap-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('payment.pay.base')}</span>
              <span className="font-semibold tabular-nums">€{fmt(paymentAmount)}</span>
            </div>
            {paymentInsurance > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('payment.pay.insurance')}</span>
                <span className="font-semibold tabular-nums">€{fmt(paymentInsurance)}</span>
              </div>
            )}
            <div className="border-t border-border mt-1 pt-1 flex justify-between items-baseline">
              <span className="font-semibold">{t('payment.pay.total')}</span>
              <span className="text-xl font-extrabold text-primary tabular-nums">€{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Right: NFC */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-sm font-bold text-center">{t('payment.pay.title')}</h1>
          {processing ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-muted-foreground font-medium text-xs">{t('send.payment.processing')}</p>
            </div>
          ) : (
            <>
              <button onClick={handlePay} className="flex items-center justify-center active:scale-95 transition-transform nfc-pulse">
                <img src={contactlessIcon} alt="Contactless" className="w-24 h-auto" />
              </button>
              <p className="text-[10px] text-muted-foreground text-center px-2">{t('send.payment.instruction')}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPayScreen;
