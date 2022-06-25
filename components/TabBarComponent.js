import React, { Component } from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ranking from './RankingComponent';



import DashboardNavigation from './DashboardNavigator';
import NoteVocabulary from './NoteVocabularyComponent';
import Account from './AccountComponent';


const Tab = createBottomTabNavigator();

class TabBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={DashboardNavigation}
          options={{
            headerShown:false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />         
         <Tab.Screen name="Note" component={NoteVocabulary}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="book" color={color} size={size} />
            ),
          }}
          tabBarOptions={{ showLabel: false }}
        />
        <Tab.Screen name="Ranking" component={Ranking}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="star" color={color} size={size} />
            ),
          }}
          tabBarOptions={{ showLabel: false }}
        />
          <Tab.Screen name="Account" component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="account-circle" color={color} size={size} />
            ),
          }}
          tabBarOptions={{ showLabel: false }}
        />
        
      </Tab.Navigator>

    );
  }

}


export default TabBar;