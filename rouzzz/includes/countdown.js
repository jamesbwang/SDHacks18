import React from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

import styles from './style.js';

export default class CountdownScreen extends React.Component {


  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      isLoading: true,
      appId: "ASP74kP1aWXMTUXMl9Z7",
      appCode: "TTqYfk0ASNuvbY7R5GtUcg",
      position: {
        latitude: 32.885483,
        longitude: -117.239150
      },
      dest_latitude: navigation.getParam('destLat'),
      dest_longitude: navigation.getParam('destLong'),
      timeToGetReady: 0,
    };
  }

  // Finds the time to drive to a location and stores it in traffic time (timeToGetReady).
  findRoutes() {
    var today = new Date();
    var timestamp =
      today.getFullYear() + "-"
      + (today.getMonth() < 9 ? "0" : "") + parseInt(today.getMonth() + 1) + "-"
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
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        this.setState({
          timeToGetReady: responseJson.response.route[0].summary.trafficTime
        }, function () {
          console.log("Seconds to arrive: " + this.state.timeToGetReady);
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    const { navigation } = this.props;
    //this.timeToGetReady = navigation.getParam('ringtime', 300);

    this.state.position.latitude = navigation.getParam('deptLat');
    this.state.position.longitude = navigation.getParam('deptLong');
    this.offset = navigation.getParam('offset');
    var arrivalTime = navigation.getParam('target');
    var arrivalDate = new Date(arrivalTime);

    console.log("arrival: " + arrivalTime);
    wakeuptime = new Date(arrivalTime.getTime() - this.offset * 1000 - this.state.timeToGetReady * 1000);
    console.log("wakeup:" + wakeuptime);
    wakeupstring = wakeuptime.getHours() + ":" + (wakeuptime.getMinutes() >= 10 ? wakeuptime.getMinutes().toString() : ('0' + wakeuptime.getMinutes()).toString());
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40 }}> {"Wake up at: "}</Text>
        <Text style={{ fontSize: 59 }}> {wakeupstring}</Text>
        {/* <Text style={{ fontSize: 59 }}>09:17</Text> */}
        <Text>
          {"You will arrive by " + (arrivalDate.getHours() + ":" + (arrivalDate.getMinutes() >= 10 ? arrivalDate.getMinutes().toString() : ('0' + arrivalDate.getMinutes()).toString()))}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        this.findRoutes();
        if (new Date(this.timestamp).getTime() >= this.state.wakeuptime) {
          this.props.navigation.navigate('Alarm')
        }
        return { unseen: "does not display" }
      });
    }, 10000);
  }
}