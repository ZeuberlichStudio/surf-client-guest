import React from 'react';
import { Text, View , Image, StyleSheet} from 'react-native';

function Price({ sizes, currentSize, addons }) {

    function calcPrice() {
        const size = sizes[currentSize];
        let price = size && size.price;
        for ( const addon of addons ) price += ( addon.price * qty );

        return price || 'Error';
    }

    return (
        <View style={ priceStyles.container }>
            <Text style={ priceStyles.amount }>{ `+${calcPrice()} руб.` }</Text>
        </View>
    );
}

const priceStyles = StyleSheet.create({
    container: {
        width: 136,
        height: 45,
        left: 16,
        bottom: -37,
        position: 'absolute',
        backgroundColor: '#D9000D'
    },
    amount: {
        fontFamily: 'BebasNeuePro-BoldIt',
        letterSpacing: 2,
        fontSize: 32,
        lineHeight: 45,
        width: 136,
        textAlign: 'center',
        color: 'white'
    }
});

export default Price;