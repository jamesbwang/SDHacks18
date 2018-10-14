import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import DatePicker from 'react-native-datepicker';

export default class HomeScreen extends React.Component {
  num = 0;
  // currLat = this.state.position.latitude;
  // currLong = this.state.position.longitude;
  currLat = 32.7157;
  currLong = -117.1611;


  updateMarker = function(e) {
    this.setState({MarkerLatLong: e.nativeEvent.coordinate});
    this.map.animateToCoordinate(e.nativeEvent.coordinate);
  }

  constructor(props) {
    super(props);
    this.state = {
      eta: new Date(),
      readyTime: 0,
      region: {
        latitude: this.currLat,
        longitude: this.currLong,
        latitudeDelta: 0.030,
        longitudeDelta: 0.0242,
      },
      MarkerLatLong: {
        latitude: this.currLat,
        longitude: this.currLong
      },
    }
  }

  updateText(date) {
    this.setState({
      eta: date,
    });
    console.log(this.state.eta);
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>
          How many minutes do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          textAlign={'center'}

          style={{
            height: 30,
            width: 150,
            borderLeftWidth: 1,
            borderLeftColor: 'grey',
            borderRightWidth: 1,
            borderRightColor: 'grey',
            borderTopWidth: 1,
            borderTopColor: 'grey',
            borderBottomWidth: 1,
            borderBottomColor: 'grey'
          }}
          onChangeText={(text) => this.onChanged(text)}
          value={this.num}
          maxLength={3}
        />
        <DatePicker
          style={{width: 200}}
          showIcon={false}
          date={this.state.eta}
          selected = { this.state.eta }
          mode="datetime"
          placeholder="select date"
          is24Hour= {true}
          format="LLL"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={this.updateText.bind(this)}
        />
        {/* <Text>Latitude: {this.state.MarkerLatLong.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLong.longitude}</Text> */}
        <Button
          title="Let's Sleep!"
          onPress={() => this.props.navigation.navigate('Countdown', {
            deptLat: this.currLat,
            deptLong: this.currLong,
            destLat: this.state.MarkerLatLong.latitude,
            destLong: this.state.MarkerLatLong.longitude,
            offset: this.num,
            target: new Date(this.state.eta),
          })}
        />
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
        
        {/* <Button
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
  onChanged(text) {
    this.num = +text;
  }
}

const styles = StyleSheet.create({
  // center_contained: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timeHeader: {
    fontSize: 20
  },
  map: {
    height: 510,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
});