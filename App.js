import React, { Component } from 'react';
import { NativeBaseProvider, Center, View } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginComponent';
import RegisterScreen from './components/RegisterComponent';
import TabBar from './components/TabBarComponent'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {databaseURL: 'https://angry-cat-react-native-default-rtdb.firebaseio.com/' };
initializeApp(firebaseConfig);

const GuestStack = createStackNavigator();

class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <NativeBaseProvider>
                <GuestStack.Navigator initialRouteName="Login">
                <GuestStack.Screen name="Tab" component={TabBar} options={{headerShown: false}} />  
                <GuestStack.Screen name="Login" component={LoginScreen} />
                <GuestStack.Screen name="Register" component={RegisterScreen} />                   
                </GuestStack.Navigator>
                </NativeBaseProvider>
                </NavigationContainer>            
        );
    }
}

export default App;