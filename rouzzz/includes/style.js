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
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  });
  
  export default styles;