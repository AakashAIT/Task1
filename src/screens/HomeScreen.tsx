// src/screens/Home.tsx

import React from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import useStrings from '../i18n/strings';
import Strings from '../constants/strings';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';

export function Home() {
  const { theme } = useTheme();
  const { t } = useStrings();
  const navigation = useNavigation();

  // Sample static data with keys that match localization
  const data = [
    { id: '1', title: 'itemOne' },
    { id: '2', title: 'itemTwo' },
    { id: '3', title: 'itemThree' },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      onPress={() => Alert.alert(t(Strings.selectedItem), t(Strings[item.title as keyof typeof Strings]))}
      style={[styles.listItem, { backgroundColor: theme.card }]}
    >
      <AppText style={{ color: theme.textPrimary }}>
        {t(Strings[item.title as keyof typeof Strings])}
      </AppText>
    </TouchableOpacity>
  );


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Card>
        <AppText style={[styles.title, { color: theme.textPrimary }]}>
          {t(Strings.homeTitle)}
        </AppText>

        {/* Localized Welcome */}
        <AppText style={[styles.subtitle, { color: theme.textSecondary }]}>
          {t(Strings.welcome)}
        </AppText>

      
        {/* Buttons */}
        {/* <AppButton title="login" onPress={() => console.log('Login pressed')} /> */}
        <AppButton
          title={t(Strings.settingsTitle)}
          onPress={() => navigation.navigate('Settings')}
        />

        <SafeAreaView >
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 24, flexGrow: 1, alignItems: 'center' }}
          />
        </SafeAreaView>


      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
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
  list: {
    marginTop: 24,
    width: '100%',
  },
  listItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 16,
  },
});
