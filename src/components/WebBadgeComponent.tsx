import React from 'react';
import expoBadge from '../../assets/images/expo-badge.png';
import expoBadgeWhite from '../../assets/images/expo-badge-white.png';

interface WebBadgeProps {
  isDark: boolean;
}

export function WebBadgeComponent({ isDark }: WebBadgeProps) {
  return (
    <div id="web-badge-footer" className="flex flex-col items-center justify-center gap-2 pt-8 pb-12">
      <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
        v57.0.18
      </span>
      <a
        href="https://expo.dev"
        target="_blank"
        rel="noreferrer"
        className="opacity-80 hover:opacity-100 transition-opacity"
      >
        <img
          src={isDark ? expoBadgeWhite : expoBadge}
          alt="Expo Badge"
          className="h-6 w-auto"
          referrerPolicy="no-referrer"
        />
      </a>
    </div>
  );
}
