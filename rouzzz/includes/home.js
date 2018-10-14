import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import TimeFinderScreen from './debug';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appId: "ASP74kP1aWXMTUXMl9Z7",
      appCode: "TTqYfk0ASNuvbY7R5GtUcg",
      isLoading: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((pos) => this.setCoords(pos));
  }

  setCoords = (pos) => {
    this.setState({
    region: { // for mapview
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      latitudeDelta: 0.030,
      longitudeDelta: 0.0242,
    },
    num: '0',
    destCoords: {  // for marker
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      },
    initCoords: {  // for marker
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      },
    isLoading: false
    });
  }  

  updateMarker = function(e) {
    this.setState({destCoords: e.nativeEvent.coordinate});
    this.map.animateToCoordinate(e.nativeEvent.coordinate);
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator/>
          <Text>{"\n"}Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>Rouzzz</Text>
        <MapView
          ref={map => this.map = map}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={(e) => this.updateMarker(e)}
        >
          <Marker draggable
            coordinate={this.state.destCoords}
            onDragEnd={(e) => this.updateMarker(e)}
          />
        </MapView>
        <Text>Latitude: {this.state.destCoords.latitude}</Text>
        <Text>Longitude: {this.state.destCoords.longitude}</Text>
        <Button
          title="Go to Countdown"
          onPress={() => this.props.navigation.navigate('Countdown', this.state)}
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
          value={this.state.num}
          maxLength={3}
        />
      </View>
    );
  }
  onChanged(text) {
    this.setState({num: +text});
  }
}

const styles = StyleSheet.create({
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