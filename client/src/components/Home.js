// useEffect, useState
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoEarthOutline } from "react-icons/io5";
import {
	GiMovementSensor,
	GiAsteroid,
} from "react-icons/gi";
import SatsContext from "./SatsContext";
import styled, {
	keyframes,
} from "styled-components";

const Home = () => {
	const { sats } = useContext(SatsContext);
	const [hover, setHover] = useState(false);
	const onHover = () => {
		setHover(true);
	};
	const onLeave = () => {
		setHover(false);
	};

	return sats ? (
		<>
			<Wrapper>
				<EarthBox>
					<div>
						Click the Earth, see what's out there!
					</div>
					<div>
						<Link to={"/details"}>
							<StyledEarth />
						</Link>
					</div>
				</EarthBox>
				<AsteroidBox>
					<StyledLink to={"/NEO"}>
						<AsteroidFlex>
							<StyledAsteroid
								onMouseEnter={onHover}
								onMouseLeave={onLeave}
							/>
							{hover && (
								<AsteroidText>
									Asteroids!
								</AsteroidText>
							)}
						</AsteroidFlex>
					</StyledLink>
				</AsteroidBox>
			</Wrapper>
		</>
	) : (
		<Wrapper>
			<div>
				Scanning for satellites...{" "}
				<StyledGiMovementSensor />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	position: relative;
	top: 150px;
	/* border: solid 2px black; */
	@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {
		/* iPhone 6, 7, 8 */
		/* border: solid 2px red; */
		position: relative;
		top: 0;
		margin-top: 25px;
	}
	@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
		/* iPhone 6+, 7+, 8+ */
		position: relative;
		top: 20px;
		margin-top: 25px;
	}
	@media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
		/* iPhone X */
		position: relative;
		top: 20px;
		margin-top: 25px;
	}
	@media only screen and (min-device-width: 414px) and (max-device-width: 844px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: landscape) {
		/* iPhone 12 Pro */
		position: relative;
		top: 20px;
		margin-top: 25px;
	}
	@media only screen and (min-device-width: 414px) and (max-device-width: 896px) and (orientation: landscape) {
		/* iPhone XR */
		position: relative;
		top: 20px;
		margin-top: 25px;
	}
`;

const EarthBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	/* border: solid 2px black; */
`;

const AsteroidBox = styled.div`
	position: relative;
	left: -200px;
	top: -150px;
	width: fit-content;
	height: fit-content;
	/* border: solid 2px black; */
	@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
		position: relative;
		top: 70px;
		left: 0;
	}
`;

const AsteroidText = styled.div`
	width: fit-content;
	height: fit-content;
`;

const AsteroidFlex = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--offwhite);
`;

const rotation = keyframes`
from {
	transform: rotate(0deg);
}
to {
	transform: rotate(360deg);
}
`;

const asteroidColors = keyframes`
0% {
	color: #ffc40c;
}
50% {
	color: darkorange;
}
100% {
	color: #b22222;
}
`;

const StyledAsteroid = styled(GiAsteroid)`
	font-size: 40px;
	color: var(--offwhite);
	:hover {
		animation: ${rotation} 1s linear infinite,
			${asteroidColors} 3s ease-in-out forwards
				infinite alternate;
	}
`;

const color = keyframes`
from {
	color: var(--offwhite);
}
to {
	color: #1c39bb;
}
`;

const StyledGiMovementSensor = styled(
	GiMovementSensor
)`
	animation: ${rotation} 1s linear infinite;
	font-size: xx-large;
`;

const StyledEarth = styled(IoEarthOutline)`
	font-size: 200px;
	text-decoration: none;
	color: var(--offwhite);
	:hover {
		animation: ${rotation} 3.5s ease-in-out
				infinite,
			${color} 3.5s ease-in-out forwards;
	}
`;

export default Home;
