import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const Search = () => {
  const [text, setText] = useState('');

  let city = {};

  const onSearch = async(searchTerm) => {
    const uri = `https://api.hgbrasil.com/weather?key=b11f68f6&city_name=${searchTerm}`;
    city = await (await fetch(uri)).json();

    console.log(city.results.forecast);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <TextInput value={text} onChangeText={(text) => setText(text)} />
        <Button title='Search' onPress={() => onSearch(text)} />
      </View>
      <View style={styles.dropdown}>
        <Text></Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  }, 
});

export default Search;
