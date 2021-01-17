import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Item({ name, _id, sizes, sizesMarkup = { small: true, reg: true, big: true }, navigation }) {

    return (
        <TouchableOpacity onPress={ () => navigation.navigate('ModalItem', { _id }) }>
            <View style={ itemStyles.container }>
                <Text style={ itemStyles.name }>{ name.toUpperCase() }</Text>
                { sizesMarkup.small && <Text style={ itemStyles.price }>{ sizes.small && sizes.small.price }</Text> }
                { sizesMarkup.reg && <Text style={ itemStyles.price }>{ sizes.reg && sizes.reg.price }</Text> }
                { sizesMarkup.big && <Text style={ itemStyles.price }>{ sizes.big && sizes.big.price }</Text> }
            </View>
        </TouchableOpacity>
    );
}

const itemStyles = StyleSheet.create({
    container: {
        marginVertical: 17,
        flexDirection: 'row'
    },
    name: {
        flexGrow: 1,
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        lineHeight: 31,
        textDecorationLine: 'underline',
        textDecorationColor: '#121211',
        color: '#121211'
    },
    price: {
        width: 50,
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        lineHeight: 31,
        textAlign: 'center',
        color: '#121211'
    }
});

export default Item;