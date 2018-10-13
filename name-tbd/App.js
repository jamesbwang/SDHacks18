import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appId: "ASP74kP1aWXMTUXMl9Z7",
      appCode: "TTqYfk0ASNuvbY7R5GtUcg"
    }
  }

  componentWillMount() {
    return navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        position: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        },
        isLoading: false
      });
    }, (error) => {
      alert(JSON.stringify(error))
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
      + "?app_id=" + this.appId
      + "&app_code=" + this.appCode
      + "&mode=fastest;car;"
      + "&waypoint0=geo!" + this.position.latitude + "," + this.position.longitude
      + "&waypoint1=geo!" + this.dest_latitude + "," + this.dest_longitude
      + "&departure=" + timestamp;
    console.log("Now Requesting: " + uri);

    return fetch(uri)
      .then ((response) => response.json())
      .then ((responseJson) => {
        this.setState ({
          timeLeft: responseJson.response.route[0].summary.trafficTime
        }, function() {
          console.log(responseJson.response.route[0].summary.trafficTime);
        });
      })
      .catch ((error) => {
        console.error(error);
      })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
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
          onPress={this.findRoutes}
          title="GO!"
        />
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
