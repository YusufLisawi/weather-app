import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch }) {
	const [focused, setFocused] = useState(false);
	const inputDiv = useRef();
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const onFocuss = () => {
		setFocused(true);
	};
	const onBlurr = () => {
		setFocused(false);
	};

	const handleOnChange = (value) => {
		setSearch(value);
	};
	return (
		<form
			className="relative z-50"
			onSubmit={(e) => {
				e.preventDefault();
				if (search.trim() !== "") onSearch(search.trim());
				setSearch("");
				navigate("/");
			}}
		>
			<div
				className="flex items-center gap-2 p-2 rounded-lg input-control cursor-text"
				onClick={() => {
					inputDiv.current.focus();
					onFocuss();
				}}
			>
				<IoMdSearch className="search-icon text-xl" />
				<input
					type="text"
					placeholder="Search for a city"
					value={search}
					className="bg-transparent opacity-100 w-full"
					onChange={(e) => handleOnChange(e.target.value)}
					onBlur={() => onBlurr()}
					ref={inputDiv}
				/>
				<div className={!focused ? "animate-pulseslow" : ""}>
					<div className="absolute -bottom-4 left-20 w-60 h-60 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
					<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob "></div>
					<div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
				</div>
			</div>
		</form>
	);
}
