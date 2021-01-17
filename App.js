import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { NavigationContainer as NavContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store';

import CategoriesScreen from 'screens/categories';
import CategoryScreen from 'screens/category';
import CartScreen from 'screens/cart';
import OrderFormScreen from 'screens/order-form';
import ItemScreen from 'screens/item';
import OrdersScreen from 'screens/orders';
import OrderScreen from 'screens/order';
import Modal from 'features/modal';

import IconMenu from 'assets/images/icon_menu.svg';
import IconCart from 'assets/images/icon_cart.svg';
import IconOrders from 'assets/images/icon_orders.svg';

const RootStack = createStackNavigator();
const MainStack = createBottomTabNavigator();

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
      <Provider {...{store}}>
        <NavContainer theme={{colors: {background: null } }}>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name="Main" component={MainStackScreen}/>
            <RootStack.Screen name="ModalItem" children={props => <Modal Component={ItemScreen} {...props}/>}/>
            <RootStack.Screen name="ModalOrder" children={props => <Modal Component={OrderScreen} {...props}/>}/>
          </RootStack.Navigator>
        </NavContainer>
      </Provider>
    );
  }
}

const MainStackScreen = () => (
  <MainStack.Navigator 
    initialRouteName="Menu" 
    tabBarOptions={{ showLabel: false }}
    screenOptions={{
      tabBarButton: props => <TouchableOpacity {...props}/>,
    }}
  >
    <MainStack.Screen 
      name="Orders" 
      component={OrdersScreen} 
      options={{ 
        tabBarIcon: IconOrders 
      }}
    />

    <MainStack.Screen 
      name="MenuStack" 
      component={MenuStackScreen} 
      options={{ 
        tabBarIcon: IconMenu
      }}
    />

    <MainStack.Screen 
      name="CartStack" 
      component={CartStackScreen} 
      options={{ 
        tabBarIcon: IconCart
      }}
    />
  </MainStack.Navigator>
);

const CartStack = createStackNavigator();
const MenuStack = createStackNavigator();

const MenuStackScreen = () => (
  <MenuStack.Navigator screenOptions={{ headerShown: false }}>
      <MenuStack.Screen name="Categories" component={CategoriesScreen}/>
      <MenuStack.Screen name="Category" component={CategoryScreen}/>
  </MenuStack.Navigator>
);

const CartStackScreen = () => (
  <CartStack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: 'white' } }}>
    <CartStack.Screen name="Cart" component={CartScreen}/>
    <CartStack.Screen name="OrderForm" component={OrderFormScreen}/>
  </CartStack.Navigator>
)