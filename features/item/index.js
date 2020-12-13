import React from 'react';
import { Text, View , Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from "expo-blur";
import { SvgUri } from 'react-native-svg';

import IconClose from '../../assets/images/icon_close.svg';

import Sizes from './sizes';
import Price from './price';

const API_URL = "http://172.20.10.2:3001/";

function Item({ navigation, route }) {

    const { slug } = route.params;
    
    const [data, setData] = React.useState({});
    const [status, setStatus] = React.useState('idle');

    function fetchProduct() {
        const endpoint = `products/slug=${slug}`;
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
            <TouchableOpacity onPress={ () => navigation.goBack() } style={ closeStyles.close }>
                <IconClose width="30"/>
            </TouchableOpacity>
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

function ItemContent({ name, desc, type, sizes }) {

    const [currentSize, setCurrentSize] = React.useState('small');

    React.useEffect(() => {
        setCurrentSize(Object.entries(sizes)[0][0]);
    }, [sizes]);

    return (
        <BlurView intensity={100} tint="default" style={ contentStyles.wrapper }>
        <View style={ contentStyles.container }>
            <Text style={ contentStyles.marker }>{ type.toUpperCase() }</Text>
            <Text style={ contentStyles.title }>{ name }</Text>
            <Text style={ contentStyles.description }>{ desc }</Text>
            <View style={ contentStyles.separator }/>
            <Sizes {...{ sizes, currentSize, setCurrentSize }}/>
            <Price {...{ sizes, currentSize, addons: [] }}/>
        </View>
        </BlurView>
    );
}

const ItemBackground = ({images}) => (
    <View style={ bgStyles.bgWrapper }>
        <SvgUri uri={`${API_URL}static/${images.background}`}/> 
    </View>
);

const closeStyles = StyleSheet.create({
    close: {
        top: 36,
        right: 36,
        position: 'absolute',
        zIndex: 3
    }
});

const imageStyles = StyleSheet.create({
    imageWrapper: {
        width: 256,
        height: 328,
        left: 8,
        top: 8,
        position: 'absolute',
        backgroundColor: 'grey'
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
        backgroundColor: 'rgba(38, 24, 154, .6)',
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
});

const bgStyles = StyleSheet.create({
    bgWrapper: {
        top: 194,
        left: 24,
        position: 'absolute'
    }
});

export default Item;