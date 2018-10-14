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
  updateMarker = function(e) {
    this.setState({MarkerLatLong: e.nativeEvent.coordinate});
    this.map.animateToCoordinate(e.nativeEvent.coordinate);
  }

  constructor(props) {
    super(props);
    this.state = {
      eta: "12:00",
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
        <DatePicker
          style={{width: 200}}
          showIcon={false}
          date={this.state.eta}
          selected = { this.state.eta }
          mode="datetime"
          placeholder="select date"
          is24Hour= {true}
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={this.updateText.bind(this)}
        />
        {/* <Text>Latitude: {this.state.MarkerLatLong.latitude}</Text>
        <Text>Longitude: {this.state.MarkerLatLong.longitude}</Text> */}
        <Button
          title="Let's Sleep!"
          onPress={() => this.props.navigation.navigate('Countdown')}
        />
        {/* <Button
          title="Go to Alarm"
          onPress={() => this.props.navigation.navigate('Alarm')}
        />
        <Button
          title="Go to TimeFinder (Debug page)"
          onPress={() => this.props.navigation.navigate('TimeFinder')}
        /> */}
        <Text>
          How much time do you need to get ready?
        </Text>
        <TextInput
          keyboardType='numeric'
          defaultValue='0'
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
    justifyContent: 'center',
  },
  timeHeader: {
    fontSize: 20
  },
  map: {
    height: 400,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
});