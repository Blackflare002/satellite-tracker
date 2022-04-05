import styled from "styled-components";

const Header = () => {
	return (
		<HeaderWrapper>
			<h3>Header</h3>
		</HeaderWrapper>
	);
};

const HeaderWrapper = styled.div`
	width: 99vw;
	border: solid 2px black;
`;

export default Header;
