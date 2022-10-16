
import React, { useEffect, useState } from 'react';
import Search from './src/components/search/Search';
import StyledText from './src/components/styledText/StyledText'

import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;
const App = () => {

  const weatherStateIcon = {
    storm: "weather-lightning-rainy",
    snow: "weather-snowy",
    hail: "weather-hail",
    rain: "weather-pouring",
    fog: "weather-fog",
    clear_day: "weather-sunny",
    clear_night: "weather-night",
    wind: "weather-windy",
    cloud: "weather-cloudy",
    cloudly_day: "weather-partly-cloudy",
    cloudly_night: "weather-night-partly-cloudy",
  }

  const [currentPlace, setCurrentPlace] = useState({
    name: '',
    currentTemperature: 0,
    currentCondition: '',
    currentDescription: '',
    date: null,
    forecasts: [],
  })

  const searchAndSetPlace = async (searchTerm) => {
    const weatherURI = `https://api.hgbrasil.com/weather?key=70507e67&city_name=${searchTerm}`;
    const data = await fetch(weatherURI);
    const json = await data.json();

    console.log(json);

    setCurrentPlace({
      ...currentPlace,
      name: json.results.city_name,
      currentTemperature: json.results.temp,
      currentCondition: json.results.condition_slug,
      currentDescription: json.results.description,
      date: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date()),
      forecasts: json.results.forecast.map(f => ({
        day: new Date(convertDate(f.date)).getDate(),
        month: new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(`${convertDate(f.date)}`)).replace('.', ''),
        weekday: new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(new Date(`${convertDate(f.date)}`)).replace('.', ''),
        condition: f.condition,
        description: f.description,
        temperature: (f.min + f.max) / 2,
      }))
    });
  }

  const convertDate = function (date) {
    const year = new Date().getFullYear();
    date = date + `/${year}`;
    return date.split("/").reverse().join("/");
  }

  const sentenceCaseString = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <View style={styles.weather}>
      <Search searchAndSetPlace={searchAndSetPlace} />

      <View style={[styles.currentWeather, styles.flexCenter]}>
        <View style={[styles.currentWeatherLocalization, styles.flexCenter]}>
          <StyledText customStyle={styles.currentWeatherCityName}>{currentPlace.name}</StyledText>
          <StyledText customStyle={styles.currentWeatherDate}>{sentenceCaseString(currentPlace.date)}</StyledText>
        </View>

        <StyledText customStyle={styles.currentWeatherTemperature}>
          {`${currentPlace.currentTemperature}°`}
        </StyledText>

        <View style={[styles.currentWeatherCondition, styles.flexCenter]}>
          <StyledText customStyle={styles.currentWeatherIconBox}>
            <Icon
              name={weatherStateIcon[currentPlace.currentCondition]}
              style={styles.currentWeatherIcon}
            />
          </StyledText>
          <StyledText customStyle={styles.currentWeatherDescription}>{currentPlace.currentDescription}</StyledText>
        </View>

      </View>

      <View style={styles.forecast}>
        <ScrollView>{currentPlace.forecasts?.map((f, index) => {
          return (
            <View style={styles.forecastItem} key={index}>
              <View style={styles.forecastTextContainer}>
                <StyledText customStyle={[styles.forecastDate]}>
                  {`${sentenceCaseString(f.weekday)}, ${f.day} ${sentenceCaseString(f.month)}`}
                </StyledText>
              </View>

              <Text style={styles.forecastIconBox}>
                <Icon
                  name={weatherStateIcon[f.condition]}
                  style={styles.forecastIcon}
                />
              </Text>

              <View style={styles.forecastTextContainer}>
                <StyledText customStyle={styles.forecastTemperature}>{`${Math.trunc(f.temperature)}°`}</StyledText>
              </View>
            </View>
          )
        })
        }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    height: wHeight,
    backgroundColor: '#000',
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  currentWeatherCityName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  currentWeatherDate: {
    fontSize: 12,
  },

  currentWeatherTemperature: {
    fontSize: 96,
    fontWeight: '200',
    paddingVertical: 50,
  },

  currentWeatherIconBox: {
    marginBottom: 10,
  },

  currentWeatherIcon: {
    fontSize: 48,
  },

  forecastItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },

  forecastTextContainer: {
    width: 100,
  },

  forecastTemperature: {
    textAlign: 'right',
    width: 100,
    color: '#fff',
    fontWeight: 'semi-bold',
    fontSize: 14,
  },

  forecastIcon: {
    color: 'white',
    fontSize: 32,
  },

  forecast: {
    height: 200,
    width: '100%'
  },

  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default App;


