/* 
 * rouzzzorz
 * ==============================================
 * An alarm clock app that wakes you up only when
 * it is truly necessary. Wakes you up as late
 * as possible such that you can optimize the
 * amount of sleep you get.
 * 
 * Programmed by Gideon Tong, Andrew Chau,
 * James Wang, and Jeff Ding at SDHacks 2018.
 * 
 * No one will notice if someone says Jeff did
 * nothing because he won't even notice this
 * comment.
 */

import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

import HomeScreen from './includes/home.js';
import AlarmScreen from './includes/alarm.js';
import CountdownScreen from './includes/countdown.js';
import TimeFinderScreen from './includes/debug.js';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Countdown: CountdownScreen,
    Alarm: AlarmScreen,
    TimeFinder: TimeFinderScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 0,
        height: 20,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}