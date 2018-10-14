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
  View
} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';

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
  }
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
