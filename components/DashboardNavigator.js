import React, { Component } from 'react';
import { NativeBaseProvider, StatusBar, Box, HStack, Text, IconButton, Icon, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './DashboardComponent';
import Ranking from './RankingComponent';
import { NavigationContainer } from '@react-navigation/native';
import Pronunciation from './PronunciationComponent';
import { createStackNavigator } from '@react-navigation/stack';
import Vocabulary from './VocabularyComponent';
import Grammar from './GrammarComponent';
import Speaking from './SpeakingComponent';
import VocabularyTopic from './vocabulary/VocabularyTopic';

const MainStack = createStackNavigator();
const VocabStack = createStackNavigator();

class DashboardNavigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen name="Home" component={Dashboard} options={{headerShown: false}} />  
      <MainStack.Screen name="Pronunciation" component={Pronunciation} options={{headerTitleAlign:'center',headerBackTitle:'',headerBackTitleVisible:false,headerLeftLabelVisible:true}} /> 
      <MainStack.Screen name="Vocabulary" component={Vocabulary} options={{headerTitleAlign:'center',headerBackTitle:'',headerBackTitleVisible:false,headerLeftLabelVisible:true}} /> 
      <MainStack.Screen name="VocabularyTopic" component={VocabularyTopic} options={{headerTitleAlign:'center',headerBackTitle:'',headerBackTitleVisible:false,headerLeftLabelVisible:true}} /> 
      <MainStack.Screen name="Grammar" component={Grammar} options={{headerTitleAlign:'center',headerBackTitle:'',headerBackTitleVisible:false,headerLeftLabelVisible:true}} />  
      <MainStack.Screen name="Speaking" component={Speaking} options={{headerTitleAlign:'center',headerBackTitle:'',headerBackTitleVisible:false,headerLeftLabelVisible:true}} />  
      </MainStack.Navigator>
    );
  }

}


export default DashboardNavigation;