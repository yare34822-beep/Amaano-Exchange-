
import React, { useState, useEffect } from 'react';
import { User, Wallet, Transaction, Currency } from './types';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Transfer from './views/Transfer';
import History from './views/History';
import KYC from './views/KYC';
import Support from './views/Support';
import Admin from './views/Admin';
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';

const INITIAL_USER: User = {
  id: 'u1',
  name: 'Amaano Owner',
  phone: '+252619907866',
  email: 'owner@amaano.com',
  isVerified: true,
  kycStatus: 'verified',
  role: 'admin'
};

const INITIAL_WALLETS: Wallet[] = [
  { balance: 1250.00, currency: 'USD' },
  { balance: 4500000, currency: 'SOS' },
  { balance: 0.00, currency: 'EUR' }
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    type: 'send',
    amount: 150.00,
    currency: 'USD',
    status: 'completed',
    date: '2024-05-20T10:30:00Z',
    recipient: 'EVC Plus (+252615550000)',
    description: 'Family support'
  },
  {
    id: 't2',
    type: 'receive',
    amount: 300.00,
    currency: 'USD',
    status: 'completed',
    date: '2024-05-18T14:20:00Z',
    sender: 'Sarah J.',
    description: 'Consulting Fee'
  }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'home' | 'transfer' | 'history' | 'support' | 'admin'>('home');
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);
  const [prefilledRecipient, setPrefilledRecipient] = useState<string>('');

  // Mock auto-login for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser(INITIAL_USER);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!user) return <Login onLogin={() => setUser(INITIAL_USER)} />;

  const handleTransfer = (amount: number, currency: Currency, recipient: string) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'send',
      amount,
      currency,
      status: 'pending',
      date: new Date().toISOString(),
      recipient,
      description: `Transfer to ${recipient}`
    };
    
    setTransactions([newTx, ...transactions]);
    
    // Update wallet balance locally
    setWallets(prev => prev.map(w => 
      w.currency === currency ? { ...w, balance: w.balance - amount } : w
    ));

    setActiveTab('history');
  };

  const handleQuickTransfer = (number: string) => {
    setPrefilledRecipient(number);
    setActiveTab('transfer');
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Navbar user={user} onOpenAdmin={() => setActiveTab('admin')} />
      
      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4">
        {activeTab === 'home' && (
          <Dashboard 
            user={user} 
            wallets={wallets} 
            transactions={transactions.slice(0, 3)} 
            onViewHistory={() => setActiveTab('history')}
            onKycClick={() => setIsKycModalOpen(true)}
            onQuickTransfer={handleQuickTransfer}
          />
        )}
        {activeTab === 'transfer' && (
          <Transfer 
            wallets={wallets} 
            onTransfer={handleTransfer} 
            initialRecipient={prefilledRecipient}
          />
        )}
        {activeTab === 'history' && (
          <History transactions={transactions} />
        )}
        {activeTab === 'support' && (
          <Support />
        )}
        {activeTab === 'admin' && (
          <Admin onBack={() => setActiveTab('home')} />
        )}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {isKycModalOpen && (
        <KYC onClose={() => setIsKycModalOpen(false)} status={user.kycStatus} />
      )}
    </div>
  );
}
