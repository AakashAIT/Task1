// src/theme/theme.js
import Colors from '../constants/colors';

const lightTheme = {
  mode: 'light',
  background: Colors.backgroundLight,
  surface: Colors.surfaceLight,
  primary: Colors.primary,
  secondary: Colors.secondary,
  textPrimary: Colors.textPrimaryLight,
  textSecondary: Colors.textSecondaryLight,
  border: Colors.borderLight,
  error: Colors.error,
  status: Colors.statusLight,
  cardbackground:'#FFFFFF',
  cardBorder:'#E0E0E0'
};

const darkTheme = {
  mode: 'dark',
  background: Colors.backgroundDark,
  surface: Colors.surfaceDark,
  primary: Colors.primaryLight, 
  secondary: Colors.secondaryLight,
  textPrimary: Colors.textPrimaryDark,
  textSecondary: Colors.textSecondaryDark,
  border: Colors.borderDark,
  error: Colors.errorDark,
  status: Colors.statusDark,
  cardbackground:'#1E1E1E',
  cardBorder:'#333333'
};

export { lightTheme, darkTheme };
