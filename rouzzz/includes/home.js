import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

//import { styles } from './style';

export default class HomeScreen extends React.Component {
    num = 0;
    // currLat = this.state.position.latitude;    // once we integrate, use this.
    // currLng = this.state.position.longitude;
    currLat = 32.7157;  // temp until api integration
    currLng = -117.1611;
    state = {
      readyTime: 0,
      region: { // for mapview
        latitude: this.currLat,
        longitude: this.currLng,
        latitudeDelta: 0.030,
        longitudeDelta: 0.0242,
      },
      MarkerLatLng: { // for map marker
        latitude: this.currLat,
        longitude: this.currLng
      },
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 40}}>Rouzzz</Text>
          <MapView
            ref={map => this.map = map}
            style={styles.map}
            initialRegion={this.state.region}
            onMarkerDragEnd={(e)=>this.map.animateToCoordinate(e.nativeEvent.coordinate)}
          >
            <Marker draggable
              coordinate={this.state.MarkerLatLng}
              onDragEnd={(e) => this.setState({MarkerLatLng: e.nativeEvent.coordinate})}
            />
          </MapView>
          <Text>Latitude: {this.state.MarkerLatLng.latitude}</Text>
          <Text>Longitude: {this.state.MarkerLatLng.longitude}</Text>
          <Button
            title="Go to Countdown"
            onPress={() => this.props.navigation.navigate('Countdown')}
          />
          <Button
            title="Go to Alarm"
            onPress={() => this.props.navigation.navigate('Alarm')}
          />
          <Button
            title="Go to TimeFinder (Debug page)"
            onPress={() => this.props.navigation.navigate('TimeFinder')}
          />
          <Text>
            How much time do you need to get ready?
          </Text>
          <TextInput
            keyboardType='numeric'
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
  center_contained: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    height: 300,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});