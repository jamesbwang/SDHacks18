import React from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator
} from 'react-native';

import styles from './style.js';

export default class CountdownScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      appId: "ASP74kP1aWXMTUXMl9Z7",
      appCode: "TTqYfk0ASNuvbY7R5GtUcg",
      initCoords: this.props.navigation.state.params.initCoords,
      destCoords: this.props.navigation.state.params.destCoords,
      timeToGetReady: this.props.navigation.state.params.num,
      arrivalTime: new Date('October 13, 2018 19:55:00'),   // change this once we implement front end better
    };
  }

  // puts the estimated travel time from user's curr loc to dest. in this.state.timeLeft
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
      + "&waypoint0=geo!" + this.state.initCoords.latitude + "," + this.state.initCoords.longitude
      + "&waypoint1=geo!" + this.state.destCoords.latitude + "," + this.state.destCoords.longitude
      + "&departure=" + timestamp;

    return fetch(uri)
      .then ((response) => response.json())
      .then ((responseJson) => {
        this.setState ({
          timeLeft: responseJson.response.route[0].summary.trafficTime
        }, function() {
        });
      })
      .catch ((error) => {
        console.error(error);
      })
  }

  // calculate departure time and store it in this.state.departureTime
  getDepartureTime = () => {
    this.findRoutes().then(function(){
      departureTime = this.state.arrivalTime.getTime() - this.state.timeLeft*1000 - this.state.timeToGetReady*60*1000;
      this.setState({departureTime: '0' + departureTime.getTime().getHours});
    });
  }

  getDateString = (dateInMs) => {
    return (dateInMs.getHours() + ":" + (dateInMs.getMinutes() >= 10 ? dateInMs.getMinutes().toString() : ('0' + dateInMs.getMinutes()).toString()));
  }

  date = new Date('October 13, 2018 19:55:00');
  dateString = this.getDateString(this.date);
 render() {
   console.log(this);
   this.getDepartureTime().then(function() {
  return (
    <View style={styles.container}>
      <Text style={styles.timeHeader}>
        {this.dateString}
      </Text>
      <Text>{"You will have " + (this.state.arrivalTime - this.state.departureTime) + "minutes to get ready."}</Text>
      <Text>
        {"You will arrive by " + this.getDateString(this.arrivalTime)}
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
   );})
 }
 componentDidMount() {
   setInterval(() => {
       this.setState(() => {
           if(Date.now() >= this.state.departureTime){
             this.props.navigation.navigate('Alarm')
           }
           return { unseen: "does not display" }
       });
   }, 10000);
 }
}