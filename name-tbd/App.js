import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app.</Text>
        <Button
        title="Go to Settings"
        onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

export class Page1 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>New page!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
