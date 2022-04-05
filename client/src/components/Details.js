import { useEffect, useState } from "react";
import { FaSpaceShuttle, FaSatellite } from "react-icons/fa";
import {
	GiBeamSatellite,
	GiDefenseSatellite,
	GiSatelliteCommunication,
} from "react-icons/gi";

//The first number is always the latitude and the second is the longitude.

const Details = () => {
	const [name, setName] = useState(null);
	const [norad, setNorad] = useState(null);
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);

	useEffect(() => {
		fetch("https://api.spectator.earth/satellite/1/")
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				// console.log(data.properties);
				// console.log(data.properties.name);
				// console.log(data.properties.norad_id);
				// console.log(
				// 	data.geometry.coordinates[0],
				// 	data.geometry.coordinates[1]
				// );
				setName(data.properties.name);
				setNorad(data.properties.norad_id);
				setLat(data.geometry.coordinates[0]);
				setLong(data.geometry.coordinates[1]);
			});
	}, []);

	const icons = [
		<FaSatellite />,
		<FaSpaceShuttle />,
		<GiBeamSatellite />,
		<GiDefenseSatellite />,
		<GiSatelliteCommunication />,
	];
	// let number = 0;
	// const randomIconNumber = (number) => {
	// 	number = Math.floor(Math.random() * 6);
	// 	console.log(number);
	// 	return number;
	// };

	let randomIcon = icons[Math.floor(Math.random() * 6)];
	// console.log(randomIcon);

	if (!name || !norad || !lat || !long) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<p>{randomIcon}</p>
			<p>{name}</p>
			<p>{norad}</p>
			<p>latitude: {lat.toFixed(2)}</p>
			<p>longitude: {long.toFixed(2)}</p>
			<a href={`https://maps.google.com/maps?q=${long},${lat}`}>
				Link
			</a>
		</>
	);
};

export default Details;
