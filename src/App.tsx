import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, StyleSheet, StatusBar as RNStatusBar } from 'react-native';

// Preload assets
Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

// Inner App component with access to ThemeContext
function InnerApp() {
  const isDarkMode = useTheme();
 const { theme } = useTheme();

  return (
    <>
      {/* Render a background under the translucent status bar */}
      {Platform.OS === 'android' && (
        <View style={[styles.statusBarBackground, { backgroundColor: theme.status }]} />
      )}

      <StatusBar
        style={isDarkMode ? 'light' : 'dark'}
        translucent
      />

      <Navigation
        linking={{
          enabled: 'auto',
          prefixes: ['helloworld://'],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: RNStatusBar.currentHeight || 24, // fallback for Android status bar height
    width: '100%',
  },
});

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <InnerApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
