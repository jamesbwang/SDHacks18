import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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
      this.findRoutes();
    }, (error) => {
      alert(JSON.stringify(error))
    });    
  }

  findRoutes() {
    var today = new Date();
    var timestamp = today.getFullYear() + "-" + (today.getMonth < 10 ? "0" : "") + parseInt(today.getMonth()+1) + "-"
      + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":"
      + (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
    uri = "https://route.api.here.com/routing/7.2/calculateroute.json"
    + "?app_id=" + this.state.appId
    + "&app_code=" + this.state.appCode
    + "&mode=fastest;car;"
    + "&waypoint0=geo!" + this.state.position.latitude + "," + this.state.position.longitude
    + "&waypoint1=geo!" + "32.720485" + "," + "-117.254846"
    + "&departure=" + timestamp;
    console.log(uri);

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
        <Text>{JSON.stringify(this.state.position)}</Text>
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
