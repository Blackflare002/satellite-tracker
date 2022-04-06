import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
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
	const [update, setUpdate] = useState(false);

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
				setLat(data.geometry ? data.geometry.coordinates[0] : null);
				setLong(data.geometry ? data.geometry.coordinates[1] : null);
			});
	}, [update]);

	const icons = [
		<FaSatellite />,
		<FaSpaceShuttle />,
		<GiBeamSatellite />,
		<GiDefenseSatellite />,
		<GiSatelliteCommunication />,
	];

	let randomIcon = icons[Math.floor(Math.random() * 6)];
	// console.log(randomIcon);

	if (!name || !norad || !sats) {
		return <div>Loading...</div>;
	}
	return (
		<>
			{randomIcon ? <div>{randomIcon}</div> : <FaSatellite />}
			{/* <p>{sats.id}</p> */}
			<p>{name}</p>
			<p>{norad}</p>
			<p>latitude: {lat ? lat.toFixed(3) : "N/A"}</p>
			<p>longitude: {long ? long.toFixed(3) : "N/A"}</p>
			{long && (
				<a href={`https://maps.google.com/maps?q=${long},${lat}`}>
					Link
				</a>
			)}
			<button onClick={() => setUpdate(!update)}>
				Update Coordinates
			</button>
		</>
	);
};

export default Details;
