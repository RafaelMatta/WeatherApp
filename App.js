
import React, { useEffect, useState } from 'react';
import Search from './src/components/search/Search';

import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

const wHeight = Dimensions.get('window').height;
const App = () => {

  const [currentPlace, setCurrentPlace] = useState({
    name: '',
    temperature: 0,
    condition: '',
    date: null,
    forecasts: [],
  })

  const searchAndSetPlace = async (searchTerm) => {
    const weatherURI = `https://api.hgbrasil.com/weather?key=b5cf58a9&city_name=${searchTerm}`;
    const data = await fetch(weatherURI);
    const json = await data.json();

    console.log(json);

    setCurrentPlace({
      ...currentPlace,
      name: json.results.city_name,
      temperature: json.results.temp,
      condition: json.results.description,
      date: new Date(),
      forecasts: json.results.forecast.map(f => ({
        day: new Date(convertDate(f.date)).getDate(),
        month: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(convertDate(f.date))).replace('.', ''),
        weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(new Date(convertDate(f.date))).replace('.', ''),
        condition: f.description,
        temperature: (f.min + f.max) / 2,
      }))
    });

    console.log(currentPlace);
  }

  const convertDate = function (date) {
    return date.split("/").reverse().join("/");
  }

  const setWeatherIcon = function () {

  }

  return (
    <View style={styles.container}>
      <Search searchAndSetPlace={searchAndSetPlace} />

      <View>
        <View style={styles.place}>
          <Text style={styles.place}>{currentPlace.name}</Text>
          <Text style={styles.place}>{currentPlace.date?.toLocaleDateString()}</Text>
        </View>

        <Text style={styles.place}>
          {currentPlace.temperature}
        </Text>

        <View style={styles.place}>
          <Text style={styles.place}>
            {setWeatherIcon(currentPlace.condition)}
          </Text>
          <Text style={styles.place}>{currentPlace.condition}</Text>
        </View>
      </View>

      <View style={styles.place}>{currentPlace.forecasts?.map((f) => {
        return (
          <View>
            <Text style={styles.place}>{`${f.weekday}, ${f.day} ${f.month}`}</Text>
            <Text style={styles.place}>{setWeatherIcon(f.condition)}</Text>
            <Text style={styles.place}>{`${f.condition}°`}</Text>
          </View>
        )
      })
      }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: wHeight,
    backgroundColor: '#000',
    paddingVertical: 30,
    paddingHorizontal: 15,
  },

  place: {
    color: 'white',
  }
})

export default App;


