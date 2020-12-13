import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import logo from '../../assets/images/logo.png';

function Header() {
    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={logo}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
      height: 64,
      paddingLeft: 24,
      justifyContent: 'center',
    },
    logo: {
      width: 133,
      height: 27
    }
});  

export default Header;