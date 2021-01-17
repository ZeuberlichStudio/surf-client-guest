import React from 'react';
import { Text, View , Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { BlurView } from "expo-blur";

import BgOrder from 'assets/images/bg_order.svg';

const API_URL = "http://192.168.0.100:3001/";

function OrderScreen({ route }) {

    const {_id} = route.params;
    const [data, setData] = React.useState({});
    
    function fetchData() {
        fetch(API_URL + `orders/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(_id)
                setData(data);
            })
            .catch(console.log);
    }

    React.useEffect(() => fetchData(), []);

    const {
        status,
        readyBy,
        total,
        cafe
    } = data;

    return (
        <View style={screenStyles.container}>
            <BlurView intensity={100} tint="dark" style={ contentStyles.wrapper }>
            <View style={ contentStyles.container }>
                <View >
                    <Text style={contentStyles.header}>НОМЕР ЗАКАЗА:</Text>
                    <Text style={contentStyles.id}>#{_id}</Text>
                </View>

                <View style={contentStyles.block}>
                    <Text style={contentStyles.header}>СТАТУС:</Text>
                    <Text style={contentStyles.status}>
                        { status === 'accepted' && 'Принят' }
                        { status === 'inProgress' && 'Готовится' }
                        { status === 'ready' && 'Готов' }
                        { status === 'done' && 'Отдан' }
                    </Text>
                </View>

                <View style={contentStyles.block}>
                    <Text style={contentStyles.header}>ДЕТАЛИ ЗАКАЗА:</Text>

                    <View style={contentStyles.subBlock}>
                        <Text style={contentStyles.subBlockTitle}>ВРЕМЯ ГОТОВНОСТИ:</Text>
                        <Text style={contentStyles.subBlockValue}>{readyBy}</Text>
                    </View>

                    <View style={contentStyles.subBlock}>
                        <Text style={contentStyles.subBlockTitle}>СТОИМОСТЬ:</Text>
                        <Text style={contentStyles.subBlockValue}>{total}</Text>
                    </View>

                    <View style={contentStyles.subBlock}>
                        <Text style={[contentStyles.subBlockTitle, { width: 44 }]}>АДРЕС СПОТА:</Text>
                        <View style={contentStyles.cafe}>
                            <Text style={contentStyles.cafeName}>{cafe?.name}</Text>
                            <Text style={contentStyles.cafeAddress}>{cafe?.address.split(',')[0]}</Text>
                            <Text style={contentStyles.cafeMetro}>{cafe?.address.split(',').pop()}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={async () => Linking.openURL(cafe.location)}
                    style={contentStyles.spotLink}
                >
                    <Text style={contentStyles.spotLinkText}>Как проехать</Text>
                </TouchableOpacity>
            </View>
            </BlurView>

            <View style={screenStyles.bgWrapper}>
                <BgOrder/>
            </View>
        </View>
    );
}

const screenStyles = StyleSheet.create({
    container: {
        width: 375, 
        flex: 1
    },
    bgWrapper: {
        top: 0,
        bottom: 0,
        left: 24,
        position: 'absolute',
        justifyContent: 'center',
        zIndex: -1,
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
        padding: 24,
        paddingLeft: 28,
        backgroundColor: 'rgba(38, 24, 154, .5)',
        borderWidth: 2,
        borderColor: 'white'
    },
    block: {
        marginTop: 28
    },
    header: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        color: 'white',
        letterSpacing: .65
    },
    id: {
        marginTop: -12,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 58,
        color: 'white',
        letterSpacing: .65
    },
    status: {
        width: 96,
        height: 40,
        marginTop: 8,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        lineHeight: 40,
        textAlign: 'center',
        color: '#D9000D',
        backgroundColor: 'white',
        letterSpacing: .65
    },
    subBlock: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subBlockTitle: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 16,
        color: 'white',
        letterSpacing: .65
    },
    subBlockValue: {
        height: 36,
        paddingHorizontal: 12,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 22,
        lineHeight: 36,
        textAlign: 'center',
        color: '#2E219D',
        backgroundColor: 'white',
        letterSpacing: .65
    },
    cafe: {
        padding: 12,
        paddingTop: 8,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    cafeName: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        lineHeight: 28,
        color: '#4539A8',
        letterSpacing: .65
    },
    cafeAddress: {
        fontFamily: 'ProximaNova-Semibold',
        fontSize: 14,
        lineHeight: 16,
        opacity: .6,
        color: '#4539A8',
        letterSpacing: .1
    },
    cafeMetro: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 16,
        lineHeight: 18,
        color: '#4539A8',
        letterSpacing: .65
    },
    spotLink: {
        height: 44,
        paddingHorizontal: 12,
        position: 'absolute',
        right: 24,
        bottom: -37,
        backgroundColor: '#D9000D'
    },
    spotLinkText: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 32,
        lineHeight: 44,
        color: 'white'
    }
});

export default OrderScreen;