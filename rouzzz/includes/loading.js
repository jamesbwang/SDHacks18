import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  Image
} from 'react-native';

export default class LoadingScreen extends React.Component {
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
            // Add your logic for the transition
            this.props.navigation.navigate('Home') // what to push here?
        }, 2500);
    }
    componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
    }

    render() {
        return (
        <ImageBackground
            source={require("../assets/loading-background-small.png")}
            style={{width: '100%', height: '100%', flex: 1, }} >
            <Text style={{fontSize: 60, textAlign: 'center', color: 'white', top: 130}}>Rouzzz</Text>
          </ImageBackground>
        )
    }
}