import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import useStrings from '../i18n/strings';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import Strings from '../constants/strings';

export function Home() {
  const { theme, toggleTheme } = useTheme();
   const { toggleLanguage } = useLanguage();
  const { t } = useStrings();
  return (
<View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.textPrimary }}>Home Screen</Text>
       <Button onPress={toggleTheme} >Toggle Theme</Button>
      <Text style={{ color: theme.textPrimary }}>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Settings">Go to Settings</Button>
       <Text style={{ color: theme.textPrimary, fontSize: 18 }}>{t(Strings.welcome)}</Text>
      <Button onPress={toggleLanguage} >
        {t(Strings.changeLanguage)}
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
