// src/screens/Home.tsx

import { StyleSheet, View } from 'react-native';
import { Text, Button } from '@react-navigation/elements';
import useStrings from '../i18n/strings';
import { useTheme } from '../context/ThemeContext';
import Strings from '../constants/strings';

export function Home() {
  const { theme } = useTheme();
  const { t } = useStrings();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {t(Strings.homeTitle)}
      </Text>

      {/* Subtext */}
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {t(Strings.welcome)}
      </Text>

     

      {/* Sample Body Text */}
      {/* <Text style={[styles.infoText, { color: theme.textPrimary }]}>
        Open up <Text style={{ fontWeight: 'bold',color: theme.textPrimary }}>src/App.tsx</Text> to start editing.
      </Text> */}

      {/* Navigation Button */}
      <View style={styles.buttonWrapper}>
        <Button screen="Settings">{t(Strings.settingsTitle)}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
