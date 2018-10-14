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
      alignItems: 'flex-start',
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
      flex: 1,
      flexDirection: 'row',
    },
  });
  
  export default styles;