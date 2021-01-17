import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Categories from '../features/menu/categories-list';

function CategoriesScreen({ navigation }) {
    return (
        <View style={ screenStyles.screen }>
            <Text style={ screenStyles.title }>Меню</Text>
            <Categories {...{navigation}}/>
        </View>
    );
}

const screenStyles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        paddingTop: 64,
        paddingLeft: 24,
        backgroundColor: 'white'
    },
    title: {
        paddingLeft: 6,
        fontFamily: 'BNP-SemiExpBoldIt',
        color: '#2A1F8A',
        fontSize: 95,
        lineHeight: 86
    }
});

export default CategoriesScreen;