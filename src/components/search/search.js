import { React, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Touchable, TouchableHighlight } from 'react-native';
import Local from '../../classes/Local';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';

const citiesURI = 'http://192.168.1.13:3000'

const Search = ({ handleActualForecast }) => {

  const [text, setText] = useState('');
  const [cityOptions, setCityOptions] = useState([]);

  const local = {
    name: '',
    temperature: 0,
    condition: '',
    forecasts: [],
  }

  const searchActualForecast = async (searchTerm) => {
    const weatherURI = `https://api.hgbrasil.com/weather?key=b11f68f6&city_name=${searchTerm}`;
    const data = await fetch(weatherURI);
    const json = await data.json();

    local.name = json.results.city_name;
    local.temperature = json.results.temp;
    local.condition = json.results.description;
    local.forecasts = json.results.forecast;
  }

  const loadOptions = async (inputValue) => {

    const request = {
      city: inputValue,
      startIndex: 0,
      quantity: 5
    }

    try {
      const response = await fetch(`${citiesURI}/cities/${request.quantity}/${request.startIndex}/${inputValue}`);
      const json = await response.json();
      const options = json.map(c => ({
        label: `${c.city_name}, ${c.region_code}`,
        value: c.city_name
      }))

      setCityOptions(options);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.searchBar}>
      <Dropdown
        search
        placeholder='Buscar local'
        searchPlaceholder="Digite o local..."
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        value={text}
        data={cityOptions}
        labelField={"label"}
        valueField={"value"}
        onChangeText={(text) => {
          setText(text);
          loadOptions(text);
        }}
        onChange={(c) => handleActualForecast(local)}
        renderLeftIcon={() => (
          <AntDesign
            name="search1"
            size={24}
            style={styles.icon}
          />
        )}
      />
    </View >
  );
}

const colorWhite = '#fff'

const styles = StyleSheet.create({

  dropdown: {
    height: 50,
    backgroundColor: colorWhite,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  containerStyle: {
    borderRadius: 10,
    marginTop: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
  },

});

export default Search;