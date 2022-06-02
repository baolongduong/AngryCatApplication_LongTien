import React, { Component } from 'react';
import { NativeBaseProvider,StatusBar,Box,HStack,Text,IconButton,Icon,Center} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginComponent'
import Register from './RegisterComponent';
import Dashboard from './DashboardComponent';
import Ranking from './RankingComponent';

const Tab = createBottomTabNavigator();

  class TabBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <Tab.Navigator>
          <Tab.Screen name="Dashboard" component={Dashboard} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
          />
          <Tab.Screen name="Ranking" component={Ranking} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="star" color={color} size={size} />
            ),
          }}
          />
        </Tab.Navigator>
      );
}

}


  export default TabBar;