import React from "react";
import Loader from "./Loader";
import WeatherCard from "./WeatherCard";
import { motion, AnimatePresence } from "framer-motion";
export default function SearchResult({
	loading,
	currentLocation,
	weatherSearched,
}) {
	return (
		<motion.div
			className="weathers my-8 relative"
			initial={{ y: "100%", opacity: 0 }}
			animate={{ y: "0%", opacity: 1 }}
			transition={{ duration: 0.5 }}
			exit={{ y: "-100%", opacity: 0 }}
		>
			<p className="font-medium my-4 mx-2 text-gray-200 opacity-50">
				Your current location
			</p>
			{loading.myLocation ? (
				<div className="flex justify-center scale-75">
					<Loader />
				</div>
			) : (
				currentLocation && (
					<motion.div
						layout="position"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<WeatherCard weather={currentLocation} nopin={true} />
					</motion.div>
				)
			)}
			<hr className="w-80 mx-auto opacity-10" />
			<br />
			{loading.weatherSearched ? (
				<div className="flex justify-center scale-75">
					<Loader />
				</div>
			) : (
				weatherSearched && (
					<motion.div
						layout="position"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						<WeatherCard weather={weatherSearched} />
					</motion.div>
				)
			)}
		</motion.div>
	);
}
