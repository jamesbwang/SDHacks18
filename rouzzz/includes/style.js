import {
    StyleSheet,
  } from 'react-native';
  
  const styles = StyleSheet.create({
    center_contained: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    container: {
      flex: 2,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    timeHeader: {
      fontSize: 40
    },
    map: {
      height: 400,
      width: 500,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text_main: {
      fontSize: 80,
      textAlign: 'center',
    },
    button_layout: {
      // flex: 1,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 30,
    },
  });
  
  export default styles;