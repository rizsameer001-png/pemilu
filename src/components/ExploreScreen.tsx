import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CollapsibleSection } from './CollapsibleSection';
import { WebBadgeComponent } from './WebBadgeComponent';
import { ExternalLink, Compass, Sun, Moon, Sparkles, Layers, Image as ImageIcon, Smartphone } from 'lucide-react';
import tutorialWeb from '../../assets/images/tutorial-web.png';
import reactLogo from '../../assets/images/react-logo.png';

interface ExploreScreenProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export function ExploreScreen({ isDark, toggleTheme }: ExploreScreenProps) {
  const [animatingBox, setAnimatingBox] = useState(false);

  return (
    <motion.div
      id="explore-screen-view"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 pt-6 sm:pt-10"
    >
      {/* Title Header */}
      <div id="explore-header" className="flex flex-col items-center text-center gap-3 py-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Explore
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base max-w-md">
          This starter app includes example features and guides to help you get started building.
        </p>

        <a
          href="https://docs.expo.dev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors mt-1"
        >
          <span>Expo documentation</span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
        </a>
      </div>

      {/* Collapsible Sections */}
      <div className="w-full space-y-3 my-4">
        {/* 1. File-based routing */}
        <CollapsibleSection
          id="collapsible-file-based-routing"
          title="File-based routing"
          defaultOpen={true}
        >
          <p>
            This app has two main screens: <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">src/app/index.tsx</code> and{' '}
            <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">src/app/explore.tsx</code>.
          </p>
          <p>
            The layout file in <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">src/app/_layout.tsx</code> sets up the tab navigator and shared transitions.
          </p>
          <a
            href="https://docs.expo.dev/router/introduction"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium text-xs sm:text-sm pt-1"
          >
            Learn more about Expo Router
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </CollapsibleSection>

        {/* 2. Android, iOS, and web support */}
        <CollapsibleSection
          id="collapsible-cross-platform"
          title="Android, iOS, and web support"
        >
          <p>
            You can open this project on Android, iOS, and the web. To open the web version in terminal, press{' '}
            <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded font-mono text-xs font-semibold">w</kbd>.
          </p>
          <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm mt-2">
            <img
              src={tutorialWeb}
              alt="Universal Platform Tutorial"
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </CollapsibleSection>

        {/* 3. Images */}
        <CollapsibleSection id="collapsible-images" title="Images">
          <p>
            For static images, you can use the <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">@2x</code> and{' '}
            <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">@3x</code> suffixes to provide assets for different screen pixel densities.
          </p>
          <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 gap-2">
            <img
              src={reactLogo}
              alt="React Logo"
              className="w-20 h-20 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              assets/images/react-logo.png
            </span>
          </div>
          <a
            href="https://reactnative.dev/docs/images"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium text-xs sm:text-sm pt-1"
          >
            Learn more about Image Handling
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </CollapsibleSection>

        {/* 4. Light and dark mode components */}
        <CollapsibleSection
          id="collapsible-themes"
          title="Light and dark mode components"
        >
          <p>
            This template features first-class light and dark mode support. The{' '}
            <code className="bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-xs font-mono text-neutral-800 dark:text-neutral-200">useColorScheme()</code> hook lets you inspect the user&apos;s active theme and adapt UI colors accordingly.
          </p>

          <div className="flex items-center justify-between p-3 bg-neutral-200/60 dark:bg-neutral-800/60 rounded-xl">
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
              Current Mode: <strong className="capitalize">{isDark ? 'Dark' : 'Light'}</strong>
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs font-semibold shadow-sm flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
              Switch to {isDark ? 'Light' : 'Dark'}
            </button>
          </div>

          <a
            href="https://docs.expo.dev/develop/user-interface/color-themes/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium text-xs sm:text-sm pt-1"
          >
            Learn more about Color Themes
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </CollapsibleSection>

        {/* 5. Animations */}
        <CollapsibleSection id="collapsible-animations" title="Animations">
          <p>
            This template demonstrates fluid animations powered by Motion and Reanimated. Try triggering the animated interaction below:
          </p>

          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 gap-4">
            <motion.div
              animate={{
                rotate: animatingBox ? 360 : 0,
                scale: animatingBox ? [1, 1.25, 1] : 1,
                borderRadius: animatingBox ? ['20%', '50%', '20%'] : '20%',
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg cursor-pointer"
              onClick={() => setAnimatingBox(true)}
              onAnimationComplete={() => setAnimatingBox(false)}
            >
              <Sparkles className="w-7 h-7" />
            </motion.div>
            <button
              type="button"
              onClick={() => setAnimatingBox(true)}
              disabled={animatingBox}
              className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              {animatingBox ? 'Animating...' : 'Click to Animate'}
            </button>
          </div>
        </CollapsibleSection>
      </div>

      {/* Web Badge */}
      <WebBadgeComponent isDark={isDark} />
    </motion.div>
  );
}
