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
      timeToGetReady: this.props.navigation.state.params.num,   // TODO: make sure this is passed properly
      arrivalTime: this.props.navigation.state.params.arrivalTime,  // TODO: check the format for how this is passed
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
  getDepartureTime = () => {        // TODO: This will throw unresolved promise errors. I think this will be solved with figuring out the
    console.log(this.state);        //       format for state.arrivalTime, though. 
    this.findRoutes().then(function(){
      departureTime = this.state.arrivalTime.getTime() - this.state.timeLeft*1000 - this.state.timeToGetReady*60*1000;
      console.log(departureTime);
      this.setState({departureTime: '0' + departureTime.getTime().getHours});
    });
  }

  date = new Date('October 13, 2018 19:55:00'); // TODO: Make sure we're pulling data from this.state, not from arbitrary values. 
  // state.timeToGetReady = 1000000;
  dateString = this.state.arrivalTime.getHours() + ":" + (this.state.arrivalTime.getMinutes() >= 10 ? this.state.arrivalTime.getMinutes().toString() : ('0' + this.state.arrivalTime.getMinutes()).toString());
    // this.date.getHours() + ":"
    // + (this.date.getMinutes() >= 10 ? this.date.getMinutes().toString() : ('0' + this.date.getMinutes()).toString());
  // arrivalTime = new Date('October 13, 2018 19:55:00');
 
  render() {
    const { navigation } = this.props;
    this.state.timeToGetReady = navigation.getParam('ringtime', 3);
    
    return (
      <View style={styles.container}>
        <Text style={styles.timeHeader}>
          {this.dateString}
        </Text>
        <Text>{"You will have " + Math.floor(this.state.timeToGetReady/60) + " minutes to get ready."}</Text>
        <Text>
          {"You will arrive by " + (this.state.arrivalTime.getHours() + ":" + (this.state.arrivalTime.getMinutes() >= 10 ? this.state.arrivalTime.getMinutes().toString() : ('0' + this.state.arrivalTime.getMinutes()).toString()))}
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
            if(Date.now() >= this.getDepartureTime()){
              this.props.navigation.navigate('Alarm')
            }
            return { unseen: "does not display" }
        });
    }, this.state.timeToGetReady*1000);
  }
}