import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { SEARCH_ITEMS } from '../constants/searchItems';
import { AppText } from '../components/AppText';
import { Card } from '../components/Card';
import { AppButton } from '../components/AppButton';
import Strings from '../constants/strings';
import useStrings from '../i18n/strings';

const ITEMS_PER_PAGE = 10;

export const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(SEARCH_ITEMS as any);
    const [visibleItems, setVisibleItems] = useState([] as any); // Paginated display
    const [page, setPage] = useState(1);
    const {t} =useStrings();
    useEffect(() => {
        const matched = SEARCH_ITEMS.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(matched);
        setPage(1);
    }, [query]);

    useEffect(() => {
        const start = 0;
        const end = page * ITEMS_PER_PAGE;
        setVisibleItems(filteredItems.slice(start, end));
    }, [filteredItems, page]);

    const handleLoadMore = () => {
        if (page * ITEMS_PER_PAGE < filteredItems.length) {
            setPage(prev => prev + 1);
        }
    };

    const renderItem = ({ item }: any) => (
        <Card>
            <AppText >{item.name}</AppText>
            <AppText>{item.description}</AppText>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                placeholder={t(Strings.searchPlaceHolder)}
                value={query}
                onChangeText={setQuery}
            />

            <FlatList
                data={visibleItems}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListFooterComponent={
                    page * ITEMS_PER_PAGE < filteredItems.length ? (
                        <AppButton title={t(Strings.loadMore)}onPress={handleLoadMore} />
                    ) : null
                }
            />
            <AppText>Page No:{page}</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    search: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
    },
    item: {
        padding: 12,
        marginBottom: 8,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
    },
    name: {
        fontWeight: 'bold',
    },
    description: {
        color: '#555',
    },
    loadMore: {
        padding: 12,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    loadMoreText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
