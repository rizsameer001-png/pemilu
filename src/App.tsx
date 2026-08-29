import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore'>('home');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pemilu-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pemilu-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pemilu-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start pb-16">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <HomeScreen key="home" isDark={isDark} />
          ) : (
            <ExploreScreen key="explore" isDark={isDark} toggleTheme={toggleTheme} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
