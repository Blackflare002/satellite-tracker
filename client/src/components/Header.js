import styled from "styled-components";
import { Link } from "react-router-dom";
import SatsContext from "./SatsContext";
import { useContext, useState } from "react";
import UserInfoContext from "./UserInfoContext";
import { FaSpaceShuttle, FaSatellite } from "react-icons/fa";
import {
	GiBeamSatellite,
	GiDefenseSatellite,
	GiSatelliteCommunication,
} from "react-icons/gi";

const Header = () => {
	const { defaultValue, setDefaultValue } = useContext(SatsContext);
	const { userInfo } = useContext(UserInfoContext);

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

	return (
		<HeaderWrapper>
			<InnerWrapper>
				<StyledLink
					to={"/"}
					onClick={() => setDefaultValue(!defaultValue)}
				>
					<HeaderText>
						<div>SAT-TRACK 3000</div>
						{randomIcon ? <div>{randomIcon}</div> : <FaSatellite />}
					</HeaderText>
				</StyledLink>
				{userInfo ? (
					<HeaderText>Hi, {userInfo}!</HeaderText>
				) : (
					<StyledLink to={"/sign-in"}>
						<SignInStyle>Sign In</SignInStyle>
					</StyledLink>
				)}
			</InnerWrapper>
		</HeaderWrapper>
	);
};

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const HeaderWrapper = styled.div`
	max-width: 100%;
	border: solid 2px lightgray;
	padding: 10px 5px;
	text-decoration: none;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--lighterGrey);
`;

const HeaderText = styled.div`
	color: var(--offwhite);
	font-size: large;
	font-weight: bold;
	padding-left: 10px;
	padding-right: 10px;
	/* padding-top: 5px; */
	display: flex;
	align-items: center;
	gap: 10px;
`;

const SignInStyle = styled(HeaderText)`
	border: solid 2px royalblue;
	border-radius: 20px;
	padding: 8px;
	:hover {
		background-color: var(--gentlePurple);
	}
`;

export default Header;
