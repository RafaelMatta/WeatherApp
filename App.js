/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Search from './src/components/search/Search';

const App = () => {

  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'aqua',
  }
});

export default App;
