import React from "react";

export default function Forcast({ weather }) {
	return (
		<div className="forecast grid place-content-center mb-4">
			<div className="flex gap-8 text-center font-bold text-xl border border-gray-400/10 bg-gray-800/10 backdrop-blur-sm py-3 px-4 rounded-3xl">
				{weather.map((d) => (
					<div key={Math.random()}>
						<h2 className="font-semibold text-lg">{d.title}</h2>
						<img
							src={d.icon}
							alt={d.title}
							className="cast"
							style={{ width: "2.5em" }}
						/>
						<h1>{Math.ceil(d.temp)}˚</h1>
					</div>
				))}
			</div>
		</div>
	);
}
