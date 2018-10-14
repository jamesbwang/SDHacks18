/* 
 * rouzzz
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
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import MapView, { 
  MapViewAnimated
} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import { Video } from 'expo';
//import Audio from 'expo-cli';

//var SoundPlayer = require('react-native-sound');

//import Video from 'react-native-video';

export class HomeScreen extends React.Component {
  num = 0;
  // currLat = this.state.position.latitude;    // once we integrate, use this.
  // currLong = this.state.position.longitude;
  currLat = 32.7157;  // temp until api integration
  currLong = -117.1611;
  state = {
    readyTime: 0,
    region: { // for mapview
      latitude: this.currLat,
      longitude: this.currLong,
      latitudeDelta: 0.030,
      longitudeDelta: 0.0242,
    },
    MarkerLatLong: { // for map marker
      latitude: this.currLat,
      longitude: this.currLong
    },
  };
  updateMarker = function(e) {
    this.setState({MarkerLatLong: e.nativeEvent.coordinate});
    this.map.animateToCoordinate(e.nativeEvent.coordinate);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Rouzzz</Text>
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          initialRegion={this.state.region}
          onMarkerDragEnd={(e)=>this.map.animateToCoordinate(e.nativeEvent.coordinate)}
          onPress={(e) => this.updateMarker(e)}
        >
          <Marker draggable
            coordinate={this.state.MarkerLatLong}
            onDragEnd={(e) => this.updateMarker(e)}
          />
        </MapView>
        <Text>Latitude: {this.state.MarkerLatLong.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLong.longitude}</Text>
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        />
        <Text>
          How much time do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          onChangeText={(text) => this.onChanged(text)}
          value={this.num}
          maxLength={3}
        />
      </View>
    );
  }
  onChanged(text) {
    this.num = +text;
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

export class CountdownScreen extends React.Component {
   date = new Date('October 13, 2018 19:55:00');
   timeToGetReady = 10;
   dateString = (this.date.getHours() + ":" + (this.date.getMinutes() >= 10 ? this.date.getMinutes().toString() : ('0' + this.date.getMinutes()).toString()));
   arrivalTime = new Date('October 13, 2018 19:55:00');
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.timeHeader}>
          {this.dateString}
        </Text>
        <Text>{"You will have " + this.timeToGetReady + "minutes to get ready."}</Text>
        <Text>
          {"You will arrive by " + (this.arrivalTime.getHours() + ":" + (this.arrivalTime.getMinutes() >= 10 ? this.arrivalTime.getMinutes().toString() : ('0' + this.arrivalTime.getMinutes()).toString()))}
        </Text>
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
  componentDidMount() {
    setInterval(() => {
        this.setState(() => {
            if(Date.now() >= this.date.getTime()){
              this.props.navigation.navigate('Alarm')
            }
            return { unseen: "does not display" }
        });
    }, 10000);
}


}

export class TimeFinderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appId: "ASP74kP1aWXMTUXMl9Z7",
      appCode: "TTqYfk0ASNuvbY7R5GtUcg"
    };
  }

  componentWillMount() {
    /*
    return navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        position: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        },
        isLoading: false
      });
      console.log(this);
    }, (error) => {
      alert(JSON.stringify(error))
    });
    */
    this.setState({
      position: {
        latitude: 32.885483,
        longitude: -117.239150
      },
      isLoading: false
    });
  }

  findRoutes() {
    var today = new Date();
    var timestamp =
      today.getFullYear() + "-"
      + (today.getMonth() < 9 ? "0" : "") + parseInt(today.getMonth()+1) + "-"
      + (today.getDate() < 10 ? "0" : "") + today.getDate() + "T"
      + (today.getHours() < 10 ? "0" : "") + today.getHours() + ":"
      + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes() + ":"
      + (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
    uri = "https://route.api.here.com/routing/7.2/calculateroute.json"
      + "?app_id=" + this.state.appId
      + "&app_code=" + this.state.appCode
      + "&mode=fastest;car;"
      + "&waypoint0=geo!" + this.state.position.latitude + "," + this.state.position.longitude
      + "&waypoint1=geo!" + this.state.dest_latitude + "," + this.state.dest_longitude
      + "&departure=" + timestamp;
    console.log("Now Requesting: " + uri);

    return fetch(uri)
      .then ((response) => response.json())
      .then ((responseJson) => {
        console.log(responseJson);
        this.setState ({
          timeLeft: responseJson.response.route[0].summary.trafficTime
        }, function() {
        });
      })
      .catch ((error) => {
        console.error(error);
      })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.center_contained}>
          <ActivityIndicator/>
          <Text>{"\n"}Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.center_contained}>
        <Text>Alarm clock with HERE API!</Text>
        <Text>Current Location: {JSON.stringify(this.state.position.latitude)}, {JSON.stringify(this.state.position.longitude)}</Text>
        <Text>Destination Latitude:</Text>
        <TextInput
          style={{width: 180, height: 20, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dest_latitude) => this.setState({dest_latitude})}
          value={this.state.dest_latitude}
        />
        <Text>Destination Longitude:</Text>
        <TextInput
          style={{width: 180, height: 20, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(dest_longitude) => this.setState({dest_longitude})}
          value={this.state.dest_longitude}
        />
        <Button
          onPress={this.findRoutes.bind(this)}
          title="GO!"
        />
        <Text>{this.state.timeLeft} seconds</Text>
        <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center_contained: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeHeader: {
    fontSize: 20
  },
  map: {
    height: 300,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Countdown: CountdownScreen,
    Alarm: AlarmScreen,
    TimeFinder: TimeFinderScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }
}
