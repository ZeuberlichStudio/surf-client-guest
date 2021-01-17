import React from 'react';
import { View, StyleSheet } from 'react-native';
import ItemsList from '../features/menu/items-list';

function CategoryScreen({ route, navigation }) {

    const { _id, headerImage } = route.params;

    return (
        <View style={ styles.screen }>
            <ItemsList {...{ _id, headerImage, navigation }}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        paddingTop: 64,
        backgroundColor: 'white'
    },
});

export default CategoryScreen;