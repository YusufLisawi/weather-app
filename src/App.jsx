import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
// import {getWeather} from "./api/weatherApi"

export default function App() {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  }
  const onBlur = () => {
    setFocused(false);
  }

  // useEffect(() => {
  //   getWeather();
  // }, [])

  return (
    <div className="container">
      <div className="relative">
        <h1 className="relative z-50 font-bold text-4xl py-4">Weather</h1>
        <SearchBar onFocuss={onFocus} onBlurr={onBlur} />
        <div className={!focused ? "animate-pulseslow" : ""}>
          <div className="absolute -bottom-4 left-20 w-60 h-60 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob "></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
        </div>
      </div>
      <div className="weathers my-8 relative">
        <p className="font-medium my-4 mx-2 text-gray-200 opacity-50">Your current location</p>
        <WeatherCard />
        <hr className="w-80 mx-auto opacity-10"/>
        <br />
        <WeatherCard />
      </div>
    </div>
  );
}
