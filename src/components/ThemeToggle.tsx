// src/components/ThemeToggle.tsx

import React, { useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated, ViewStyle } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const animation = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDarkMode ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDarkMode]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 28], // slider knob movement
  });

  const bgColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e5e7eb', '#4B5563'], // light gray to dark gray
  });

  return (
    <Pressable onPress={toggleTheme}>
      <Animated.View style={[styles.toggleContainer, { backgroundColor: bgColor }]}>
        <Animated.View style={[styles.slider, { transform: [{ translateX }] },{backgroundColor: isDarkMode ? "#000" : "#fff"}]}>
          <Feather
            name={isDarkMode ? 'moon' : 'sun'}
            size={18}
            color={isDarkMode ? '#fff' : '#f59e0b'}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 60,
    height: 30,
    borderRadius: 30,
    padding: 2,
    justifyContent: 'center',
  } as ViewStyle,
  slider: {
    width: 26,
    height: 26,
    borderRadius: 13,
    // backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  } as ViewStyle,
});

export default ThemeToggle;
