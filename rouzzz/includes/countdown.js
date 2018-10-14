import React from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

import styles from './style.js';

export default class CountdownScreen extends React.Component {
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
       {/* <Button
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
       /> */}
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