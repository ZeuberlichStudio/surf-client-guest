import React from 'react';
import { Text, View , Image, StyleSheet, TouchableOpacity} from 'react-native';

import IconBig from '../../assets/images/icon_size_big.svg';
import IconBigActive from '../../assets/images/icon_size_big_active.svg';
import IconReg from '../../assets/images/icon_size_reg.svg';
import IconRegActive from '../../assets/images/icon_size_reg_active.svg';
import IconSmall from '../../assets/images/icon_size_small.svg';
import IconSmallActive from '../../assets/images/icon_size_small_active.svg';

const icons = {
    big: [ <IconBig width={ 54 }/>, <IconBigActive width={ 54 }/> ],
    reg: [ <IconReg width={ 54 }/>, <IconRegActive width={ 54 }/> ],
    small: [ <IconSmall width={ 48 }/>, <IconSmallActive width={ 48 }/> ]
};

function ItemSizes({ sizes, currentSize, setCurrentSize }) {

    function changeSize(size) {
        setCurrentSize(size);
    }

    return (
        <View>
            <Text style={ sizesStyles.title }>Объём:</Text>
            <View style={ sizesStyles.optionsWrapper }>
                { Object.entries(sizes).map( ( [size], i ) => <Size {...{ size, changeSize, key: i, active: size === currentSize }} /> ) }
            </View>
        </View>
    );
}

const Size = ({ size, changeSize, active }) => (
    <TouchableOpacity  onPress={ () => changeSize(size) }>
        <View>
            { icons[size][active ? 1 : 0] }
        </View>
    </TouchableOpacity>
);

const sizesStyles = StyleSheet.create({
    title: {
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 22,
        color: 'white'
    },
    optionsWrapper: {
        height: 74,
        marginTop: 14,
        marginBottom: 14,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }
});

export default ItemSizes;