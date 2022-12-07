import React from "react";
import Loader from "./Loader";
import WeatherCard from "./WeatherCard";

export default function SearchResult({
  loading,
  currentLocation,
  weatherSearched,
}) {
  return (
    <div className="weathers my-8 relative">
      <p className="font-medium my-4 mx-2 text-gray-200 opacity-50">
        Your current location
      </p>
      {loading.myLocation ? (
        <div className="flex justify-center scale-75">
          <Loader />
        </div>
      ) : (
        currentLocation && (
          <WeatherCard weather={currentLocation} nopin={true} />
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
          <div>
            <WeatherCard weather={weatherSearched} />
          </div>
        )
      )}
    </div>
  );
}
