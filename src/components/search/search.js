import { React, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Touchable, TouchableHighlight } from 'react-native';


const citiesURI = 'http://192.168.1.13:3000'

const Search = () => {

  const city = {
    name: '',
    forecasts: [],
  }

  const [text, setText] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  const loadOptions = async (inputValue) => {
    if (!inputValue)
      return;

    const request = {
      city: inputValue,
      startIndex: 0,
      quantity: 10
    }

    try {
      const response = await fetch(`${citiesURI}/cities/${request.quantity}/${request.startIndex}/${inputValue}`);
      const options = await response.json();

      setCityOptions(options);
    } catch (error) {
      console.error(error);
    }
    // console.log(options);

  }

  const searchWeather = async (searchTerm) => {
    const weatherURI = `https://api.hgbrasil.com/weather?key=b11f68f6&city_name=${searchTerm}`;
    const data = await fetch(weatherURI);
    const json = await data.json();

    console.log(json.results.condition_slug);
    console.log(json.results.city_name);
  }

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInput}>
        <TextInput {...textInputProps} value={text} onChangeText={(text) => {
          setText(text);
          loadOptions(text);
        }} />
      </View>
      <View style={styles.dropdown}>
        {cityOptions.map((c) => {
          return (
            <TouchableHighlight underlayColor={'#dedede'} onPress={() => {
              searchWeather(c.city_name)
            }}>
              <Text style={styles.dropdownItem}>{`${c.city_name}, ${c.region_code}`}</Text>
            </TouchableHighlight>
          )
        })}
      </View>

    </View>
  );
}

const textInputProps = {
  placeholder: 'Buscar local',
}

const colorLightGrey = '#ededed'

const styles = StyleSheet.create({

  searchBar: {
    position: 'relative',
  },

  searchInput: {
    backgroundColor: colorLightGrey,
    borderRadius: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },

  dropdown: {
    position: 'absolute',
    width: '100%',
    top: '115%',
    borderRadius: 10,
    backgroundColor: colorLightGrey,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 25
  }
});

export default Search;