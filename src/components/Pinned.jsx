import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getWeatherData from "../api/weatherApi";
import Loader from "./Loader";
import WeatherCard from "./WeatherCard";

export default function Pinned() {
	const pinnedCords = useSelector((state) => state.weather.pinnedCords);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [locations, setLocations] = useState([]);

	const fetchLocations = async (lat, lon) => {
		setLoading(true);
		await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
			(data) => {
				setLocations((locations) => [...locations, data]);
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		pinnedCords.forEach((c) => fetchLocations(c.lat, c.lon));
	}, [pinnedCords]);

	return (
		<div>
			<button className="my-4 mb-6" onClick={() => navigate(-1)}>
				<ImArrowLeft2 size={22} />
			</button>
			{loading ? (
				<div className="flex justify-center scale-75">
					<Loader />
				</div>
			) : (
				<div>
					{locations.map((c) => (
						<WeatherCard key={c.name} weather={c} remove />
					))}
				</div>
			)}
		</div>
	);
}
