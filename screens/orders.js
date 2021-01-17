import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import BgOrders from 'assets/images/bg_orders.svg';

const API_URl = 'http://192.168.0.100:3001/';

function OrdersScreen({ navigation }) {

    const [data, setData] = React.useState([]);
    // const [status, setStatus] = React.useState('idle');
    
    function fetchData() {
        // setStatus('loading');

        fetch(API_URl + 'orders')
            .then(res => res.json())
            .then(data => {
                // setStatus('success');
                console.log(data)
                setData(data);
            })
            .catch(console.log);
    }

    React.useEffect(() => fetchData(), []);

    return (
        <View style={{ width: 375, flex: 1, backgroundColor: 'white' }}>
            <Text style={screenStyles.title}>
                Заказы
            </Text>

            {
                data[0] &&
                <OrdersList items={data} {...{navigation}}/>
            }

            <View style={ screenStyles.bgWrapper }>
                <BgOrders/>
            </View>
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

function OrdersList({items, navigation}) {
    return (
        <View style={ listStyles.container }>
            <FlatList
                style={listStyles.items}
                data={items}
                renderItem={props => <OrdersItem navigation={navigation} {...props}/>}
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={ listStyles.liner }>
                <View style={ listStyles.heading }>
                    <Text style={ listStyles.headingText }>Номер заказа:</Text>
                    <Text style={{...listStyles.headingText, width: 120 }}>Статус:</Text>
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
        marginHorizontal: 96,
        backgroundColor: '#121211'
    }
});

function OrdersItem({
    item: {
        _id,
        status
    },
    navigation
}) {
    return (
        <View style={itemStyles.container}>
            <View style={itemStyles.info}>
                {
                    status === 'done' ?
                    <Text style={[itemStyles._id, {textDecorationLine: 'none'}]}>#{_id}</Text> :
                    <TouchableOpacity onPress={() => navigation.navigate('ModalOrder', { _id })} style={{flex: 1}}>
                        <Text style={itemStyles._id}>#{_id}</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => navigation.navigate('ModalOrder', { _id })} style={{flex: 1}}>
                    
                </TouchableOpacity>
                <Text style={itemStyles.status}>
                    { status === 'accepted' && 'Принят' }
                    { status === 'inProgress' && 'Готовится' }
                    { status === 'ready' && 'Готов' }
                    { status === 'done' && 'Отдан' }
                </Text>
            </View>
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
    _id: {
        fontFamily: 'BebasNeuePro-Middle',
        fontSize: 28,
        textDecorationLine: 'underline',
        textDecorationColor: 'black',
        textTransform: 'uppercase',
    },
    status: {
        width: 120,
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

export default OrdersScreen;