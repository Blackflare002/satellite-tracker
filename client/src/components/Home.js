import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";

const Home = () => {
	const [sats, setSats] = useState(null);
	let theNumber = Math.round(Math.random() * 49);
	// let id = sats[theNumber].id;
	// console.log(id);

	useEffect(() => {
		fetch("https://api.spectator.earth/satellite/")
			.then((res) => res.json())
			.then((data) => {
				setSats(data.features[theNumber]);
				console.log(sats);
				// let id = sats.id.toString();
				console.log(sats.id);

				// console.log(data);
				// console.log(data.features);
				// console.log(data.features[theNumber]);
				// console.log(data.properties.name);
				// console.log(data.properties.norad_id);
				// console.log(
				// 	data.geometry.coordinates[0],
				// 	data.geometry.coordinates[1]
				// );
			});
	}, []);

	return sats ? (
		<>
			<div>Homepage...</div>
			{/* <div>{sats[theNumber].properties.name}</div> */}
			<div>
				<Link to={"/details"}>
					<IoEarthOutline />
				</Link>
			</div>
		</>
	) : (
		<div>Loading...</div>
	);
};

export default Home;
