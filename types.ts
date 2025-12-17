
export type Currency = 'USD' | 'EUR' | 'SOS' | 'EVC';

export interface Wallet {
  balance: number;
  currency: Currency;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'exchange';
  amount: number;
  currency: Currency;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  recipient?: string;
  sender?: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
  kycStatus: 'none' | 'pending' | 'verified' | 'rejected';
  role: 'user' | 'admin';
}

export interface ExchangeRate {
  pair: string;
  rate: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
