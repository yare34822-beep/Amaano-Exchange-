
import React, { useState } from 'react';
import { Transaction } from '../types';

interface HistoryProps {
  transactions: Transaction[];
}

const History: React.FC<HistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState<'all' | 'send' | 'receive'>('all');

  const filtered = transactions.filter(t => filter === 'all' || t.type === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Transaction History</h1>

      <div className="flex space-x-2 p-1 bg-slate-100 rounded-2xl">
        {(['all', 'send', 'receive'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
              filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No transactions found</p>
          </div>
        ) : (
          filtered.map(tx => (
            <div key={tx.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm group active:scale-[0.98] transition-transform">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  tx.type === 'send' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {tx.type === 'send' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    )}
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{tx.description}</p>
                  <p className="text-[10px] text-slate-400">{new Date(tx.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === 'send' ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {tx.type === 'send' ? '-' : '+'}{tx.currency === 'USD' ? '$' : ''}{tx.amount.toLocaleString()}
                </p>
                <div className="flex items-center justify-end space-x-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    tx.status === 'completed' ? 'bg-emerald-500' : tx.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                  }`}></span>
                  <span className="text-[10px] text-slate-400 capitalize">{tx.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
