import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Field, FieldWithLabel } from 'features/form/field';
import HeaderImage from 'assets/images/header_to-cart.svg';
import { useSelector } from 'react-redux';
import { selectBonusPoints, selectTotal } from '../features/cart/slice';

const API_URL = 'http://192.168.0.100:3001/';

function OrderFormScreen({navigation}) {

    const initialState = {
        customer: {
            name: '',
            phone: ''
        },
        items: [],
        cafe: null,
        readyBy: null,
        sum: null,
        discount: null,
        total: null
    }

    const [order, setOrder] = React.useState(initialState);

    const cartTotal = useSelector(selectTotal);
    React.useEffect(() => setOrder({...order, sum: cartTotal}), [cartTotal]);
    React.useEffect(() => {
        if ( !order.sum ) return;
        setOrder({...order, total: order.sum - order.discount || order.sum});
    }, [order.discount, order.sum])

    const cartItems = useSelector(state => state.cart.items);

    function updateCustomerInfo(property, value) {
        const update = {...order};
        update.customer[property] = value;
        setOrder(update);
    }

    function postOrder() {
        fetch(API_URL + 'orders', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...order, items: cartItems || []})
        })
            .then(res => res.json())
            .then(({_id}) => {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Main' },
                        { name: 'ModalOrder', params: { _id } }
                    ]
                })
            })
            .catch(console.log);
    }

    return (
        <View style={{ paddingTop: 100, paddingHorizontal: 24, width: 375, flex: 1 }}>
            <OrderFormHeader {...{navigation}}/>

            <View>
                <FieldWithLabel 
                    value={order.customer.name}
                    onChange={value => updateCustomerInfo('name', value)}
                    style={{ marginTop: 32 }}
                    label="Как к вам обащаться?"
                    placeholder="Юлий Цезарь"
                />
                <FieldWithLabel 
                    value={order.customer.phone}
                    onChange={value => updateCustomerInfo('phone', value)}
                    style={{ marginTop: 32 }}
                    type="number"
                    label="Номер телефона для связи"
                    placeholder="+7-(999)-888-77-66"
                />

                <CafeOptions 
                    cafe_id={order.cafe} 
                    selectCafe={id => setOrder({...order, cafe: id})}
                />

                <View style={{ flexDirection: 'row', marginTop: 32 }}>
                    <Text style={formStyles.text}>Я ЗАБЕРУ ЗАКАЗ В:</Text>
                    <Field 
                        value={order.readyBy}
                        onChange={value => setOrder({...order, readyBy: value})}
                        style={{ width: 52, marginLeft: 12 }}
                        placeholder="00:00"
                    />
                </View>

                <LoyaltyPoints 
                    discount={order.discount}
                    setDiscount={value => setOrder({...order, discount: value})}
                />
            </View>

            <OrderTotal 
                total={order.total}
                postOrder={postOrder}
            />
        </View>
    );
}

const OrderFormHeader = ({navigation}) => (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <HeaderImage/>
        </TouchableOpacity>
    </View>
);

function CafeOptions({cafe_id, selectCafe}) {

    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch('http://192.168.0.100:3001/cafes')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(console.log);
    }, []);

    const dynamicStyles = id => ({
        container: {
            backgroundColor: cafe_id === id ? '#2E219D' : null
        },
        text: {
            color: cafe_id === id ? 'white' : '#2E219D'
        }
    });

    const getMetro = address => address.split(',')[0];
    const getAddress = address => address.split(',').pop();

    return (
        <View style={{ marginTop: 32 }}>
            <Text style={formStyles.text}>ВЫБЕРИТЕ СПОТ:</Text>
            <View style={cafesStyles.grid}>
                { 
                    data.map((cafe, i) => (
                        <TouchableOpacity 
                            onPress={() => selectCafe(cafe._id)}
                            style={[cafesStyles.cafe, dynamicStyles(cafe._id).container]}
                            key={i}
                        >
                            <Text style={[cafesStyles.cafeName, dynamicStyles(cafe._id).text]}>{cafe.name}</Text>
                            <Text style={[cafesStyles.cafeAddress, dynamicStyles(cafe._id).text]}>{getAddress(cafe.address)}</Text>
                            <Text style={[cafesStyles.cafeMetro, dynamicStyles(cafe._id).text]}>{getMetro(cafe.address)}</Text>
                        </TouchableOpacity>
                    )) 
                }
            </View>
        </View>
    )
}

function LoyaltyPoints({ discount, setDiscount }) {
    const bonusPoints = useSelector(selectBonusPoints);
    const [value, setValue] = React.useState('100');

    const dynamicStyles = (value) => ({
        button: {
            backgroundColor: discount === value ? '#2E219D' : null
        },
        buttonText: {
            color: discount === value ? 'white' : '#2E219D'
        },
        input: {
            color: discount === value ? 'white' : '#2E219D',
            borderBottomColor: discount === value ? 'white' : '#2E219D'
        }
    });

    function onChange(value) {
        setValue(value);
        setDiscount(value);
    }

    return (
        <View style={{ marginTop: 32 }}>
            <Text style={formStyles.text}>БАЛЛЫ:</Text>

            <View style={loyaltyPointsStyles.buttonsContainer}>
                <TouchableOpacity 
                    onPress={() => setDiscount(null)}
                    style={[loyaltyPointsStyles.button, dynamicStyles(null).button]}
                >
                    <Text style={[loyaltyPointsStyles.buttonText, dynamicStyles(null).buttonText]}>НАКОПИТЬ {bonusPoints}</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => setDiscount(value)}
                    style={[loyaltyPointsStyles.button, dynamicStyles(value).button ]}
                >
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Text style={[loyaltyPointsStyles.buttonText, dynamicStyles(value).buttonText]}>СПИСАТЬ</Text>
                        <Field 
                            {...{ value, onChange }}
                            style={[loyaltyPointsStyles.input, dynamicStyles(value).input]}
                            type="number"
                            placeholder="0"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const formStyles = StyleSheet.create({
    text: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        lineHeight: 32,
        color: '#2E219D'
    },
    field: {
        marginTop: 32
    }
});

const cafesStyles = StyleSheet.create({
    grid: {
        marginLeft: -8,
        width: 356,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    cafe: {
        margin: 4,
        paddingHorizontal: 8,
        paddingTop: 2,
        paddingBottom: 8,
        width: 170,
        height: 80,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#2E219D'
    },
    cafeName: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        lineHeight: 32,
    },
    cafeAddress: {
        fontFamily: 'ProximaNova-Semibold',
        fontSize: 14,
        lineHeight: 16,
        opacity: .6
    },
    cafeMetro: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 16,
        lineHeight: 18
    }
});

const loyaltyPointsStyles = StyleSheet.create({
    buttonsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: 150,
        height: 36,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 22,
        lineHeight: 36
    },
    input: {
        width: 42,
        height: 32,
        marginLeft: 8,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 22,
        lineHeight: 28,
    }
});

function OrderTotal({ total, postOrder }) {
    return (
        <View style={totalStyles.container}>
            <Text style={totalStyles.total}>ИТОГО: {total} руб.</Text>

            <TouchableOpacity onPress={postOrder}>
                <Text style={totalStyles.button}>ДАЛЕЕ</Text>
            </TouchableOpacity>
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

export default OrderFormScreen;