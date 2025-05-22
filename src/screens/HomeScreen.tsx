// src/screens/Home.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import useStrings from '../i18n/strings';
import Strings from '../constants/strings';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import { Card } from '../components/Card';
import Colors from '../constants/colors';
import { ScrollView } from 'react-native-virtualized-view';
import CustomModal from '../components/Modal';

type Item = {
  id: number;
  title: string;
  body: string;
};

export function Home() {
  const [inputText, setInputText] = useState('');
  const { theme } = useTheme();
  const { t } = useStrings();
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Item[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => {
          setData(json.slice(0, 10)); // Limit to 10 items
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }, 2000); // Simulate 2 second delay
  }, []);

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  // Sample static data with keys that match localization
  const staticData = [
    { id: '1', title: 'itemOne' },
    { id: '2', title: 'itemTwo' },
    { id: '3', title: 'itemThree' },
  ];

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      onPress={() => Alert.alert(t(Strings.selectedItem), t(Strings[item.title as keyof typeof Strings]))}
      style={[styles.listItem, { backgroundColor: theme.card, shadowColor: Colors.shadow, }]}
    >
      <AppText style={{ color: theme.textPrimary }}>
        {t(Strings[item.title as keyof typeof Strings])}
      </AppText>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Card>
          <AppText style={[styles.title, { color: theme.textPrimary }]}>
            {t(Strings.homeTitle)}
          </AppText>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder={t(Strings.enterText)}
            placeholderTextColor={theme.textSecondary}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.card,
              color: theme.textPrimary,
              padding: 12,
              borderRadius: 8,
              width: '100%',
            }}
          />
          {inputText && <AppText style={{ marginTop: 12, color: theme.textPrimary }}>
            {t(Strings.youTyped)}: {inputText}
          </AppText>}


          {/* Localized Welcome */}
          <AppText style={[styles.subtitle, { color: theme.textPrimary }]}>
            {t(Strings.welcome)}
          </AppText>
          <Card>
            <AppText style={{ fontSize: 18, fontWeight: '600', textAlign: 'center', color: theme.textPrimary }}>
              {t(Strings.counterTitle)} : {count}
            </AppText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
              <AppButton title="-" onPress={() => setCount(count - 1)} disabled={count === 0} />
              <AppButton title="+" onPress={() => setCount(count + 1)} />
            </View>
          </Card>

          <AppButton
            title={t(Strings.settingsTitle)}
            onPress={() => navigation.navigate('Settings')}
          />
          <AppButton
            title={t(Strings.profileTitle)}
            onPress={() => navigation.navigate('Profile')}
          />
          <AppButton title={t(Strings.openModal)} onPress={() => setModalVisible(true)} />

          <FlatList
            data={staticData}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => {
              return (
                <AppText style={[styles.subtitle, { color: theme.textPrimary }]}>Static Data</AppText>
              )
            }}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 24, flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}
          />



          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString() as any}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <AppText style={[styles.subtitle, { color: theme.textPrimary }]}>Api Data</AppText>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <AppText style={[styles.subtitle, { color: theme.secondary, alignSelf: 'center' }]}>Check the Internet</AppText>
              )
            }}
            renderItem={({ item }) => (
              <View style={{ padding: 10 }}>
                <AppText style={{ fontWeight: 'bold' }}>{item.title}</AppText>
                <AppText>{item.body}</AppText>
              </View>
            )}
          />
      
        </Card>
          <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={t(Strings.modalTitle)}
          message={t(Strings.modalMessage)}
          confirmText={t(Strings.close)}
        />
      </ScrollView>



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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 16,
  },
});