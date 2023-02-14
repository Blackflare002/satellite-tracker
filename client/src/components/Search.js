// useState
import { useContext } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import { TrueStyledButton } from "./SignIn";

const Search = () => {
	// searchResults, setSearchResults,
	const {
		search,
		setSearch,
		allSats,
		refresh,
		setRefresh,
		focus,
		setFocus,
	} = useContext(SatsContext);

	const handleChange = (e) => {
		e.preventDefault();
		console.log(search);
		setFocus(true);
		// console.log(document.getElementById("header-search").value);
		setSearch(
			document.getElementById("header-search")
				.value
		);
	};

	let navigate = useNavigate();
	// console.log(searchResults);

	return (
		<Wrapper>
			<form>
				<InnerBox>
					<StyledLabel htmlFor="header-search">
						<span>Search Satellites: </span>
					</StyledLabel>
					<StyledInput
						onChange={handleChange}
						placeholder="Search for sats!"
						type="text"
						id="header-search"
						name="s"
						onFocus={() => true}
						onBlur={() => false}
					/>
					<TrueStyledButton
						type="submit"
						onClick={(ev) => {
							ev.preventDefault();
							setRefresh(!refresh);
							setFocus(!focus);
							navigate("/results", {
								replace: true,
							});
						}}
					>
						Search
					</TrueStyledButton>
				</InnerBox>
			</form>
			{focus && allSats && <SearchResults />}
		</Wrapper>
	);
};

const InnerBox = styled.div`
	display: flex;
	align-items: baseline;
	gap: 15px;
	@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
		justify-content: space-evenly;
		align-items: center;
	}
`;

const StyledLabel = styled.label`
	@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
		width: 70px;
	}
`;

export const StyledInput = styled.input`
	padding: 8px;
	border-radius: 15px;
	border: none;
`;

const Wrapper = styled.div`
	position: relative;
	display: flex;
`;

export default Search;
