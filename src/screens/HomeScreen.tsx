import { useApp } from '@/context/AppContext';
import { ArrowLeft } from 'lucide-react';

const HomeScreen = () => {
  const { t, navigate, goHome } = useApp();

  const actions = [
    { key: 'collect', label: t('home.collect'), emoji: '📦' },
    { key: 'return', label: t('home.return'), emoji: '↩️' },
    { key: 'send', label: t('home.send'), emoji: '🚚' },
  ] as const;

  const handleAction = (action: 'collect' | 'return' | 'send') => {
    if (action === 'collect') navigate('identification', 'collect');
    else if (action === 'return') navigate('identification', 'return');
    else navigate('send_details', 'send');
  };

  return (
    <div className="screen-enter flex flex-col items-center flex-1 gap-3 mx-auto">
      <button onClick={goHome} className="self-start flex items-center gap-1 text-muted-foreground mb-1 active:scale-95 transition-transform text-sm">
        <ArrowLeft className="w-4 h-4" /> {t('id.back')}
      </button>
      <h1 className="text-xl font-bold text-center">{t('home.title')}</h1>
      <div className="flex flex-col gap-3 w-full flex-1 justify-center">
        {actions.map(({ key, label, emoji }) => (
          <button
            key={key}
            onClick={() => handleAction(key)}
            className="kiosk-button kiosk-card flex items-center gap-4 text-left hover:border-primary/50 active:bg-primary/5"
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-base font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
