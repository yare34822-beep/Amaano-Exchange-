
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP

  const handleStoreRedirect = (store: string) => {
    alert(`Redirecting to ${store}...`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-6 py-12 max-w-md mx-auto">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl shadow-emerald-200">A</div>
        <h1 className="text-3xl font-bold text-slate-800">Amaano Exchange</h1>
        <p className="text-slate-500 mt-2">Secure Somali Money Transfer</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-slate-600 block mb-2 px-1">Phone Number</label>
              <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-200 px-4 py-1 focus-within:border-emerald-500 transition-all">
                <span className="text-slate-400 font-bold border-r border-slate-200 pr-3 mr-3">+252</span>
                <input
                  type="tel"
                  placeholder="61XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-transparent py-3 outline-none font-bold text-slate-800 placeholder:text-slate-300"
                />
              </div>
            </div>
            <button
              onClick={() => phone.length >= 7 && setStep(2)}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="font-bold text-slate-800">Verification Code</h2>
              <p className="text-sm text-slate-500 mt-1">We sent a code to +252 {phone}</p>
            </div>
            <div className="flex justify-between space-x-2">
              {[1, 2, 3, 4].map(i => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-14 h-16 bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl font-bold focus:border-emerald-500 outline-none transition-all"
                />
              ))}
            </div>
            <button
              onClick={onLogin}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all"
            >
              Verify & Login
            </button>
            <button onClick={() => setStep(1)} className="w-full text-sm font-bold text-emerald-600">
              Resend Code
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available On</p>
        <div className="flex space-x-3 w-full">
          <button 
            onClick={() => handleStoreRedirect('Google Play')}
            className="flex-1 bg-black text-white p-3 rounded-xl flex items-center justify-center space-x-2 border border-slate-800"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3.5 2.1C3.3 2.1 3.1 2.2 3 2.4L12.5 12L3 21.6C3.1 21.8 3.3 21.9 3.5 21.9C3.7 21.9 3.9 21.8 4.1 21.7L18.6 13.4C19.4 12.9 19.4 12.1 18.6 11.6L4.1 3.3C3.9 3.2 3.7 3.1 3.5 3.1" fill="currentColor"/>
            </svg>
            <span className="text-xs font-bold">Play Store</span>
          </button>
          <button 
            onClick={() => handleStoreRedirect('App Store')}
            className="flex-1 bg-black text-white p-3 rounded-xl flex items-center justify-center space-x-2 border border-slate-800"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="text-xs font-bold">App Store</span>
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-slate-400 text-[10px] px-8">
        By continuing, you agree to Amaano's <span className="text-emerald-600 font-bold underline">Terms</span> and <span className="text-emerald-600 font-bold underline">Privacy Policy</span>
      </p>
    </div>
  );
};

export default Login;
