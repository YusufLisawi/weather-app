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
	console.log(url);
	const data = axios.get(url).then((res) => res.data);
	console.log(data);
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

const imgUrl = {
	clouds: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80",
	clear: "https://images.unsplash.com/photo-1558418294-9da149757efe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	rain: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
	snow: "https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	thunderstorm:
		"https://images.unsplash.com/photo-1613820070607-ef1d3ccc07f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
	mist: "https://images.unsplash.com/photo-1446602916558-5d21d98ec4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	fog: "https://images.unsplash.com/photo-1446602916558-5d21d98ec4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	haze: "https://images.unsplash.com/photo-1446602916558-5d21d98ec4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	dust: "https://images.unsplash.com/photo-1446602916558-5d21d98ec4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	smoke: "https://images.unsplash.com/photo-1446602916558-5d21d98ec4ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
	drizzle:
		"https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
};

export { formatToLocalTime, iconUrlFromCode, imgUrl };
export default getWeatherData;
