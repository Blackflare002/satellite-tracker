import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSpaceShuttle, FaSatellite } from "react-icons/fa";
import {
	GiBeamSatellite,
	GiDefenseSatellite,
	GiSatelliteCommunication,
} from "react-icons/gi";
import SatsContext from "./SatsContext";
import styled from "styled-components";

//The first number is always the latitude and the second is the longitude.
//MTL 45.507544685873405, -73.6357024529298

const Details = () => {
	const [name, setName] = useState(null);
	const [norad, setNorad] = useState(null);
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [update, setUpdate] = useState(false);
	const [commentValue, setCommentValue] = useState("");
	const [username, setUsername] = useState(null);

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

	const writeComment = (ev) => {
		setCommentValue(ev.target.value);
	};
	const writeUsername = (ev) => {
		setUsername(ev.target.value);
	};
	const sendComment = () => {
		fetch("/details", {
			body: JSON.stringify({ status: commentValue }),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
		// .catch(() => {
		// 	setStatus("Error");
		// })
	};

	console.log(sats.id);

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
			<ContentWrapper>
				<IconWrapper>
					{randomIcon ? <div>{randomIcon}</div> : <FaSatellite />}
				</IconWrapper>
				{/* <p>{sats.id}</p> */}
				<p>Name: {name}</p>
				<p>NORAD ID: {norad}</p>
				<p>Latitude: {lat ? lat.toFixed(3) : "N/A"}</p>
				<p>Longitude: {long ? long.toFixed(3) : "N/A"}</p>
				{long && (
					<a href={`https://maps.google.com/maps?q=${long},${lat}`}>
						Link
					</a>
				)}
				<button onClick={() => setUpdate(!update)}>
					Update Coordinates
				</button>
			</ContentWrapper>
			<form>
				<FormWrapper>
					<FormDiv>
						<div>
							<input
								placeholder="Enter a username!"
								onChange={writeUsername}
							/>
						</div>
						<StyledTextarea
							placeholder="Write a comment!"
							onChange={writeComment}
						/>
						<div>
							<button onClick={sendComment}>Post!</button>
						</div>
					</FormDiv>
				</FormWrapper>
			</form>
			<div></div>
		</>
	);
};

const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledTextarea = styled.textarea`
	height: 100px;
	width: 300px;
	resize: none;
`;

const FormDiv = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`;

const ContentWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin: 25px;
	padding: 10px;
	gap: 10px;
	border: 5px solid black;
`;

const IconWrapper = styled.div`
	font-size: xx-large;
`;

export default Details;
