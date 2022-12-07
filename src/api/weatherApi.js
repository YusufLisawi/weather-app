import axios from "axios";
import { DateTime } from "luxon";

// api key --confidentiel
const API_KEY = "1421fdd53f1f23530c9e6d68843277c1";
// endpoint base url
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// fetch data from the endpoint with specified search parameters
// infoType : weather or onecall options
// Example : https://api.openweathermap.org/data/2.5/weather
// Create search parameters for url
// Example : ...?lat=10&long=40&...&appid:44444444
// axios GET request to fetch data from api
const getData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log(url)
  const data = axios.get(url).then((res) => res.data)
  console.log(data)
  return data;
};

// Cleanup fetched data from api (only what we need)
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
    speed,
    details,
    description,
    icon,
  };
};

// Cleanup forcast data (daily and hourly)
const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: iconUrlFromCode(d.weather[0].icon),
    };
  });
  hourly = hourly.slice(1, 6).map((h) => {
    return {
      title: formatToLocalTime(h.dt, timezone, "hh"),
      temp: h.temp,
      icon: iconUrlFromCode(h.weather[0].icon),
    };
  });

  return { timezone, daily, hourly };
};

// Get current and forcast weather data
const getWeatherData = async (searchParams) => {
  const currentWeather = await getData("weather", searchParams).then(
    formatCurrentWeather
  );

  const { lat, lon } = currentWeather;

  const getForecastWeather = await getData("onecall", {
    lat,
    lon,
    exclude: "current, minutely, alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...currentWeather, ...getForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | ' hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export { formatToLocalTime, iconUrlFromCode };
export default getWeatherData;
