import styled from "styled-components";
import { Link } from "react-router-dom";
import SatsContext from "./SatsContext";
import { useContext } from "react";
import UserInfoContext from "./UserInfoContext";

const Header = () => {
	const { defaultValue, setDefaultValue } = useContext(SatsContext);
	const { userInfo } = useContext(UserInfoContext);
	return (
		<HeaderWrapper>
			<InnerWrapper>
				<StyledLink
					to={"/"}
					onClick={() => setDefaultValue(!defaultValue)}
				>
					<HeaderText>SAT-TRACK</HeaderText>
				</StyledLink>
				{userInfo ? (
					<div>Hi, {userInfo}!</div>
				) : (
					<StyledLink to={"/sign-in"}>
						<HeaderText>Sign In</HeaderText>
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

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--lighterGrey);
`;

const HeaderWrapper = styled.div`
	max-width: 100%;
	border: solid 2px lightgray;
	padding: 10px 5px;
	text-decoration: none;
`;

const HeaderText = styled.div`
	/* text-decoration: none; */
	color: var(--offwhite);
	font-size: large;
	font-weight: bold;
`;

export default Header;
