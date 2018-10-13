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
    var month = (today.getMonth < 10 ? "" : "0") + today.getMonth();   
    uri = "https://route.api.here.com/routing/7.2/calculateroute.json"
    + "?app_id=" + this.state.appId
    + "&app_code=" + this.state.appCode
    + "&mode=fastest;car;"
    + "&waypoint0=geo!" + this.state.position.longitude + "," + this.state.position.latitude
    + "&waypoint1=geo!" + "lol" + "," + "lol"
    + "&arrival=" + today.getFullYear() + "-" + month + "-" + today.getDate()
    + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(uri);
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
