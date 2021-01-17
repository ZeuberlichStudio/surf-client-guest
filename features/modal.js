import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { BlurView } from "expo-blur";

import IconClose from 'assets/images/icon_close.svg';

function Modal({ Component, navigation, ...props}) {

    return (
        <BlurView intensity={100} tint="default" style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={style.closeButton}>
                <IconClose width="30"/>
            </TouchableOpacity>

            { <Component {...props}/> }
        </BlurView>
    );
}

const style = StyleSheet.create({
    closeButton: {
        top: 36,
        right: 36,
        position: 'absolute',
        zIndex: 3
    }
});

export default Modal;