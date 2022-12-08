import React from "react";
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { formatToLocalTime } from "../api/weatherApi";

export default function SunTime({ sunrise, sunset, timezone }) {
	return (
		<div className="flex justify-center mb-4 gap-4">
			<div className="text-xl bg-gray-800/10 backdrop-blur-sm py-3 px-4 rounded-3xl">
				<BsFillSunriseFill size={40} />
				<p>Sunrise</p>
				<p className="font-bold">
					{formatToLocalTime(sunrise, timezone, "hh:mm a")}
				</p>
			</div>
			<div className="text-xl bg-gray-800/10 backdrop-blur-sm py-3 px-4 rounded-3xl">
				<BsFillSunsetFill size={40} />
				<p>Sunset</p>
				<p className="font-bold">
					{formatToLocalTime(sunset, timezone, "hh:mm a")}
				</p>
			</div>
		</div>
	);
}
