import React, { useEffect, useState } from 'react';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'

const App = props => {
  const [loginMail, setLoginMail] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('logedInWith').then((value) => {
      if (value !== null) {
        setLoginMail(value);
      }
    })
  }, [props]);

  return (
    <View style={styles.container}>
      {!loginMail ? <LoginPage onLogin={(mail) => setLoginMail(mail)} /> :
        <HomePage Login={loginMail} />}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
