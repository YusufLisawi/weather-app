import React, { useState } from "react";
import Tilty from "react-tilty";
import { formatToLocalTime, imgUrl } from "../api/weatherApi";
import Forcast from "./Forcast";
import "./styles/weather.css";
import { motion, AnimatePresence } from "framer-motion";
import SunTime from "./SunTime";
import { AiFillPushpin } from "react-icons/ai";

export default function WeatherCard({
	weather: {
		lat,
		lon,
		sunrise,
		sunset,
		dt,
		timezone,
		name,
		description,
		temp,
		details,
	},
	nopin,
	weather,
}) {
	const [shadow, setShadow] = useState(false);
	const [expand, setExpand] = useState(false);
	console.log(weather);

	function showShadow() {
		setShadow(true);
	}
	function hideShadow() {
		setShadow(false);
	}

	function toCapitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<>
			<Tilty max={6}>
				<div
					className={`duration-300 bg-gray-200 -z-10 inset-8 filter blur-3xl ${
						!shadow ? "opacity-0" : "opacity-60"
					}`}
				></div>
				<motion.div
					layout
					transition={{ layout: { duration: 0.5, type: "spring" } }}
					className="mb-5 cursor-pointer weather-card py-3 px-5 w-full rounded-3xl relative select-none overflow-hidden"
					onMouseOver={() => showShadow()}
					onMouseLeave={() => hideShadow()}
					onClick={() => setExpand(!expand)}
					style={{
						backgroundImage: `url("${
							imgUrl[details.toLowerCase()]
						}")`,
					}}
				>
					<div className="layer"></div>
					<div className="relative">
						<motion.div
							layout="position"
							className={`flex justify-between mb-5`}
						>
							<div>
								<h1
									className={`text-4xl font-semibold text-shadow`}
								>
									{name}
								</h1>
								<p
									className={`font-bold text-shadow opacity-60`}
								>
									{formatToLocalTime(dt, timezone, "hh:mm a")}
								</p>
							</div>
							<h1 className="text-6xl font-medium relative text-shadow">
								{Math.ceil(temp)}˚
							</h1>
						</motion.div>
						<AnimatePresence>
							{expand && (
								<motion.div
									layout="position"
									initial={{ opacity: 0, height: "auto" }}
									animate={{
										opacity: 1,
									}}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
								>
									<Forcast weather={weather.hourly} />
									<Forcast weather={weather.daily} />
									<SunTime
										sunrise={sunrise}
										sunset={sunset}
										timezone={timezone}
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<div className="font-medium flex justify-between items-center opacity-70">
							<p>{toCapitalize(description)}</p>
							<p className="text-sm font-bold">
								H : {weather.humidity}%
							</p>
						</div>
					</div>
				</motion.div>
			</Tilty>
			<div className="relative">
				{!nopin && (
					<p className="absolute -top-9 -right-3 p-2 rounded-full bg-black hover:text-red-400 duration-300 cursor-pointer">
						<AiFillPushpin size={20} />
					</p>
				)}
			</div>
		</>
	);
}
