import React, { useState } from 'react';
import { X, User, Check, Bookmark, Clock, Shield } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  userEmail,
  onLogin,
  onLogout,
  savedCount,
  onOpenSaved
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      onLogin(emailInput.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <span className="font-bold text-sm tracking-wide uppercase text-black">
            {userEmail ? 'NYT Account' : 'Log In or Create Account'}
          </span>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {userEmail ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                  {userEmail[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-bold text-black block truncate">{userEmail}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold inline-block">
                    All-Access Subscriber
                  </span>
                </div>
              </div>

              {/* Quick stats / links */}
              <div className="divide-y divide-gray-100 text-xs">
                <button
                  onClick={() => {
                    onOpenSaved();
                    onClose();
                  }}
                  className="w-full py-2.5 flex items-center justify-between hover:text-nytBlue transition"
                >
                  <span className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4 text-gray-500" />
                    <span>Saved Reading List</span>
                  </span>
                  <span className="font-bold bg-gray-100 px-2 py-0.5 rounded-full text-[10px]">
                    {savedCount}
                  </span>
                </button>
                <div className="py-2.5 flex items-center justify-between text-gray-600">
                  <span className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Member Since</span>
                  </span>
                  <span className="font-medium text-[11px]">October 2026</span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-gray-600">
                  <span className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span>Subscription Status</span>
                  </span>
                  <span className="font-bold text-emerald-700 text-[11px]">Active</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full border border-gray-300 hover:border-black text-xs font-bold py-2 rounded transition text-gray-700"
              >
                Log Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 text-xs font-bold py-2.5 rounded transition mt-2"
              >
                Continue
              </button>

              <div className="text-[10px] text-gray-500 text-center pt-2">
                By continuing, you agree to the updated Terms of Service and Privacy Policy.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
