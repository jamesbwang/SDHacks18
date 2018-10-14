import React from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

import styles from './style.js';

export default class CountdownScreen extends React.Component {
    render() {
      var date = new Date(Date.now());
      var timeToGetReady = 10;
      var dateString = (date.getHours() + ":" + (date.getMinutes() >= 10 ? date.getMinutes().toString() : ('0' + date.getMinutes()).toString()));
      var arrivalTime = new Date(2314897238947);
      return (
        <View style={styles.container}>
          <Text style={styles.timeHeader}>
            {dateString}
          </Text>
          <Text>{"You will have " + timeToGetReady + "minutes to get ready."}</Text>
          <Text>{"You will arrive by " + (arrivalTime.getHours() + ":" + (arrivalTime.getMinutes() >= 10 ? arrivalTime.getMinutes().toString() : ('0' + arrivalTime.getMinutes()).toString()))}</Text>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go to Alarm"
            onPress={() => this.props.navigation.navigate('Alarm')}
          />
          <Button
            title="Go to TimeFinder (Debug page)"
            onPress={() => this.props.navigation.navigate('TimeFinder')}
          />
        </View>
      );
    }
  }