import React, { useState } from "react";
import Tilty from "react-tilty";
export default function WeatherCard() {
  const [shadow, setShadow] = useState(false);

  function showShadow() {
    setShadow(true);
  }
  function hideShadow() {
    setShadow(false);
  }
  return (
    <Tilty max={10}>
      <div
        className={`duration-300 absolute bg-gray-200 -z-10 inset-8 filter blur-3xl ${
          !shadow ? "opacity-0" : "opacity-60"
        }`}
      ></div>
      <div
        className="mb-5 cursor-pointer weather-card py-3 px-5 w-full rounded-3xl relative overflow-hidden"
        onMouseOver={() => showShadow()}
        onMouseLeave={() => hideShadow()}
      >
        <div className="layer"></div>
        <img
          className="absolute inset-0 rounded -translate-y-4 -z-10"
          src="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80"
          alt="cloudy"
        />
        <div className="relative">
          <div className="flex justify-between mb-5">
            <div>
              <h1 className="text-3xl font-semibold text-shadow">Tetouan</h1>
              <p className="font-bold opacity-60">
                {new Date().getHours()}:
                {new Date().getMinutes() <= 9
                  ? `0${new Date().getMinutes()}`
                  : new Date().getMinutes()}
              </p>
            </div>
            <h1 className="text-5xl font-medium">20˚</h1>
          </div>

          <div className="font-medium flex justify-between items-center">
            <p className="opacity-60">Partly cloudy</p>
            <div className="flex gap-2 opacity-80 font-medium text-shadow">
              <p>H:21˚</p>
              <p>L:16˚</p>
            </div>
          </div>
        </div>
      </div>
    </Tilty>
  );
}
