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
import Comments from "./Comments";
import {
	GoogleMap,
	LoadScript,
	Marker,
} from "@react-google-maps/api";
import UserInfoContext from "./UserInfoContext";

// console.log(process.env.REACT_APP_GOOGLE_API_KEY);

//The first number is always the latitude and the second is the longitude.
//MTL 45.507544685873405, -73.6357024529298
//when defining coordinates the convention used is longitude, latitude(!!!!!)

const Details = () => {
	const [name, setName] = useState(null);
	const [norad, setNorad] = useState(null);
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [commentValue, setCommentValue] = useState("");
	// const [username, setUsername] = useState("");

	const { sats, setSats, theNumber, update, setUpdate } =
		useContext(SatsContext);
	const { userInfo } = useContext(UserInfoContext);

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
				setLat(data.geometry ? data.geometry.coordinates[1] : null);
				setLong(data.geometry ? data.geometry.coordinates[0] : null);
			});
	}, [update]);

	const writeComment = (ev) => {
		setCommentValue(ev.target.value);
	};
	// const writeUsername = (ev) => {
	// 	setUsername(ev.target.value);
	// };
	const sendComment = (ev) => {
		ev.preventDefault();
		fetch("/details", {
			body: JSON.stringify({
				message: commentValue,
				user: userInfo,
				sat: sats.id,
			}),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				// setUsername("");
				setCommentValue("");
			});
	};

	// console.log(sats.id);

	const icons = [
		<FaSatellite />,
		<FaSpaceShuttle />,
		<GiBeamSatellite />,
		<GiDefenseSatellite />,
		<GiSatelliteCommunication />,
	];
	const [randomNumber, setRandomNumber] = useState(
		Math.floor(Math.random() * 6)
	);
	let randomIcon = icons[randomNumber];
	// console.log(randomIcon);

	const containerStyle = {
		width: "400px",
		height: "400px",
	};
	const center = {
		lat: lat,
		lng: long,
	};

	if (!name || !norad || !sats) {
		return <div>Loading...</div>;
	}
	return (
		<Container>
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
					<a
						href={`https://maps.google.com/maps?q=${lat},${long}&z=4`}
					>
						Link
					</a>
				)}
				<button onClick={() => setUpdate(!update)}>
					Update Coordinates
				</button>
				<LoadScript googleMapsApiKey="AIzaSyDhtNwzYNDDMOROyMq4L0i1c_yJ8jjwfYk">
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={4}
					>
						<Marker position={center} />
					</GoogleMap>
				</LoadScript>
			</ContentWrapper>
			<form>
				<FormWrapper>
					<FormDiv>
						{userInfo ? (
							<>
								<div>
									{/* <input
								placeholder="Enter a username!"
								onChange={writeUsername}
								value={username}
							/> */}
									<div>Write your comment here, {userInfo}!</div>
								</div>
								<StyledTextarea
									placeholder="Write a comment!"
									onChange={writeComment}
									value={commentValue}
								/>
								<button onClick={(ev) => sendComment(ev)}>
									Post!
								</button>
							</>
						) : (
							<div>You must sign in before commenting!</div>
						)}
					</FormDiv>
				</FormWrapper>
			</form>
			<CommentsBox>
				<Comments key={Math.floor(Math.random() * 99999)} />
			</CommentsBox>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const CommentsBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 15px;
	margin-top: 20px;
	margin-bottom: 20px;
	/* border: 5px solid red; */
`;

const FormWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid var(--offwhite);
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
	padding: 15px;
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
	/* margin: 20px; */
	padding: 10px;
	gap: 10px;
	/* border: 2px solid black; */
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 20px;
	/* max-height: 100vh; */
`;

const IconWrapper = styled.div`
	font-size: 80px;
`;

export default Details;
