import React, { useState } from 'react';
import { useApp, MockUserState } from '@/context/AppContext';

const KioskLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { processing, kioskMode, setKioskMode, mockState, setMockState } = useApp();
  const [devOpen, setDevOpen] = useState(false);

  const cycle: Record<MockUserState, MockUserState> = { balance: 'bundle', bundle: 'empty', empty: 'balance' };
  const labels: Record<MockUserState, string> = {
    balance: 'Saldo 10 €',
    bundle: '3 cafés bono',
    empty: 'Sin saldo',
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#1a1a1a] overflow-hidden gap-4">
      {/* Tabs */}
      <div className="inline-flex rounded-full bg-[#2a2a2a] p-1 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        {[
          { id: 'promo' as const, label: 'Anuncios Nespresso' },
          { id: 'coffee' as const, label: 'Pago de café' },
        ].map(tab => {
          const active = kioskMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setKioskMode(tab.id)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                active ? 'bg-white text-[#1a1a1a] shadow' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {tab.label}
            </button>
          );
        })}

        {/* Dev toggle */}
        <div className="relative ml-1 flex items-center">
          <button
            onClick={() => setDevOpen(o => !o)}
            className="px-3 py-2 rounded-full text-[10px] font-medium text-white/50 hover:text-white/80 border border-white/10"
            title="Estado simulado del usuario"
          >
            ⚙ {labels[mockState]}
          </button>
          {devOpen && (
            <div className="absolute top-full left-0 mt-1 bg-[#2a2a2a] border border-white/10 rounded-lg p-1.5 z-50 min-w-[140px]">
              {(Object.keys(labels) as MockUserState[]).map(k => (
                <button
                  key={k}
                  onClick={() => { setMockState(k); setDevOpen(false); }}
                  className={`w-full text-left px-2 py-1 rounded text-[10px] ${
                    mockState === k ? 'bg-white text-[#1a1a1a] font-bold' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {labels[k]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="relative rounded-[40px] bg-gradient-to-b from-[#e8e8e8] to-[#d4d4d4] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{ padding: '35px 44px 35px 53px' }}
      >
        <div
          className="absolute inset-[8px] rounded-[32px] border-[3px] pointer-events-none transition-colors duration-500 z-20"
          style={{ borderColor: processing ? 'hsl(145,63%,42%)' : 'white' }}
        />
        <div className="absolute bottom-[55px] left-[22px] w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]/20 z-10" />

        <div className="relative w-[616px] h-[370px] rounded-[20px] overflow-hidden bg-nes-coffee flex flex-col shadow-[inset_0_0_8px_rgba(0,0,0,0.15)]">
          <main className="flex-1 overflow-hidden flex flex-col scrollbar-none">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default KioskLayout;
