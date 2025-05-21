// components/AppButton.tsx

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  TextProps,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import useStrings from '../i18n/strings';
import Colors from '../constants/colors';

interface AppButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useStrings();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isDarkMode ? styles.darkbtn : styles.lightbtn,
        style,
        disabled && styles.disabledBtn,
      ]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: theme.textPrimary },
          textStyle,
        ]}
      >
        {t(title)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  darkbtn: {
    backgroundColor: Colors.darkButton,
  },
  lightbtn: {
    backgroundColor: Colors.lightButton,
  },
  disabledBtn: {
    opacity: 0.6,
  },
});
