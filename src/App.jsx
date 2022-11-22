import React from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  return (
    <div className="container">
      <h1 className="font-bold text-4xl py-4">Weather</h1>
      <SearchBar />
      <div className="weathers my-8">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </div>
  );
}
