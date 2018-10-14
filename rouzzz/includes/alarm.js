import React from 'react';
import {
  Button,
  View,
  Text
} from 'react-native';
import { Video } from 'expo';

import styles from './style.js';

export default class AlarmScreen extends React.Component {
  static navigationOptions = {
    title: "Alarm is ringing!",
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Time to wake up!</Text>
        <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          volume={1.0}
          shouldPlay
          resizeMode="cover"
          style={{ width: 0, height: 0 }}
        />
        <View style={styles.button_layout}>
          <Button
            title="Dismiss"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Snooze"
            onPress={() => {
              this.volume = 0;
              this.props.navigation.goBack(null, {
                ringtime: 300,
              });
            }}
          />
        </View>
        {/*
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
        */}
      </View>
    );
  }
}