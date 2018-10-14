import {
    StyleSheet,
  } from 'react-native';
  
  const styles = StyleSheet.create({
    center_contained: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    timeHeader: {
      fontSize: 40
    },
    map: {
      height: 400,
      width: 500,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text_main: {
      fontSize: 80,
      textAlign: 'center',
    },
    button_layout: {
      flex: 1,
      padding: 20,
      alignItems: 'center'
    },
  });
  
  export default styles;