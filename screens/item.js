import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from 'features/cart/slice';
import { Text, View , Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from "expo-blur";
import { SvgUri } from 'react-native-svg';

import Sizes from 'features/item/sizes';

import IconAddToCart from 'assets/images/icon_add-to-cart.svg';

const API_URL = "http://192.168.0.100:3001/";

function Item({ route }) {

    const { _id } = route.params;
    
    const [data, setData] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    function fetchProduct() {
        const endpoint = `products/${_id}`;
        console.log(API_URL + endpoint);
        fetch(API_URL + endpoint)
            .then( data => data.json() )
            .then( data => {
                setData(data);
                setStatus('succeeded');
            })
            .catch( err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchProduct();
    }, []);

    const { images } = data;

    return (
        <View style={{ width: 375 }}>
            { 
                status === 'succeeded' &&  
                <>
                    <ItemImage images={images}/>
                    <ItemContent {...{...data}}/>
                    <ItemBackground images={images}/>
                </>
            }
        </View>
    );
}

const ItemImage = ({ images }) => (
    <View style={ imageStyles.imageWrapper }>
        <Image source={{ uri: `${API_URL}static/${images?.photo}` }} style={ imageStyles.image }/>
    </View>
);

function ItemContent({ _id, name, desc, type, sizes }) {

    const [currentSize, setCurrentSize] = React.useState('small');

    React.useEffect(() => {
        setCurrentSize(Object.entries(sizes)[0][0]);
    }, [sizes]);

    const dispatch = useDispatch();

    function addToCart() {
        dispatch(addItem({ 
            _id, 
            name, 
            desc, 
            sizes, 
            selectedSize: currentSize 
        }));
    }

    return (
        <BlurView intensity={100} tint="dark" style={ contentStyles.wrapper }>
        <View style={ contentStyles.container }>
            <Text style={ contentStyles.marker }>{ type.toUpperCase() }</Text>
            <Text style={ contentStyles.title }>{ name }</Text>
            <Text style={ contentStyles.description }>{ desc }</Text>
            <View style={ contentStyles.separator }/>
            <Sizes {...{ sizes, currentSize, setCurrentSize }}/>
            <View style={contentStyles.buyContainer}>
                <Price {...{ sizes, currentSize, addons: [] }}/>
                <TouchableOpacity onPress={addToCart} style={contentStyles.addToCart}>
                    <IconAddToCart/>
                </TouchableOpacity>
            </View>
        </View>
        </BlurView>
    );
}

const ItemBackground = ({images}) => (
    <View style={ bgStyles.bgWrapper }>
        <SvgUri uri={`${API_URL}static/${images.background}`}/> 
    </View>
);

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
        height: 44,
        backgroundColor: '#D9000D'
    },
    amount: {
        fontFamily: 'BebasNeuePro-BoldIt',
        letterSpacing: 2,
        fontSize: 32,
        lineHeight: 44,
        width: 136,
        textAlign: 'center',
        color: 'white'
    }
});

const imageStyles = StyleSheet.create({
    imageWrapper: {
        width: 256,
        height: 328,
        left: 8,
        top: 8,
        position: 'absolute',
        backgroundColor: 'gray'
    },
    image: {
        width: 256,
        height: 328
    }
});

const contentStyles = StyleSheet.create({
    wrapper: {
        width: 258,
        left: 120 + 2,
        top: 186,
        position: 'absolute',
    },  
    container: {
        width: 258,
        padding: 8,
        backgroundColor: 'rgba(38, 24, 154, .5)',
        borderWidth: 2,
        borderColor: 'white'
    },
    marker: {
        fontFamily: 'BebasNeuePro-SemiExpBold',
        letterSpacing: .7,
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        color: 'white',
        width: 60,
        height: 22,
        right: 16,
        top: -16,
        position: 'absolute',
        backgroundColor: '#D9000D'
    },
    title: {
        marginTop: 4,
        fontFamily: 'FuturaPT-Book',
        fontSize: 30,
        lineHeight: 30,
        color: 'white'
    },
    description: {
        marginTop: 8,
        fontFamily: 'ProximaNova-Semibold',
        fontSize: 14,
        lineHeight: 14,
        color: 'white'
    },
    separator: {
        width: 95,
        height: 2,
        marginVertical: 12,
        backgroundColor: 'white'
    },
    buyContainer: {
        position: 'absolute',
        left: 16,
        bottom: -37,
        flexDirection: 'row',
    },
    addToCart: {
        marginLeft: 8,
        paddingVertical: 7,
        paddingHorizontal: 7,
        backgroundColor: '#D9000D'
    }
});

const bgStyles = StyleSheet.create({
    bgWrapper: {
        top: 194,
        left: 24,
        position: 'absolute'
    }
});

export default Item;