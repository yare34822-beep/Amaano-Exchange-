
import React from 'react';
import { User, Wallet, Transaction, ExchangeRate } from '../types';

interface DashboardProps {
  user: User;
  wallets: Wallet[];
  transactions: Transaction[];
  onViewHistory: () => void;
  onKycClick: () => void;
  onQuickTransfer?: (number: string) => void;
}

const RATES: ExchangeRate[] = [
  { pair: 'USD/SOS', rate: 26500, trend: 'up' },
  { pair: 'USD/EUR', rate: 0.92, trend: 'down' },
  { pair: 'USD/EVC', rate: 1.00, trend: 'neutral' },
];

const Dashboard: React.FC<DashboardProps> = ({ user, wallets, transactions, onViewHistory, onKycClick, onQuickTransfer }) => {
  const handleDownload = (platform: string) => {
    alert(`Redirecting to ${platform} store...`);
  };

  return (
    <div className="space-y-6 pb-4">
      {/* Welcome & KYC Banner */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Hi, {user.name.split(' ')[0]}!</h1>
        <p className="text-slate-500 text-sm">Welcome back to Amaano Exchange</p>
      </div>

      {user.kycStatus !== 'verified' && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">Verification Required</p>
              <p className="text-xs text-amber-600">Complete KYC to unlock all features</p>
            </div>
          </div>
          <button 
            onClick={onKycClick}
            className="text-xs font-bold text-amber-800 bg-amber-200 px-3 py-1.5 rounded-full"
          >
            Verify
          </button>
        </div>
      )}

      {/* Wallet Carousel (simplified) */}
      <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-900/20">
        <div className="flex justify-between items-start mb-4">
          <span className="text-emerald-100 text-sm font-medium">Main Balance</span>
          <img src="https://img.icons8.com/color/48/visa.png" className="h-6 grayscale brightness-200" alt="Visa" />
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold font-mono">
            ${wallets.find(w => w.currency === 'USD')?.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <p className="text-emerald-200 text-xs mt-1">Available Funds</p>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {wallets.filter(w => w.currency !== 'USD').map(w => (
            <div key={w.currency} className="bg-emerald-500/50 rounded-xl px-4 py-2 min-w-[120px]">
              <p className="text-[10px] text-emerald-100 uppercase font-bold">{w.currency}</p>
              <p className="text-sm font-bold truncate">{w.balance.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Quick EVC Admin Button */}
      <button 
        onClick={() => onQuickTransfer && onQuickTransfer('+252619907866')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
      >
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">Quick Transfer</p>
            <p className="font-bold">EVC to +252619907866</p>
          </div>
        </div>
        <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-4 gap-4 text-center">
        {[
          { label: 'EVC Plus', color: 'bg-blue-100 text-blue-600', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
          { label: 'Sahal', color: 'bg-purple-100 text-purple-600', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
          { label: 'Bank', color: 'bg-emerald-100 text-emerald-600', icon: 'M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
          { label: 'Exchange', color: 'bg-orange-100 text-orange-600', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
        ].map(action => (
          <div key={action.label} className="flex flex-col items-center space-y-2 cursor-pointer">
            <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center shadow-sm`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-600">{action.label}</span>
          </div>
        ))}
      </div>

      {/* Play Store Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-[180px]">
            <h2 className="text-xl font-bold mb-1">Amaano App</h2>
            <p className="text-xs text-slate-400">Manage your money anywhere, anytime.</p>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleDownload('Google Play')}
              className="bg-black border border-slate-700 px-4 py-2 rounded-xl flex items-center space-x-3 active:scale-95 transition-all hover:bg-slate-800"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3.5 2.1C3.3 2.1 3.1 2.2 3 2.4L12.5 12L3 21.6C3.1 21.8 3.3 21.9 3.5 21.9C3.7 21.9 3.9 21.8 4.1 21.7L18.6 13.4C19.4 12.9 19.4 12.1 18.6 11.6L4.1 3.3C3.9 3.2 3.7 3.1 3.5 3.1" fill="#4285F4"/>
                <path d="M3 2.4V21.6L12.5 12L3 2.4" fill="#34A853"/>
                <path d="M3.5 2.1C3.3 2.1 3.1 2.2 3 2.4L12.5 12L4.1 3.3C3.9 3.2 3.7 3.1 3.5 3.1" fill="#FBBC05"/>
                <path d="M3.5 21.9C3.3 21.9 3.1 21.8 3 21.6L12.5 12L4.1 21.7C3.9 21.8 3.7 21.9 3.5 21.9" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <p className="text-[8px] uppercase font-medium leading-none">Get it on</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </button>
            <button 
              onClick={() => handleDownload('App Store')}
              className="bg-black border border-slate-700 px-4 py-2 rounded-xl flex items-center space-x-3 active:scale-95 transition-all hover:bg-slate-800"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[8px] uppercase font-medium leading-none">Download on the</p>
                <p className="text-sm font-bold leading-tight">App Store</p>
              </div>
            </button>
          </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all"></div>
      </div>

      {/* Live Rates */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-slate-800">Live Exchange Rates</h2>
          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded uppercase">Real-time</span>
        </div>
        <div className="space-y-3">
          {RATES.map(rate => (
            <div key={rate.pair} className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-600">{rate.pair}</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-slate-800">{rate.rate.toLocaleString()}</span>
                {rate.trend === 'up' ? (
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
                ) : rate.trend === 'down' ? (
                  <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" /></svg>
                ) : (
                  <div className="w-4 h-1 bg-slate-300 rounded" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Recent Activity</h2>
          <button onClick={onViewHistory} className="text-emerald-600 text-sm font-bold">See All</button>
        </div>
        <div className="space-y-3">
          {transactions.map(tx => (
            <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${tx.type === 'send' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {tx.type === 'send' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    )}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{tx.description}</p>
                  <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${tx.type === 'send' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.currency === 'USD' ? '$' : ''}{tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
