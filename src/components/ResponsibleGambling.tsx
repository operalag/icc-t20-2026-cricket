import React, { useState } from 'react';
import { Shield, Clock, DollarSign, TrendingDown, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface DepositLimits {
  daily: number;
  weekly: number;
  monthly: number;
}

interface LossLimits {
  daily: number;
  weekly: number;
  monthly: number;
}

interface ResponsibleGamblingProps {
  depositLimits: DepositLimits;
  lossLimits: LossLimits;
  currentUsage: {
    dailyDeposit: number;
    weeklyDeposit: number;
    monthlyDeposit: number;
    dailyLoss: number;
    weeklyLoss: number;
    monthlyLoss: number;
  };
  sessionDuration: number; // in minutes
  onUpdateLimits: (type: 'deposit' | 'loss', limits: DepositLimits | LossLimits) => Promise<void>;
  onSelfExclude: (duration: string) => Promise<void>;
}

export const ResponsibleGambling: React.FC<ResponsibleGamblingProps> = ({
  depositLimits,
  lossLimits,
  currentUsage,
  sessionDuration,
  onUpdateLimits,
  onSelfExclude
}) => {
  const [activeTab, setActiveTab] = useState<'limits' | 'session' | 'exclusion'>('limits');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Responsible Gambling</h1>
        </div>
        <p className="text-blue-100">Tools to help you stay in control of your betting</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab('limits')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'limits'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Limits
          </button>
          <button
            onClick={() => setActiveTab('session')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'session'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Session Time
          </button>
          <button
            onClick={() => setActiveTab('exclusion')}
            className={`flex-1 py-4 px-6 font-semibold transition-colors ${
              activeTab === 'exclusion'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Self-Exclusion
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-b-2xl shadow-xl p-6">
        {activeTab === 'limits' && (
          <LimitsTab
            depositLimits={depositLimits}
            lossLimits={lossLimits}
            currentUsage={currentUsage}
            onUpdateLimits={onUpdateLimits}
          />
        )}

        {activeTab === 'session' && (
          <SessionTab sessionDuration={sessionDuration} />
        )}

        {activeTab === 'exclusion' && (
          <ExclusionTab onSelfExclude={onSelfExclude} />
        )}
      </div>
    </div>
  );
};

// Limits Tab Component
const LimitsTab: React.FC<{
  depositLimits: DepositLimits;
  lossLimits: LossLimits;
  currentUsage: ResponsibleGamblingProps['currentUsage'];
  onUpdateLimits: (type: 'deposit' | 'loss', limits: DepositLimits | LossLimits) => Promise<void>;
}> = ({ depositLimits, lossLimits, currentUsage, onUpdateLimits }) => {
  const [showEditDeposit, setShowEditDeposit] = useState(false);
  const [showEditLoss, setShowEditLoss] = useState(false);

  const getPercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-amber-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-8">
      {/* Deposit Limits */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            Deposit Limits
          </h3>
          <button
            onClick={() => setShowEditDeposit(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Edit Limits
          </button>
        </div>

        <div className="space-y-4">
          {/* Daily Limit */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.dailyDeposit, depositLimits.daily))}`}>
                ${currentUsage.dailyDeposit.toFixed(2)} / ${depositLimits.daily.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.dailyDeposit, depositLimits.daily) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.dailyDeposit, depositLimits.daily) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.dailyDeposit, depositLimits.daily)}%` }}
              />
            </div>
          </div>

          {/* Weekly Limit */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.weeklyDeposit, depositLimits.weekly))}`}>
                ${currentUsage.weeklyDeposit.toFixed(2)} / ${depositLimits.weekly.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.weeklyDeposit, depositLimits.weekly) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.weeklyDeposit, depositLimits.weekly) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.weeklyDeposit, depositLimits.weekly)}%` }}
              />
            </div>
          </div>

          {/* Monthly Limit */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.monthlyDeposit, depositLimits.monthly))}`}>
                ${currentUsage.monthlyDeposit.toFixed(2)} / ${depositLimits.monthly.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.monthlyDeposit, depositLimits.monthly) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.monthlyDeposit, depositLimits.monthly) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.monthlyDeposit, depositLimits.monthly)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Note:</strong> Increases to limits take effect after 24 hours. Decreases are immediate.
          </p>
        </div>
      </div>

      {/* Loss Limits */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-red-600" />
            Loss Limits
          </h3>
          <button
            onClick={() => setShowEditLoss(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Edit Limits
          </button>
        </div>

        <div className="space-y-4">
          {/* Daily Loss */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Loss Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.dailyLoss, lossLimits.daily))}`}>
                ${currentUsage.dailyLoss.toFixed(2)} / ${lossLimits.daily.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.dailyLoss, lossLimits.daily) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.dailyLoss, lossLimits.daily) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.dailyLoss, lossLimits.daily)}%` }}
              />
            </div>
          </div>

          {/* Weekly Loss */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Loss Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.weeklyLoss, lossLimits.weekly))}`}>
                ${currentUsage.weeklyLoss.toFixed(2)} / ${lossLimits.weekly.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.weeklyLoss, lossLimits.weekly) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.weeklyLoss, lossLimits.weekly) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.weeklyLoss, lossLimits.weekly)}%` }}
              />
            </div>
          </div>

          {/* Monthly Loss */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Loss Limit</span>
              <span className={`text-sm font-bold ${getStatusColor(getPercentage(currentUsage.monthlyLoss, lossLimits.monthly))}`}>
                ${currentUsage.monthlyLoss.toFixed(2)} / ${lossLimits.monthly.toFixed(2)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  getPercentage(currentUsage.monthlyLoss, lossLimits.monthly) >= 90
                    ? 'bg-red-600'
                    : getPercentage(currentUsage.monthlyLoss, lossLimits.monthly) >= 75
                    ? 'bg-amber-600'
                    : 'bg-green-600'
                }`}
                style={{ width: `${getPercentage(currentUsage.monthlyLoss, lossLimits.monthly)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {showEditDeposit && (
        <EditLimitsModal
          type="deposit"
          currentLimits={depositLimits}
          onSave={async (limits) => {
            await onUpdateLimits('deposit', limits);
            setShowEditDeposit(false);
          }}
          onClose={() => setShowEditDeposit(false)}
        />
      )}

      {showEditLoss && (
        <EditLimitsModal
          type="loss"
          currentLimits={lossLimits}
          onSave={async (limits) => {
            await onUpdateLimits('loss', limits);
            setShowEditLoss(false);
          }}
          onClose={() => setShowEditLoss(false)}
        />
      )}
    </div>
  );
};

// Session Tab Component
const SessionTab: React.FC<{ sessionDuration: number }> = ({ sessionDuration }) => {
  const hours = Math.floor(sessionDuration / 60);
  const minutes = sessionDuration % 60;

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Current Session</h3>
        <p className="text-5xl font-bold text-blue-600 tabular-nums">
          {hours > 0 ? `${hours}h ` : ''}{minutes}m
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          You've been playing for {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and ` : ''}{minutes} minute{minutes !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Reality Check</h4>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Taking regular breaks helps you stay in control. We'll remind you every 60 minutes to review your activity.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Session Settings</h4>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Reality check interval</span>
            <select className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg">
              <option>30 minutes</option>
              <option selected>60 minutes</option>
              <option>90 minutes</option>
              <option>120 minutes</option>
            </select>
          </label>
        </div>
      </div>

      <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
        Take a Break
      </button>
    </div>
  );
};

// Exclusion Tab Component
const ExclusionTab: React.FC<{
  onSelfExclude: (duration: string) => Promise<void>;
}> = ({ onSelfExclude }) => {
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const durations = [
    { value: '24h', label: '24 Hours', description: 'Short break' },
    { value: '1w', label: '1 Week', description: 'One week timeout' },
    { value: '1m', label: '1 Month', description: 'One month exclusion' },
    { value: '3m', label: '3 Months', description: 'Three months exclusion' },
    { value: '6m', label: '6 Months', description: 'Six months exclusion' },
    { value: 'permanent', label: 'Permanent', description: 'Cannot be reversed' }
  ];

  const handleExclude = async () => {
    if (selectedDuration === 'permanent' && confirmText !== 'PERMANENT') {
      return;
    } else if (confirmText !== 'EXCLUDE') {
      return;
    }

    await onSelfExclude(selectedDuration);
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2">Important Information</h4>
            <p className="text-sm text-red-800 dark:text-red-300">
              Self-exclusion will prevent you from accessing your account for the selected period. This action cannot be reversed during the exclusion period.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Select Exclusion Period</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => setSelectedDuration(duration.value)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDuration === duration.value
                  ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <h5 className="font-bold text-gray-900 dark:text-white mb-1">{duration.label}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">{duration.description}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedDuration && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">During Exclusion Period:</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <X className="w-5 h-5 text-red-600" />
              <span>Cannot place bets</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <X className="w-5 h-5 text-red-600" />
              <span>Cannot deposit funds</span>
            </li>
            <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Can withdraw winnings</span>
            </li>
          </ul>
        </div>
      )}

      <button
        onClick={() => setShowConfirmation(true)}
        disabled={!selectedDuration}
        className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
      >
        {selectedDuration ? `Exclude Me for ${durations.find(d => d.value === selectedDuration)?.label}` : 'Select a Duration'}
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Confirm Self-Exclusion</h3>

            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-900 dark:text-red-200">
                You're about to exclude yourself for <strong>{durations.find(d => d.value === selectedDuration)?.label}</strong>.
                {selectedDuration === 'permanent' ? ' This cannot be reversed.' : ' This cannot be undone during the exclusion period.'}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type "{selectedDuration === 'permanent' ? 'PERMANENT' : 'EXCLUDE'}" to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder={selectedDuration === 'permanent' ? 'PERMANENT' : 'EXCLUDE'}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setConfirmText('');
                }}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExclude}
                disabled={selectedDuration === 'permanent' ? confirmText !== 'PERMANENT' : confirmText !== 'EXCLUDE'}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                Confirm Exclusion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Limits Modal
const EditLimitsModal: React.FC<{
  type: 'deposit' | 'loss';
  currentLimits: DepositLimits | LossLimits;
  onSave: (limits: DepositLimits | LossLimits) => Promise<void>;
  onClose: () => void;
}> = ({ type, currentLimits, onSave, onClose }) => {
  const [limits, setLimits] = useState(currentLimits);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(limits);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit {type === 'deposit' ? 'Deposit' : 'Loss'} Limits
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Limit ($)
            </label>
            <input
              type="number"
              value={limits.daily}
              onChange={(e) => setLimits({ ...limits, daily: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weekly Limit ($)
            </label>
            <input
              type="number"
              value={limits.weekly}
              onChange={(e) => setLimits({ ...limits, weekly: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Limit ($)
            </label>
            <input
              type="number"
              value={limits.monthly}
              onChange={(e) => setLimits({ ...limits, monthly: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Note:</strong> Increases take effect after 24 hours. Decreases are immediate.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reality Check Modal (appears during session)
export const RealityCheckModal: React.FC<{
  isOpen: boolean;
  sessionDuration: number;
  totalStaked: number;
  totalWon: number;
  onContinue: () => void;
  onTakeBreak: () => void;
}> = ({ isOpen, sessionDuration, totalStaked, totalWon, onContinue, onTakeBreak }) => {
  if (!isOpen) return null;

  const netResult = totalWon - totalStaked;
  const hours = Math.floor(sessionDuration / 60);
  const minutes = sessionDuration % 60;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center mb-6">
          <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Time Check</h3>
          <p className="text-gray-600 dark:text-gray-400">
            You've been playing for {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and ` : ''}{minutes} minute{minutes !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Staked</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalStaked.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Won</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalWon.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Result</p>
            <p className={`text-3xl font-bold ${netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netResult >= 0 ? '+' : ''}${netResult.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            Continue Playing
          </button>
          <button
            onClick={onTakeBreak}
            className="w-full py-4 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg transition-colors"
          >
            Take a Break
          </button>
        </div>
      </div>
    </div>
  );
};
