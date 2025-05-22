import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const FLAG_URLS: Record<string, string> = {
  en: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
  ta: 'https://cdn.britannica.com/97/1597-050-008F30FA/Flag-India.jpg',
};

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const animation = useRef(new Animated.Value(language === 'ta' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: language === 'ta' ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [language]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 52], // fine-tuned for smaller size
  });

  return (
    <Pressable onPress={toggleLanguage}>
      <View style={styles.container}>
        <Text style={[styles.label, { opacity: language === 'en' ? 0 : 1 }]}>EN</Text>

        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
          <Image
            source={{ uri: language === 'ta' ? FLAG_URLS.ta : FLAG_URLS.en }}
            style={styles.flag}
          />
        </Animated.View>

        <Text style={[styles.label, { opacity: language === 'ta' ? 0 : 1 }]}>TA</Text>
      </View>
    </Pressable>
  );
};

export default LanguageToggle;


const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'relative',
    shadowColor: '#fff',
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  slider: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    top: 0,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#A3B1C6',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#4B5563',
    zIndex: 1,
  },
});
