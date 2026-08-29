import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedExpoIcon } from './AnimatedExpoIcon';
import { WebBadgeComponent } from './WebBadgeComponent';
import { Copy, Check, Terminal, Sparkles, Monitor, Smartphone, Apple } from 'lucide-react';

interface HomeScreenProps {
  isDark: boolean;
}

export function HomeScreen({ isDark }: HomeScreenProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activePlatform, setActivePlatform] = useState<'web' | 'ios' | 'android'>('web');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <motion.div
      id="home-screen-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 pt-6 sm:pt-10"
    >
      {/* Hero Section */}
      <div id="home-hero" className="flex flex-col items-center justify-center text-center gap-6 py-6">
        <AnimatedExpoIcon />

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Welcome to&nbsp;<span className="text-blue-600 dark:text-blue-400">Expo</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Build universal native apps that run across Android, iOS, and the web from a single codebase.
          </p>
        </div>
      </div>

      {/* Step / Guide Container */}
      <div className="w-full space-y-4 my-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-500 dark:text-neutral-400">
            GET STARTED
          </span>
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setActivePlatform('web')}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-all ${
                activePlatform === 'web'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Web
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('ios')}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-all ${
                activePlatform === 'ios'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              iOS
            </button>
            <button
              type="button"
              onClick={() => setActivePlatform('android')}
              className={`px-2 py-1 rounded flex items-center gap-1 transition-all ${
                activePlatform === 'android'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Android
            </button>
          </div>
        </div>

        <div
          id="home-steps-card"
          className="bg-neutral-100/80 dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm"
        >
          {/* Step 1: Try Editing */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
              Try editing
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard('src/app/index.tsx', 'edit')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              title="Click to copy path"
            >
              <code>src/app/index.tsx</code>
              {copiedKey === 'edit' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800/80" />

          {/* Step 2: Dev Tools */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
              Dev tools
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono bg-white dark:bg-neutral-800 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              {activePlatform === 'web' && 'use browser devtools'}
              {activePlatform === 'ios' && 'press ⌘ + d (or shake)'}
              {activePlatform === 'android' && 'press ⌘ + m (or ctrl+m)'}
            </span>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800/80" />

          {/* Step 3: Fresh Start */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
              Fresh start
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard('npm run reset-project', 'reset')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              title="Click to copy command"
            >
              <code>npm run reset-project</code>
              {copiedKey === 'reset' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Interactive Sandbox Card */}
      <div className="w-full mt-2 mb-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 dark:border-blue-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Ready for universal development
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Expo Router file-based system works seamlessly on Web and Mobile.
            </p>
          </div>
        </div>
        <a
          href="https://docs.expo.dev"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5"
        >
          <Terminal className="w-3.5 h-3.5" />
          Explore Docs
        </a>
      </div>

      {/* Web Badge */}
      <WebBadgeComponent isDark={isDark} />
    </motion.div>
  );
}
