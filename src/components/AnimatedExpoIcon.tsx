import React from 'react';
import { motion } from 'motion/react';
import expoLogo from '../../assets/images/expo-logo.png';
import logoGlow from '../../assets/images/logo-glow.png';

export function AnimatedExpoIcon() {
  return (
    <div id="animated-expo-icon" className="relative flex items-center justify-center w-36 h-36">
      {/* Rotating Glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          rotate: 360,
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 25,
            ease: 'linear',
          },
          scale: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          },
          opacity: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          },
        }}
      >
        <img
          src={logoGlow}
          alt="Logo Glow"
          className="w-48 h-48 max-w-none select-none"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Center Icon Box */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-2xl bg-neutral-900 dark:bg-neutral-800 shadow-xl flex items-center justify-center border border-neutral-700/50"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
        whileHover={{ scale: 1.08, rotate: 3 }}
      >
        <motion.img
          src={expoLogo}
          alt="Expo Logo"
          className="w-14 h-14 object-contain select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}
