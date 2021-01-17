import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectTotal } from 'features/cart/slice';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import BgCart from 'assets/images/bg_cart.svg';
import SizeSmall from 'assets/images/icon_cart-size-small.svg';
import SizeReg from 'assets/images/icon_cart-size-reg.svg';
import SizeBig from 'assets/images/icon_cart-size-big.svg';
import SizeSmallActive from 'assets/images/icon_cart-size-small-active.svg';
import SizeRegActive from 'assets/images/icon_cart-size-reg-active.svg';
import SizeBigActive from 'assets/images/icon_cart-size-big-active.svg';
import { TouchableHighlight } from 'react-native-gesture-handler';

function CartScreen({ navigation }) {
    const cartState = useSelector(state => state.cart);

    return (
        <View style={{ width: 375, flex: 1, backgroundColor: 'white' }}>
            <Text style={screenStyles.title}>
                Корзина
            </Text>

            {
                cartState.items[0] ?
                <CartList items={cartState.items}/> :
                <Text styles={screenStyles.empty}>Ваша корзина пуста</Text>
            }

            <View style={ screenStyles.bgWrapper }>
                <BgCart/>
            </View>

            <CartTotal {...{navigation}}/>
        </View>
    );
}

const screenStyles = StyleSheet.create({
    title: {
        paddingLeft: 24,
        paddingTop: 64,
        fontFamily: 'BNP-SemiExpBoldIt',
        color: '#2A1F8A',
        fontSize: 95,
        lineHeight: 86
    },
    empty: {
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
        textTransform: 'uppercase'
    },
    bgWrapper: {
        top: 0,
        bottom: 0,
        left: 24,
        position: 'absolute',
        justifyContent: 'center',
        zIndex: -1,
    }
})

function CartTotal({navigation}) {
    const cartTotal = useSelector(selectTotal);

    return (
        <View style={totalStyles.container}>
            <Text style={totalStyles.total}>ИТОГО: {cartTotal} руб.</Text>

            <TouchableHighlight onPress={() => navigation.navigate('OrderForm')}>
                <Text style={totalStyles.button}>ДАЛЕЕ</Text>
            </TouchableHighlight>
        </View>
    );
}

const totalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        flexDirection: 'row'
    },
    total: {
        width: 276,
        height: 44,
        paddingLeft: 12,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 32,
        lineHeight: 44,
        backgroundColor: '#26189A',
        color: 'white'
    },
    button: {
        paddingHorizontal: 12,
        marginTop: 4,
        marginLeft: -16,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 32,
        lineHeight: 44,
        backgroundColor: '#D9000D',
        color: 'white'
    }
});

function CartList({items}) {
    return (
        <View style={ listStyles.container }>
            <FlatList
                style={listStyles.items}
                data={items}
                renderItem={props => <CartItem {...props}/>}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={ listStyles.liner }>
                <View style={ listStyles.heading }>
                    <Text style={ listStyles.headingText }>Позиция:</Text>
                    <Text style={{...listStyles.headingText, width: 50 }}>Цена:</Text>
                </View>

                <View style={ listStyles.lines }>
                    <View style={ listStyles.line }/>
                </View>
            </View>
        </View>
    );
}

const listStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: 375,
        marginTop: 12
    },
    items: {
        marginTop: 50,
        paddingLeft: 20,
        zIndex: 2
    },
    liner: {
        paddingHorizontal: 24,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute'
    },
    heading: {
        width: 375,
        height: 50,
        paddingLeft: 24,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingText: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 16,
        textAlign: 'center',
        color: '#1B0C95'
    },
    lines: {
        flex: 1,
        paddingVertical: 34,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    line: {
        width: 1,
        marginHorizontal: 25,
        backgroundColor: '#121211'
    }
});

function CartItem({
    item: {
        name,
        sizes,
        selectedSize
    },
    index
}) {
    const dispatch = useDispatch();

    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.info}>
                <Text style={itemStyles.name}>{name}</Text>
                <View style={itemStyles.sizes}>
                    { selectedSize === 'small' ? <SizeSmallActive/> : <SizeSmall/> }
                    { selectedSize === 'reg' ? <SizeRegActive/> : <SizeReg/> }
                    { selectedSize === 'big' ? <SizeBigActive/> : <SizeBig/> }
                </View>
                <Text style={itemStyles.price}>{sizes[selectedSize]?.price}</Text>
            </View>

            <TouchableOpacity onPress={() => dispatch(removeItem(index))}>
                <Text style={itemStyles.remove}>X УДАЛИТЬ</Text>
            </TouchableOpacity>
        </View>
    );
};

const itemStyles = StyleSheet.create({
    container: {
        marginVertical: 12
    },
    info: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    name: {
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
        textTransform: 'uppercase',
        flex: 1
    },
    sizes: {
        width: 40,
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    price: {
        width: 50,
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        textAlign: 'center'
    },
    remove: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 22,
        color: '#EA303B',
    }
});

export default CartScreen;

