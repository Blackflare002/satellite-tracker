import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";
import SatsContext from "./SatsContext";

const Home = () => {
	const { sats, setSats, theNumber } = useContext(SatsContext);
	const { id, properties } = sats
		? sats
		: { id: null, properties: null };

	// console.log(sats);
	console.log(id ? id : null);

	return id ? (
		<>
			<div>Homepage...</div>
			<div>{properties.name}</div>
			<div>{id}</div>
			<div>
				<Link to={"/details"}>
					<IoEarthOutline />
				</Link>
			</div>
		</>
	) : (
		<div>Loading...</div>
	);
	// return (<div></div>)
};

export default Home;
