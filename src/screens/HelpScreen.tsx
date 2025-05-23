import React, { useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AppText } from '../components/AppText';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/Card';
import CustomModal from '../components/Modal';
import useStrings from '../i18n/strings';
import { AppButton } from '../components/AppButton';
import Strings from '../constants/strings';
import Colors from '../constants/colors';

export const HelpScreen = () => {
    const { theme } = useTheme();
    const { t } = useStrings();

    const [selectedTopic, setSelectedTopic] = useState<{ title: string; content: string } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const helpTopics = [
        {
            id: '1',
            titleKey: 'whatIsThisApp',
            contentKey: 'whatIsThisAppDetail',
        },
        {
            id: '2',
            titleKey: 'howToChangeTheme',
            contentKey: 'howToChangeThemeDetail',
        },
        {
            id: '3',
            titleKey: 'languageSupport',
            contentKey: 'languageSupportDetail',
        },
    ];

    const openModal = (item: { titleKey: string; contentKey: string }) => {
        setSelectedTopic({
            title: t(item.titleKey),
            content: t(item.contentKey),
        });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedTopic(null);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <AppText>{t(Strings.helpScreenTitle)}</AppText>
            <FlatList
                data={helpTopics}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)}>
                        <Card>
                            <AppText style={[styles.title, { color: theme.textPrimary }]}>
                                {t(item.titleKey)}
                            </AppText>
                        </Card>
                    </TouchableOpacity>
                )}
            />

            <CustomModal visible={modalVisible} onClose={closeModal}>
                {selectedTopic && (
                    <View>
                        <AppText style={[{ color: Colors.textPrimaryLight }]}>
                            {selectedTopic.title}
                        </AppText>
                        <AppText style={[{ color: Colors.textSecondaryLight }]}>
                            {selectedTopic.content}
                        </AppText>
                        <AppButton title={t(Strings.close)} onPress={closeModal} style={{ marginTop: 24 }} />
                    </View>
                )}
            </CustomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical:24,
        paddingHorizontal:16
    },
    card: {
        marginBottom: 12,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
});
