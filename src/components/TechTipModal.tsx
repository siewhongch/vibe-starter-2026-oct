import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Check } from 'lucide-react';

interface TechTipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechTipModal: React.FC<TechTipModalProps> = ({ isOpen, onClose }) => {
  const [tipText, setTipText] = useState('');
  const [topic, setTopic] = useState('Artificial Intelligence');
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTipText('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#121212] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold uppercase tracking-wider text-xs">NYT Confidential News Tips</span>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center animate-fade-in">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-black">Tip Received Securely</h3>
              <p className="text-xs text-gray-600 mt-1">
                Your transmission has been encrypted and routed to the Technology Investigations desk.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-[11px] text-emerald-950 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  The New York Times offers multiple secure channels for whistleblowers and confidential sources. No IP addresses or browser fingerprints are recorded.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Subject Area</label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black bg-white"
                >
                  <option>Artificial Intelligence &amp; Autonomous Agents</option>
                  <option>Big Tech Corporate Governance</option>
                  <option>Government &amp; National Defense Contracts</option>
                  <option>Data Privacy &amp; Algorithmic Biases</option>
                  <option>Other Whistleblower Dispatch</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Confidential Information</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the documentation, evidence, or specific events our journalists should investigate..."
                  value={tipText}
                  onChange={e => setTipText(e.target.value)}
                  className="w-full text-xs p-3 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  id="enc"
                  checked={isEncrypted}
                  onChange={e => setIsEncrypted(e.target.checked)}
                  className="rounded text-black focus:ring-black"
                />
                <label htmlFor="enc" className="cursor-pointer">
                  Apply End-to-End PGP Encryption before routing
                </label>
              </div>

              <button
                type="submit"
                disabled={!tipText.trim()}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white text-xs font-bold py-2.5 rounded transition"
              >
                Send Secure Tip
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
