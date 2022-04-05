import { useEffect } from "react";

//The first number is always the latitude and the second is the longitude.

const Home = () => {
	let name = null;
	let norad = null;
	let lat = null;
	let long = null;
	let info = null;
	useEffect(() => {
		fetch("https://api.spectator.earth/satellite/1/")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log(data.properties);
				console.log(data.properties.name);
				console.log(data.properties.norad_id);
				console.log(
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				);
			})
			.then((data) => (info = data));
	}, []);
	name = info.properties.name;
	norad = info.properties.norad_id;
	lat = info.geometry.coordinates[0];
	long = info.geometry.coordinates[1];
	return (
		<>
			<p>{name}</p>
			<p>{norad}</p>
			<p>latitude: {lat}</p>
			<p>longitude: {long}</p>
		</>
	);
};

export default Home;
