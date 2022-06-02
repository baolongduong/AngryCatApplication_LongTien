import React, { Component } from 'react';
import LoginScreen from './components/LoginComponent';
import { NativeBaseProvider, Center, View } from 'native-base';
import TabBar from './components/TabBarComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './components/RegisterComponent';

import { Provider } from 'react-redux';
import  store  from './redux/store';


const GuestStack = createStackNavigator();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <NavigationContainer>
                <NativeBaseProvider>
                <GuestStack.Navigator initialRouteName="Login">
                <GuestStack.Screen name="Tab" component={TabBar} options={{headerShown: false}} />  
                <GuestStack.Screen name="Login" component={LoginScreen} />
                <GuestStack.Screen name="Register" component={RegisterScreen} />                   
                </GuestStack.Navigator>
                </NativeBaseProvider>
                </NavigationContainer>   
            </Provider>            
        );
    }
}

export default App;