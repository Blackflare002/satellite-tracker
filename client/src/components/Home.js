// useEffect, useState
import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";
import { GiMovementSensor } from "react-icons/gi";
import SatsContext from "./SatsContext";
import styled, { keyframes } from "styled-components";

const Home = () => {
	// setSats, theNumber
	const { sats } = useContext(SatsContext);

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
		<Wrapper>
			<div>
				Scanning for satellites... <StyledGiMovementSensor />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 80vh;
	/* overflow: clip; */
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

const StyledGiMovementSensor = styled(GiMovementSensor)`
	animation: ${rotation} 1s linear infinite;
	font-size: xx-large;
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
