
import React, { useState } from 'react';

interface KYCProps {
  onClose: () => void;
  status: string;
}

const KYC: React.FC<KYCProps> = ({ onClose, status }) => {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        onClose();
        alert("Documents submitted successfully! We will review them shortly.");
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-bold text-xl text-slate-800">Identity Verification</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center px-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= i ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {i}
                </div>
              </div>
            ))}
          </div>

          <div className="min-h-[200px] flex flex-col items-center justify-center text-center space-y-4">
            {step === 1 && (
              <>
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-800">Select Document Type</h3>
                <div className="w-full space-y-2">
                  <button className="w-full p-4 border border-emerald-500 bg-emerald-50 rounded-2xl text-left font-medium text-slate-800 flex justify-between items-center">
                    National ID Card <span className="w-4 h-4 rounded-full border-4 border-emerald-600"></span>
                  </button>
                  <button className="w-full p-4 border border-slate-200 rounded-2xl text-left font-medium text-slate-500">
                    Passport
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="w-full aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-slate-100 transition-colors">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-medium text-slate-500">Upload Front of ID</p>
                  <input type="file" className="hidden" />
                </div>
                <p className="text-xs text-slate-400">Make sure all details are clearly visible</p>
              </>
            )}

            {step === 3 && (
              <>
                <div className="w-40 h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-full flex flex-col items-center justify-center space-y-2 cursor-pointer hover:bg-slate-100 transition-colors">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Take a Selfie</p>
                </div>
                <h3 className="font-bold text-slate-800">Liveness Check</h3>
                <p className="text-xs text-slate-400">Position your face within the circle</p>
              </>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={isUploading}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center"
          >
            {isUploading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : step === 3 ? 'Submit Documents' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYC;
