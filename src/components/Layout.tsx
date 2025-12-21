import React, { useState } from 'react';
import { Home, Trophy, Activity, User, Menu, X, Search, Bell, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  walletComponent: React.ReactNode;
  showBetSlip?: boolean;
  betSlipComponent?: React.ReactNode;
}

export const MobileLayout: React.FC<LayoutProps> = ({
  children,
  walletComponent,
  showBetSlip = false,
  betSlipComponent
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'matches' | 'live' | 'profile'>('home');
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Cricket<span className="text-blue-600">Bet</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Search Bar (collapsible) */}
        {showSearch && (
          <div className="px-4 pb-3 animate-slideDown">
            <input
              type="text"
              placeholder="Search matches, players, markets..."
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
              autoFocus
            />
          </div>
        )}

        {/* Wallet Balance */}
        <div className="px-4 pb-3 border-t border-gray-200 dark:border-gray-800 pt-3">
          {walletComponent}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'home'
                ? 'text-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'matches'
                ? 'text-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs font-medium">Matches</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
              activeTab === 'live'
                ? 'text-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs font-medium">Live</span>
            <span className="absolute top-2 right-6 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Bet Slip (floating) */}
      {showBetSlip && betSlipComponent && (
        <div className="fixed bottom-20 left-0 right-0 z-40 px-4 pb-4">
          {betSlipComponent}
        </div>
      )}

      {/* Side Menu */}
      {showMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowMenu(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl animate-slideInLeft">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                    <Trophy className="w-5 h-5" />
                    <span className="font-medium">Tournaments</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                    <Activity className="w-5 h-5" />
                    <span className="font-medium">Live Matches</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Bets</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export const DesktopLayout: React.FC<LayoutProps> = ({
  children,
  walletComponent,
  showBetSlip = false,
  betSlipComponent
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Trophy className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cricket<span className="text-blue-600">Bet</span>
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                Matches
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium relative">
                Live
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                My Bets
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white w-64"
              />
            </div>

            <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
            </button>

            {walletComponent}
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Quick Links */}
          <aside className="col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Quick Links</h3>
              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Trophy className="w-4 h-4" />
                  <span>Tournament</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Activity className="w-4 h-4" />
                  <span>Live Now</span>
                </a>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className={showBetSlip ? 'col-span-7' : 'col-span-10'}>
            {children}
          </main>

          {/* Right Sidebar - Bet Slip */}
          {showBetSlip && betSlipComponent && (
            <aside className="col-span-3">
              <div className="sticky top-24">
                {betSlipComponent}
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

// Responsive Layout Wrapper
export const ResponsiveLayout: React.FC<LayoutProps> = (props) => {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileLayout {...props} /> : <DesktopLayout {...props} />;
};
