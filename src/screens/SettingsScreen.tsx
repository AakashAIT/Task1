// src/screens/Settings.tsx

import { StyleSheet, View } from 'react-native';
import { Text } from '@react-navigation/elements';
import { useTheme } from '../context/ThemeContext';
import useStrings from '../i18n/strings';
import Strings from '../constants/strings';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';

export function Settings() {
  const { theme } = useTheme();
  const { t } = useStrings();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        {t(Strings.settingsTitle)}
      </Text>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {t(Strings.toggleTheme)}
        </Text>
        <ThemeToggle />
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.textSecondary }]}>
          {t(Strings.changeLanguage)}
        </Text>
        <LanguageToggle />
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
    gap: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  section: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
