import styled from "styled-components";
import { Link } from "react-router-dom";
import SatsContext from "./SatsContext";
import { useContext } from "react";

const Header = () => {
	const { defaultValue, setDefaultValue } = useContext(SatsContext);
	return (
		<HeaderWrapper>
			<StyledLink
				to={"/"}
				onClick={() => setDefaultValue(!defaultValue)}
			>
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
