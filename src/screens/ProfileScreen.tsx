import { View, Text, KeyboardAvoidingView, Platform, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { AppButton } from '../components/AppButton';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import Strings from '../constants/strings';
import { validateName, validateEmail } from '../utils/validation';
import { useTheme } from '../context/ThemeContext';
import useStrings from '../i18n/strings';
import { useNavigation } from '@react-navigation/native';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';

export function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const { theme } = useTheme();
    const { t } = useStrings();
    const navigation =useNavigation();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
             <ThemeToggle />
            <LanguageToggle/>

            <Card>
                <AppText style={[styles.subtitle, { color: theme.textPrimary }]}>
                    {t(Strings.nameField)}</AppText>
                <TextInput
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setNameError(null);
                    }}
                    placeholder={t(Strings.enterName)}
                    placeholderTextColor={theme.textSecondary}
                    style={[styles.inputStyle, {
                        borderColor: theme.border,
                        backgroundColor: theme.card,
                        color: theme.textPrimary,
                    }]}
                />
                {nameError && <AppText style={{ color: 'red' }}>{t(nameError)}</AppText>}

                     <AppText style={[styles.subtitle, { color: theme.textPrimary }]}>
                    {t(Strings.emailField)}</AppText>
                <TextInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(null);
                    }}
                    placeholder="you@example.com"
                    placeholderTextColor={theme.textSecondary}
                    style={[styles.inputStyle, {
                        borderColor: theme.border,
                        backgroundColor: theme.card,
                        color: theme.textPrimary,
                    }]}
                    keyboardType="email-address"
                />
                {emailError && <AppText style={{ color: 'red' }}>{t(emailError)}</AppText>}

                <AppButton
                    title={t(Strings.submitLabel)}
                    onPress={() => {
                        const nameErr = validateName(name);
                        const emailErr = validateEmail(email);
                        setNameError(nameErr);
                        setEmailError(emailErr);

                        if (!nameErr && !emailErr) {
                            console.log('Form submitted:', { name, email });
                            navigation.navigate('HomeTabs')
                        }
                    }}
                    style={{ marginTop: 16 }}
                />
            </Card>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        gap: 16,
    },
    inputStyle: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
    },
      subtitle: {
    fontSize: 18,
  },


});


