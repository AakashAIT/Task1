// src/components/LanguageToggle.tsx

import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const animation = useRef(new Animated.Value(language === 'ta' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: language === 'ta' ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [language]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // movement between EN and TA
  });

  return (
    <Pressable onPress={toggleLanguage}>
      <View style={styles.toggleContainer}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] }]} />
        <Text style={[styles.label, language === 'en' && styles.active]}>EN</Text>
        <Text style={[styles.label, language === 'ta' && styles.active]}>தமி</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: 56,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    top: 4,
    left: 4,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    zIndex: 1,
    fontWeight: '600',
    color: '#6B7280',
  },
  active: {
    color: '#FFFFFF',
  },
});

export default LanguageToggle;
