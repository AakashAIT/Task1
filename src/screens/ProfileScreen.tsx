import React from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AppText } from '../components/AppText';
import { AppButton } from '../components/AppButton';
import Strings from '../constants/strings';
import useStrings from '../i18n/strings';
import { Card } from '../components/Card';
import { validateName, validateEmail } from '../utils/validation';
import { useUserContext } from '../context/UserContext';
import { useForm } from '../hooks/useForm';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  
}

export function ProfileScreen() {
  const { theme } = useTheme();
  const { t } = useStrings();
  const { user, setUser } = useUserContext();

  const validate = (values: UserProfile) => {
    const errors: Partial<Record<keyof UserProfile, string>> = {};
    const nameErr = validateName(values.name);
    const emailErr = validateEmail(values.email);

    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm<UserProfile>({
    initialValues: user,
    validate,
    onSubmit: (formData : any) => {
      setUser(formData);
      Alert.alert(t(Strings.success), t(Strings.profileUpdated));
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <AppText style={styles.title}>{t(Strings.profileTitle)}</AppText>

      <Card>
        <Image
          source={{
            uri:
              user.avatar ||
              'https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4395.jpg',
          }}
          style={styles.avatar}
        />

        <AppText style={[styles.label, { color: theme.textSecondary }]}>
          {t(Strings.nameLabel)}
        </AppText>
        <TextInput
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholder={t(Strings.enterName)}
          placeholderTextColor={theme.textSecondary}
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.card,
              color: theme.textPrimary,
            },
          ]}
        />
        {errors.name && <AppText style={styles.error}>{t(errors.name)}</AppText>}

        <AppText style={[styles.label, { color: theme.textSecondary }]}>
          {t(Strings.emailLabel)}
        </AppText>
        <TextInput
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          placeholder={t(Strings.emailField)}
          placeholderTextColor={theme.textSecondary}
          keyboardType="email-address"
          style={[
            styles.input,
            {
              borderColor: theme.border,
              backgroundColor: theme.card,
              color: theme.textPrimary,
            },
          ]}
        />
        {errors.email && <AppText style={styles.error}>{t(errors.email)}</AppText>}

        <AppButton title={t(Strings.save)} onPress={handleSubmit} style={{ marginTop: 16 }} />
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
