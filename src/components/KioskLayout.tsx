import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/i18n/translations';
import { Phone, X, PhoneCall, Battery, Wifi, ChevronDown } from 'lucide-react';

const langLabels: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
  de: 'DE',
};

const langFlags: Record<Language, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
  fr: '🇫🇷',
  de: '🇩🇪',
};

const langOrder: Language[] = ['es', 'en', 'fr', 'de'];

const KioskLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, t, processing, screen } = useApp();
  const [contactOpen, setContactOpen] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const isAd = screen === 'ad';
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#1a1a1a] overflow-hidden">
      {/* Device bezel — physical landscape (rotated 90° left from the original portrait) */}
      <div
        className="relative rounded-[40px] bg-gradient-to-b from-[#e8e8e8] to-[#d4d4d4] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{ padding: '35px 44px 35px 53px' }}
      >
        {/* Full-border status indicator */}
        <div
          className="absolute inset-[8px] rounded-[32px] border-[3px] pointer-events-none transition-colors duration-500 z-20"
          style={{ borderColor: processing ? 'hsl(145,63%,42%)' : 'white' }}
        />
        {/* Camera dot — originally top-left of portrait; now bottom-left after the 90° left rotation */}
        <div className="absolute bottom-[55px] left-[22px] w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]/20 z-10" />

        {/* Screen area — landscape 616×370 */}
        <div className="relative w-[616px] h-[370px] rounded-[20px] overflow-hidden bg-background flex flex-col shadow-[inset_0_0_8px_rgba(0,0,0,0.15)]">
          {/* Status bar with language selector */}
          {!isAd && (
          <div className="flex items-center justify-between px-5 py-1.5 bg-muted/50 text-muted-foreground text-[10px] font-medium shrink-0">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
              {/* Language selector in status bar */}
              <div ref={langRef} className="relative ml-1">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[9px] font-bold transition-all active:scale-95"
                >
                  {langLabels[language]}
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 min-w-[100px]">
                    {langOrder.map(lang => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-muted ${
                          language === lang ? 'bg-primary/10 text-primary font-bold' : 'text-foreground'
                        }`}
                      >
                        <span>{langFlags[lang]}</span>
                        <span>{langLabels[lang]}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          )}


          {/* Main content */}
          <main className={`flex-1 overflow-y-auto overflow-x-hidden flex flex-col scrollbar-none ${isAd ? '' : 'px-6 pb-4'}`}>
            {children}
          </main>

          {/* Powered by Frekuent - in white area above footer */}
          {!isAd && (
          <div className="shrink-0 py-2 text-center">
            <p className="text-[10px] text-muted-foreground">Powered by <span className="font-semibold">Frekuent</span></p>
          </div>
          )}

          {/* Footer */}
          {!isAd && (
          <footer className="shrink-0 bg-muted/50 py-3 border-t border-border">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => setContactOpen(true)}
                className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-5 h-5 text-primary-foreground" />
              </button>
              <span className="text-[10px] font-medium text-muted-foreground">{t('footer.contact')}</span>
            </div>
          </footer>
          )}

          {/* Contact Modal */}
          {contactOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
              <div className="bg-card rounded-2xl shadow-2xl w-[85%] p-5 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">{t('contact.title')}</h2>
                  <button
                    onClick={() => { setContactOpen(false); setCallbackRequested(false); }}
                    className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center active:scale-95 transition-transform"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{t('contact.phone')}</p>
                      <p className="text-sm font-semibold">+34 900 100 INP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted">
                    <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-[7px] font-bold">ID</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('contact.lockerId')}</p>
                      <p className="text-sm font-semibold">LCK-MAD-0042</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border border-border">
                    <p className="font-semibold text-sm mb-1">{t('contact.remoteAssistance')}</p>
                    <p className="text-xs text-muted-foreground mb-2">{t('contact.status')}</p>
                    <button
                      onClick={() => setCallbackRequested(true)}
                      disabled={callbackRequested}
                      className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl font-semibold text-sm transition-all ${
                        callbackRequested
                          ? 'bg-success/10 text-success'
                          : 'bg-primary text-primary-foreground active:scale-95'
                      }`}
                    >
                      <PhoneCall className="w-4 h-4" />
                      {callbackRequested ? t('contact.callbackRequested') : t('contact.requestCallback')}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => { setContactOpen(false); setCallbackRequested(false); }}
                  className="w-full mt-4 flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center active:scale-95 transition-transform">
                    <X className="w-5 h-5 text-background" />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KioskLayout;
