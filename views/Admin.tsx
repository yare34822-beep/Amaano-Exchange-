
import React from 'react';

interface AdminProps {
  onBack: () => void;
}

const Admin: React.FC<AdminProps> = ({ onBack }) => {
  const users = [
    { id: '1', name: 'Ahmed', phone: '25261...', status: 'verified', balance: '$1,250' },
    { id: '2', name: 'Hassan', phone: '25261...', status: 'pending', balance: '$450' },
    { id: '3', name: 'Zahra', phone: '25261...', status: 'verified', balance: '$2,800' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-xl">
          <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Volume</p>
          <p className="text-2xl font-bold text-emerald-600">$45.2k</p>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Pending KYC</p>
          <p className="text-2xl font-bold text-orange-600">12</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">User Management</h2>
          <button className="text-xs font-bold text-blue-600">View All</button>
        </div>
        <div className="divide-y divide-slate-50">
          {users.map(u => (
            <div key={u.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">
                  {u.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{u.name}</p>
                  <p className="text-[10px] text-slate-400">{u.phone}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-700">{u.balance}</p>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                  u.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {u.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200">
        <h2 className="font-bold text-slate-800 mb-4">Set Global Rates</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-slate-500 min-w-[80px]">USD/SOS</span>
            <input type="number" defaultValue={26500} className="flex-1 p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-emerald-500 font-bold" />
            <button className="px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs">Update</button>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-slate-500 min-w-[80px]">USD/EUR</span>
            <input type="number" defaultValue={0.92} className="flex-1 p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-emerald-500 font-bold" />
            <button className="px-4 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
