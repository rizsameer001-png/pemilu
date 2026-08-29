import React from 'react';
import { Home, Compass, ExternalLink, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeTab: 'home' | 'explore';
  setActiveTab: (tab: 'home' | 'explore') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Navbar({ activeTab, setActiveTab, isDark, toggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 flex justify-center pointer-events-none">
      <nav
        id="app-navigation-bar"
        className="pointer-events-auto w-full max-w-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 rounded-full px-4 py-2 flex items-center justify-between shadow-sm transition-colors"
      >
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-white">
            Expo Starter
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100/90 dark:bg-neutral-800/90 p-1 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
          <button
            type="button"
            id="tab-btn-home"
            onClick={() => setActiveTab('home')}
            className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {activeTab === 'home' && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              Home
            </span>
          </button>

          <button
            type="button"
            id="tab-btn-explore"
            onClick={() => setActiveTab('explore')}
            className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            {activeTab === 'explore' && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" />
              Explore
            </span>
          </button>
        </div>

        {/* Right actions (Docs & Theme Toggle) */}
        <div className="flex items-center gap-2">
          <a
            href="https://docs.expo.dev"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 pr-1"
          >
            <span>Docs</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
