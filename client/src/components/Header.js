import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<HeaderWrapper>
			<StyledLink to={"/"}>
				<HeaderText>SAT-TRACK</HeaderText>
			</StyledLink>
		</HeaderWrapper>
	);
};

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--lighterGrey);
`;

const HeaderWrapper = styled.div`
	width: 99vw;
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
