import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Picker, TextInput} from 'react-native';
import Moment from 'react-moment';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import MapView, { MapViewAnimated } from 'react-native-maps';
import {Marker} from 'react-native-maps';


export class HomeScreen extends React.Component {
  // currLat = this.state.position.latitude;    // once we integrate, use this.
  // currLng = this.state.position.longitude;
  currLat = 32.7157;
  currLng = -117.1611;
  state = {
    readyTime: 0,
    region: {
      latitude: this.currLat,
      longitude: this.currLng,
      latitudeDelta: 0.030,
      longitudeDelta: 0.0242,
    },
    MarkerLatLng: {
      latitude: this.currLat,
      longitude: this.currLng
    },
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Rouzzz</Text>
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          initialRegion={this.state.region}
          onMarkerDragEnd={(e)=>this.map.animateToCoordinate(e.nativeEvent.coordinate)}
        >
          <Marker draggable
            coordinate={this.state.MarkerLatLng}
            onDragEnd={(e) => this.setState({MarkerLatLng: e.nativeEvent.coordinate})}
          />
        </MapView>
        <Text>Latitude: {this.state.MarkerLatLng.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLng.longitude}</Text>
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
    height: 300,
    width: 500,
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