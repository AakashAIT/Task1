import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

// Inner App component with access to ThemeContext
function InnerApp() {
  const { theme, isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Navigation onReady={() => { SplashScreen.hideAsync(); }} />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <InnerApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
