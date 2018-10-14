import React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Moment from 'react-moment';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';


export class HomeScreen extends React.Component {
  num = 0;
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
        <Text>
          How much time do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          onChangeText={(text) => this.onChanged(text)}
          value={this.num}
          maxLength={3}  //setting limit of input
        />
      </View>
    );
  }
  onChanged(text) {
    this.num = +text;
  }
}

export class CountdownScreen extends React.Component {
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
      </View>
    );
  }
}

export class AlarmScreen extends React.Component {
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeHeader: {
    fontSize: 20
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Countdown: CountdownScreen,
    Alarm: AlarmScreen
  },
  {
    initialRouteName: 'Home',
  }
);

// Starts everything 
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}