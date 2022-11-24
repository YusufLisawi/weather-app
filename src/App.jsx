import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import getWeatherData from "./api/weatherApi";
import Loader from "./components/Loader";

export default function App() {
	const [focused, setFocused] = useState(false);
	const [weather, setWeather] = useState(null);
	const [MyWeather, setMyWeather] = useState(null);
	const [loading, setLoading] = useState(true);
	const [waiting, setWaiting] = useState(true);

	const onFocus = () => {
		setFocused(true);
	};
	const onBlur = () => {
		setFocused(false);
	};
	useEffect(() => {
		setLoading(false);
		const fetchMyWeather = async (lat, lon) => {
			await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
				(data) => {
					setMyWeather(data);
					setLoading(true);
				}
			);
		};

		if (localStorage.getItem("cords")) {
			let { lat, lon } = JSON.parse(localStorage.getItem("cords"));
			fetchMyWeather(lat, lon);
		} else if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;

				localStorage.setItem("cords", JSON.stringify({ lat, lon }));
				fetchMyWeather(lat, lon);
			});
		}
	}, []);

	useEffect(() => {
		console.log(weather);
		console.log(MyWeather);
	}, [weather, MyWeather]);

	const fetchWeather = async (city) => {
		setWaiting(false);
		await getWeatherData({ q: city, units: "metric" }).then((data) => {
			setWeather(data);
			setWaiting(true);
		});
	};

	return (
		<div className="container">
			<div className="relative">
				<h1 className="relative z-50 font-bold text-4xl py-4">
					Weather
				</h1>
				<SearchBar
					onSearch={fetchWeather}
					onFocuss={onFocus}
					onBlurr={onBlur}
				/>
				<div className={!focused ? "animate-pulseslow" : ""}>
					<div className="absolute -bottom-4 left-20 w-60 h-60 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
					<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob "></div>
					<div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
				</div>
			</div>
			<div className="weathers my-8 relative">
				{!loading ? (
					<div className="flex justify-center scale-75">
						<Loader />
					</div>
				) : (
					MyWeather && (
						<div>
							<p className="font-medium my-4 mx-2 text-gray-200 opacity-50">
								Your current location
							</p>
							<WeatherCard weather={MyWeather} nopin={true} />
							<hr className="w-80 mx-auto opacity-10" />
						</div>
					)
				)}
				<br />
				{!waiting ? (
					<div className="flex justify-center scale-75">
						<Loader />
					</div>
				) : (
					weather && (
						<div>
							<WeatherCard weather={weather} />
						</div>
					)
				)}
			</div>
			{/* <Loader /> */}
		</div>
	);
}
