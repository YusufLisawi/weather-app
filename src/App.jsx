import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import getWeatherData from "./api/weatherApi";
import SearchResult from "./components/SearchResult";
import { BsFillPinFill } from "react-icons/bs";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pinned from "./components/Pinned";
import { useSelector } from "react-redux";

export default function App() {
	const [loading, setLoading] = useState({
		myLocation: false,
		weatherSearched: false,
	});
	const [currentLocation, setCurrentLocation] = useState(null);
	const [weatherSearched, setWeatherSearched] = useState(null);
	const pinnedCords = useSelector((state) => state.weather.pinnedCords);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let lat = position.coords.latitude;
				let lon = position.coords.longitude;
				fetchMyLocation(lat, lon);
			});
		}
	}, []);

	const fetchMyLocation = async (lat, lon) => {
		setLoading({ ...loading, myLocation: true });
		await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
			(data) => {
				setCurrentLocation(data);
				setLoading({ ...loading, myLocation: false });
			}
		);
	};

	const fetchWeather = async (city) => {
		setLoading({ ...loading, weatherSearched: true });
		await getWeatherData({ q: city, units: "metric" }).then((data) => {
			setWeatherSearched(data);
			setLoading({ ...loading, weatherSearched: false });
		});
	};

	return (
		<Router>
			<div className="container">
				<div className="relative">
					<div className="flex justify-between items-center py-4">
						<Link to="/">
							<h1 className="relative z-50 font-bold text-4xl">
								Weather
							</h1>
						</Link>
						<Link
							className="relative cursor-pointer p-2"
							to="pinned"
						>
							<BsFillPinFill size={25} />
							<div class="inline-flex absolute -top-2 -right-0 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900 text-xs">
								{pinnedCords.length}
							</div>
						</Link>
					</div>
					<SearchBar onSearch={fetchWeather} />
				</div>
				<div className="relative z-50">
					<Routes>
						<Route
							path="/"
							element={
								<SearchResult
									loading={loading}
									currentLocation={currentLocation}
									weatherSearched={weatherSearched}
								/>
							}
						/>
						<Route path="pinned" element={<Pinned />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}
