import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  define: {
    global: 'window',
    'process.env': {},
  },
  plugins: [
    react({
      include: /\.(jsx|tsx|js|ts)$/,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: 'react-native/Libraries/Utilities/codegenNativeComponent', replacement: path.resolve(__dirname, './src/shims/codegenNativeComponent.tsx') },
      { find: 'react-native/Libraries/ReactNative/AppContainer', replacement: path.resolve(__dirname, './src/shims/AppContainer.tsx') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: 'react-native', replacement: 'react-native-web' },
      { find: '@expo/vector-icons', replacement: path.resolve(__dirname, './src/shims/@expo/vector-icons') },
      { find: 'expo-router', replacement: path.resolve(__dirname, './src/shims/expo-router.tsx') },
      { find: 'expo-splash-screen', replacement: path.resolve(__dirname, './src/shims/expo-splash-screen.ts') },
      { find: 'expo-secure-store', replacement: path.resolve(__dirname, './src/shims/expo-secure-store.ts') },
      { find: 'expo-status-bar', replacement: path.resolve(__dirname, './src/shims/expo-status-bar.tsx') },
      { find: '@react-native-community/netinfo', replacement: path.resolve(__dirname, './src/shims/@react-native-community/netinfo.ts') },
    ],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
