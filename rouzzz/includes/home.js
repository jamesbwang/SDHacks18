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
  eta = "12:00"
  updateMarker = function(e) {
    this.setState({MarkerLatLong: e.nativeEvent.coordinate});
    this.map.animateToCoordinate(e.nativeEvent.coordinate);
  }
  render() {
    return (
      <View style={styles.container}>
      <Text style={{font: 40}}>
          How many minutes do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          underlineColorAndroid='transparent' 
          style={{
            height: 30,
            width: 150,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 1,
            borderBottomWidth: 1,
          }}
          textAlign={'center'}
          onChangeText={(text) => this.onChanged(text)}
          value={this.num}
          maxLength={3}
        />
        <DatePicker
        style={{width: 300}}
        showIcon={false}
        mode="datetime"
        placeholder="When do you have to be there?"
        is24Hour= {true}
        format="HH:mm"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={(date) => {this.eta = new Date(date);
        console.log(date.toString())}}
      />
        {/* <Text>Latitude: {this.state.MarkerLatLong.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLong.longitude}</Text> */}
        <Button
          title="Let's Sleep!"
          onPress={() => this.props.navigation.navigate('Countdown')}
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