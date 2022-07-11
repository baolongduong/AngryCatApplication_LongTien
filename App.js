import React, { Component } from 'react';
import { NativeBaseProvider, Center, View } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './components/LoginComponent';
import RegisterScreen from './components/RegisterComponent';
import TabBar from './components/TabBarComponent'
import { initializeApp } from 'firebase/app';
import { Audio } from 'expo-av';

const firebaseConfig = {databaseURL: 'https://angry-cat-react-native-default-rtdb.firebaseio.com/' };
initializeApp(firebaseConfig);
const GuestStack = createStackNavigator();






class App extends Component {

    componentDidMount()
 {
    this.pronunciationPlay();
 }

 pronunciationPlay = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: "https://angrycatblnt.herokuapp.com/mp3/happy.mp3" }, { shouldPlay: true, isLooping:true });
      await sound.setVolumeAsync(0.25);
    await sound.playAsync();
  }

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