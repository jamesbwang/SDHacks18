import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Picker} from 'react-native';
import Moment from 'react-moment';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MapView from 'react-native-maps';


export class HomeScreen extends React.Component {
  render() {
    state = {user: 0}
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Rouzzz</Text>
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        <Text>It takes me:</Text>
        <Picker style={styles.picker} 
          selectedValue={state.user} 
          onValueChange = {(itemValue, itemIndex) => state.user=itemValue}>
          <Picker.Item label="0" value="0"/>
          <Picker.Item label="5" value="5" />
          <Picker.Item label="10" value="10" />
          <Picker.Item label="15" value="15" />
          <Picker.Item label="20" value="20" />
          <Picker.Item label="25" value="25" />
          <Picker.Item label="30" value="30" />
          <Picker.Item label="40" value="40" />
          <Picker.Item label="50" value="50" />
          <Picker.Item label="60" value="60" />
          <Picker.Item label="75" value="75" />
          <Picker.Item label="100" value="100" />
        </Picker>
        <Text>minutes to get ready.</Text>
        <Text>{state.user}</Text>
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
      </View>
    );
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
    fontSize : 20
  },
  map: {
    height: 200,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  picker: {
    height: 75,
    width: 200,
    alignItems: 'center',

  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Countdown: CountdownScreen,
    Alarm: AlarmScreen,
    // TimeSelect: TimeSelectScreen
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