import React from'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import Placeholder from '../../assets/images/placeholder_category_title.svg';
import IconBack from '../../assets/images/icon_back.svg';
import ControlsMarker from '../../assets/images/category_controls.svg';

import Item from './item.js';

import SizeSmall from '../../assets/images/icon_liner_small.svg';
import SizeReg from '../../assets/images/icon_liner_reg.svg';
import SizeBig from '../../assets/images/icon_liner_big.svg';
import { SvgUri } from 'react-native-svg';

const API_URL = "http://172.20.10.2:3001/";

function Category({ navigation, slug, headerImage }) {
    const [column, setColumn] = React.useState(0);

    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const transform = {
        transform: [{translateX: slideAnim}]
    };

    function changeColumn(column) {
        setColumn(column);
    };

    function slide() {
        Animated.timing(slideAnim, {
            toValue: -375 * column,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    React.useEffect(() => {
        return slide();
    }, [column]);

    return (
        <View style={ categoryStyles.container }>
            <Title {...{ headerImage, navigation }}/>
            <Controls {...{ column, setColumn }}/>
            <Animated.View style={[ categoryStyles.listsContainer, transform ]}>
                <List {...{ slug, type: 'classic', navigation }}/>
                <List sizesMarkup={{ reg: true, big: true }} {...{ slug, type: 'special', navigation }}/>
            </Animated.View>
        </View>
    );
}

function Title({ headerImage, navigation }) {

    return ( 
        <View style={ titleStyles.container }>
            <TouchableOpacity style={ titleStyles.button } onPress={ () => navigation.goBack() }>
                <IconBack/>
            </TouchableOpacity>
            <SvgUri uri={headerImage}/>
        </View> 
    );
}

function Controls({ column, setColumn }) {

    const slideAnim = React.useRef(new Animated.Value(0)).current;
    const transform = {
        transform: [{translateX: slideAnim}]
    };

    function changeColumn(column) {
        setColumn(column);
    };

    function slide() {
        Animated.timing(slideAnim, {
            toValue: -375 * ( column || 0 ),
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    React.useEffect(() => {
        return slide();
    }, [column]);

    return (
        <Animated.View style={[ controlsStyles.container, transform ]}>
            <ControlsMarker style={ controlsStyles.marker } width={ 375 * 2 }/>

            <View style={ controlsStyles.buttonWrapper }>
                <TouchableOpacity onPress={ () => changeColumn(1) }>
                    <Text style={ controlsStyles.button }>Легенды</Text>
                </TouchableOpacity>
            </View>

            <View style={ controlsStyles.buttonWrapper }>
                <TouchableOpacity onPress={ () => changeColumn(0) }>
                    <Text style={ controlsStyles.button }>Классика</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

function List({ 
    slug,
    type,
    sizesMarkup = { small: true, reg: true, big: true }, 
    navigation 
}) {

    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchItems() {
        const endpoint = `products?category=${slug}&type=${type}`;

        fetch(API_URL + endpoint)
            .then( data => data.json() )
            .then( data => {
                setStatus('succeeded');
                setData(data);
            })
            .catch( err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchItems();
    }, []);

    const staticEndpoint= {}

    return (
        <View style={ listStyles.container }>
            <View style={ listStyles.items }>
                { data.map( (item, i) => <Item {...{ ...item, sizesMarkup, navigation, key: i }}/> ) }
            </View>
            <View style={ listStyles.liner }>
                { Object.entries(sizesMarkup).map( ( size, i ) => i ? <View key={i} style={ listStyles.line }></View> : null ) }
                <View style={ listStyles.sizes }>
                    { sizesMarkup.big && <SizeBig width="50" height="39"/> }
                    { sizesMarkup.reg && <SizeReg width="50" height="34"/> }
                    { sizesMarkup.small && <SizeSmall width="50" height="29"/> }
                </View>
            </View>
            <View style={ listStyles.bgWrapper }>
                <SvgUri uri={`${API_URL}static/bg_${type}.svg`}/>
            </View>
        </View>
    );
}

const categoryStyles = StyleSheet.create({
    container: {
        width: 375,
        height: 605,
        backgroundColor: 'transparent',
        overflow: 'hidden'
    },
    listsContainer: {
        flexDirection: 'row',
        flexGrow: 1
    }
});

const titleStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontFamily: 'BNP-SemiExpBoldIt',
        fontSize: 40,
        letterSpacing: 2,
        color: 'white',
        textShadowRadius: 5,
        textShadowColor: '#121211'
    },
    button: {
        width: 28.8,
        height: 28.8,
        marginLeft: -8,
        alignItems: 'center'
    }
});

const controlsStyles = StyleSheet.create({
    container: {
        height: 28,
        marginTop: 10,
        flexDirection: 'row'
    },
    marker: {
        position: 'absolute'
    },
    buttonWrapper: {
        width: 375,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    button: {
        fontFamily: 'BebasNeuePro-Bold',
        fontSize: 22,
        lineHeight: 22,
        color: '#D9000D'
    }
});

const listStyles = StyleSheet.create({
    container: {
        width: 375,
        marginTop: 12
    },
    items: {
        marginTop: 50,
        paddingLeft: 20,
        paddingRight: 6,
        zIndex: 2
    },
    sizes: {
        right: 5,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    liner: {
        paddingLeft: 20,
        paddingRight: 25 + 5,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    line: {
        width: 1,
        marginVertical: 34,
        marginHorizontal: 25,
        backgroundColor: '#121211'
    },
    test: { backgroundColor: 'red' },
    bgWrapper: {
        top: 64,
        left: 24,
        position: 'absolute'
    }
});

export default Category;