// src/theme/theme.js
import Colors from '../constants/colors';

const lightTheme = {
  mode: 'light',
  background: Colors.backgroundLight,
  secondary: Colors.secondaryLight,
  textPrimary: Colors.textPrimaryLight,
  textSecondary: Colors.textSecondaryLight,
  border: Colors.borderLight,
  error: Colors.error,
  cardbackground: Colors.cardbackgroundLight,
  cardBorder: Colors.cardBorderLight
};

const darkTheme = {
  mode: 'dark',
  background: Colors.backgroundDark,

  secondary: Colors.secondaryDark,
  textPrimary: Colors.textPrimaryDark,
  textSecondary: Colors.textSecondaryDark,
  border: Colors.borderDark,
  error: Colors.errorDark,
  cardbackground: Colors.cardbackgroundDark,
  cardBorder: Colors.cardBorderDark,
};

export { lightTheme, darkTheme };
