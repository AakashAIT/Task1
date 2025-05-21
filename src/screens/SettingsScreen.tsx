import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function Settings() {
   const { theme, toggleTheme } = useTheme();
  return (
<View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: theme.textPrimary }}>Settings Screen</Text>
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
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
