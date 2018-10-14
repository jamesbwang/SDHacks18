import {
    StyleSheet,
  } from 'react-native';
  
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
  
  export default styles;