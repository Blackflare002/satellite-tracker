import { useEffect, useState, useContext } from "react";
import { FaSpaceShuttle, FaSatellite } from "react-icons/fa";
import {
	GiBeamSatellite,
	GiDefenseSatellite,
	GiSatelliteCommunication,
} from "react-icons/gi";
import SatsContext from "./SatsContext";

//The first number is always the latitude and the second is the longitude.

const Details = () => {
	const [name, setName] = useState(null);
	const [norad, setNorad] = useState(null);
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);

	const { sats, setSats, theNumber } = useContext(SatsContext);

	useEffect(() => {
		fetch(`https://api.spectator.earth/satellite/${sats.id}/`)
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

	let randomIcon = icons[Math.floor(Math.random() * 6)];
	// console.log(randomIcon);

	if (!name || !norad || !lat || !long || !sats) {
		return <div>Loading...</div>;
	}
	return (
		<>
			{randomIcon ? <div>{randomIcon}</div> : <FaSatellite />}
			<p>{sats.id}</p>
			<p>{name}</p>
			<p>{norad}</p>
			<p>latitude: {lat.toFixed(3)}</p>
			<p>longitude: {long.toFixed(3)}</p>
			<a href={`https://maps.google.com/maps?q=${long},${lat}`}>
				Link
			</a>
		</>
	);
};

export default Details;
