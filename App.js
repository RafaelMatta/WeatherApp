/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import Search from './src/components/search/Search';

import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';



const wHeight = Dimensions.get('window').height;
const App = () => {

  //Receber nome da cidade através do Search
  //Acessar API
  //Armazenar dados da cidade atual

  return (
    <View style={styles.container}>
      <Search />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wHeight,
    backgroundColor: '#000',
    paddingVertical: 30,
    paddingHorizontal: 15,
  }
})

export default App;
