
import React, { useState, useEffect } from 'react';
import { Wallet, Currency } from '../types';

interface TransferProps {
  wallets: Wallet[];
  onTransfer: (amount: number, currency: Currency, recipient: string) => void;
  initialRecipient?: string;
}

const Transfer: React.FC<TransferProps> = ({ wallets, onTransfer, initialRecipient }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(initialRecipient || '');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [method, setMethod] = useState<'EVC' | 'SAHAL' | 'BANK'>('EVC');

  useEffect(() => {
    if (initialRecipient) {
      setRecipient(initialRecipient);
    }
  }, [initialRecipient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !recipient) return;
    onTransfer(parseFloat(amount), currency, `${method} (${recipient})`);
  };

  const currentWallet = wallets.find(w => w.currency === currency);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Send Money</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transfer Method */}
        <div className="grid grid-cols-3 gap-3">
          {(['EVC', 'SAHAL', 'BANK'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`py-3 rounded-2xl font-bold text-sm transition-all ${
                method === m ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-500'
              }`}
            >
              {m === 'EVC' ? 'EVC Plus' : m}
            </button>
          ))}
        </div>

        {/* Amount Input */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-slate-500">Amount to send</label>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-slate-100 rounded-lg px-2 py-1 text-xs font-bold outline-none"
            >
              <option value="USD">USD</option>
              <option value="SOS">SOS</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className="relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-300">
              {currency === 'USD' ? '$' : currency === 'SOS' ? 'S' : '€'}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2 text-4xl font-bold font-mono outline-none text-slate-800 placeholder:text-slate-100"
            />
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-50">
            <span className="text-xs text-slate-400">Wallet Balance</span>
            <span className="text-xs font-bold text-slate-600">
              {currentWallet?.currency === 'USD' ? '$' : ''}{currentWallet?.balance.toLocaleString()} {currentWallet?.currency !== 'USD' ? currentWallet?.currency : ''}
            </span>
          </div>
        </div>

        {/* Recipient Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 px-1">Recipient Phone/ID</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={method === 'BANK' ? 'Account Number' : '061XXXXXXX'}
            className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 text-slate-800 font-medium"
          />
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-600 px-1">Note (Optional)</label>
          <textarea
            rows={2}
            placeholder="What's this for?"
            className="w-full p-4 bg-white rounded-2xl border border-slate-200 outline-none focus:border-emerald-500 text-slate-800 font-medium resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!amount || !recipient}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
        >
          Review & Send
        </button>
      </form>
    </div>
  );
};

export default Transfer;
