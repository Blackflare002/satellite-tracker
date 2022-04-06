import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";
import SatsContext from "./SatsContext";
import styled, { keyframes } from "styled-components";

const Home = () => {
	const { sats, setSats, theNumber } = useContext(SatsContext);
	// const { id, properties } = sats
	// 	? sats
	// 	: { id: null, properties: null };

	// console.log(sats);
	// console.log(id ? id : null);

	return sats ? (
		<>
			<Wrapper>
				<div>Click the Earth, see what's out there!</div>
				<div>
					<Link to={"/details"}>
						<StyledEarth />
					</Link>
				</div>
			</Wrapper>
		</>
	) : (
		<div>Scanning for satellites...</div>
	);
	// return (<div></div>)
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 90vh;
`;

const rotation = keyframes`
from {
	transform: rotate(0deg);
}
to {
	transform: rotate(360deg);
}
`;

const color = keyframes`
from {
	color: grey;
}
to {
	color: lightblue;
}
`;

const StyledEarth = styled(IoEarthOutline)`
	font-size: 200px;
	text-decoration: none;
	color: grey;
	:hover {
		animation: ${rotation} 3.5s ease-in-out infinite,
			${color} 3.5s ease-in-out forwards;
	}
`;

export default Home;
