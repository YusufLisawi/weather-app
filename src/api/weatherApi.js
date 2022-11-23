import axios from "axios";

const API_KEY = "1421fdd53f1f23530c9e6d68843277c1";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return axios.get(url).then((res) => res.data);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, description, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    speed,
    details,
    description,
    icon,
  };
};

const getWeatherData = (searchParams) => {
	const currentWeather = await getData('weather', searchParams).then(formatCurrentWeather)

  return currentWeather
}

export default getWeatherData