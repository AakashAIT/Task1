// components/AppText.tsx
import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Colors from '../constants/colors';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({ children, style, ...rest }) => {
  const { theme, isDarkMode } = useTheme();
  return (
    <Text
      style={[styles.text, isDarkMode ? styles.darkText : styles.lightText // ← This is correct
        , style]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 30,
  },
  lightText: {
    color: Colors.textPrimaryLight,
    fontSize: 16,
  },
  darkText: {
    color: Colors.textPrimaryDark,
    fontSize: 20,
  },
});
