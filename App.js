/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import IssueCert from './IssueCert';

const App: () => Node = () => {

  return (
    <View style={styles.container}>
     <IssueCert/>
     <StatusBar style="auto"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
