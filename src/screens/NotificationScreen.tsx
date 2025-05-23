import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { Entypo } from '@expo/vector-icons';
import Strings from '../constants/strings';
import useStrings from '../i18n/strings';

type Notification = {
    id: string;
    title: string;
    description: string;
};

const initialNotifications: Notification[] = [
    {
        id: '1',
        title: 'New Feature',
        description: 'We just added a dark mode!',
    },
    {
        id: '2',
        title: 'Maintenance',
        description: 'Scheduled maintenance on Saturday.',
    },
    {
        id: '3',
        title: 'Welcome',
        description: 'Thanks for installing our app!',
    },
];

export const NotificationScreen = () => {
    const { theme } = useTheme();
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const { t } = useStrings();
    const handleDelete = (id: string) => {
        Alert.alert(
           `${t(Strings.deleteNotificationTitle)}`,
            `${t(Strings.deleteNotificationMessage)}`,
            [
                { text: `${t(Strings.cancel)}`, style: 'cancel' },
                {
                    text: `${t(Strings.delete)}`,
                    style: 'destructive',
                    onPress: () => {
                        setNotifications((prev) => prev.filter((item) => item.id !== id));
                    },
                },
            ]
        );
    };


    const renderItem = ({ item }: { item: Notification }) => (
        <Card >
            <View style={styles.row}>
                <View style={styles.textContainer}>
                    <AppText style={[styles.title, { color: theme.textPrimary }]}>{item.title}</AppText>
                    <AppText style={[styles.description, { color: theme.textSecondary }]}>{item.description}</AppText>
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Entypo name="trash" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponent={() => {
                    return (
                        <AppText style={{ color: theme.textSecondary, textAlign: 'left', marginBottom: 5 }}>
                            {t(Strings.notificationTitle)}
                        </AppText>
                    )
                }}
                ListEmptyComponent={
                    <AppText style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 40 }}>
                        {t(Strings.noNotification)}                    </AppText>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24
    },
    card: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        paddingRight: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    description: {
        marginTop: 4,
        fontSize: 14,
    },
});
