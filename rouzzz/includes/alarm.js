import React from 'react';
import {
  Button,
  View
} from 'react-native';
import { Video } from 'expo';

import styles from './style.js';

export default class AlarmScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
        <Video
	        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          shouldPlay
	        resizeMode="cover"
	        style={{ width: 0, height: 0 }}
	      />
      </View>
    );
  }
}