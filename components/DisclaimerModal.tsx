'use client';

import { useState, useEffect } from 'react';
import { AlertTriangleIcon, XIcon, FlaskConicalIcon } from 'lucide-react';

const DISCLAIMER_KEY = 'cricket-demo-disclaimer-accepted';

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const hasAccepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <FlaskConicalIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Experimental Demo</h2>
              <p className="text-amber-100 text-sm">Please read before continuing</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
            <AlertTriangleIcon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-2">Important Notice</p>
              <p>
                This is an <strong>experimental demo project</strong> created for
                educational and demonstration purposes only.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <XIcon className="w-3 h-3 text-red-600" />
              </div>
              <p>
                <strong className="text-gray-900">Not for production use.</strong> This application
                is not intended for real betting or financial transactions.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <XIcon className="w-3 h-3 text-red-600" />
              </div>
              <p>
                <strong className="text-gray-900">No real money involved.</strong> All odds,
                markets, and transactions shown are simulated for demonstration.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <XIcon className="w-3 h-3 text-red-600" />
              </div>
              <p>
                <strong className="text-gray-900">Use at your own risk.</strong> The developers
                are not responsible for any issues arising from use of this demo.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={handleAccept}
            className="w-full py-4 bg-gradient-to-r from-ton-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            I Understand - Continue to Demo
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            By clicking above, you acknowledge this is a demo project
          </p>
        </div>
      </div>
    </div>
  );
}
