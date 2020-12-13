import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './screens/menu';
import Category from './screens/category';
import Item from './features/item';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'BebasNeuePro-SemiExpBold': require('./assets/fonts/BebasNeuePro-SemiExpBold.ttf'),
    'BNP-SemiExpBoldIt': require('./assets/fonts/BebasNeuePro-SemiExpBoldItalic.ttf'),
    'BNP-SemiExpBookIt': require('./assets/fonts/BebasNeuePro-SemiExpBookItalic.ttf'),
    'FuturaPT-Book': require('./assets/fonts/FuturaPT-Book.ttf'),
    'ProximaNova-Semibold': require('./assets/fonts/ProximaNova-Semibold.ttf'),
    'BebasNeuePro-BoldIt': require('./assets/fonts/BebasNeuePro-BoldItalic.ttf'),
    'BebasNeuePro-Bold': require('./assets/fonts/BebasNeuePro-Bold.ttf'),
    'BebasNeuePro-Middle': require('./assets/fonts/BebasNeuePro-Middle.ttf')
  });

  if ( !fontsLoaded ) return <AppLoading/>
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="false">
          <Stack.Screen name="Menu" component={Menu}/>
          <Stack.Screen name="Category" component={Category}/>
          <Stack.Screen name="Item" component={Item}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}