import { useContext, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import { TrueStyledButton } from "./SignIn";

const Search = () => {
	const {
		search,
		setSearch,
		allSats,
		searchResults,
		setSearchResults,
		refresh,
		setRefresh,
		focus,
		setFocus,
	} = useContext(SatsContext);

	const handleChange = (e) => {
		e.preventDefault();
		console.log(search);
		setFocus(true);
		console.log(document.getElementById("header-search").value);
		setSearch(document.getElementById("header-search").value);
	};

	let navigate = useNavigate();

	// console.log(searchResults);

	return (
		<Wrapper>
			<form>
				<InnerBox>
					<label htmlFor="header-search">
						<span>Search Satellites: </span>
					</label>
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
							navigate("/results", { replace: true });
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
	gap: 5px;
	align-items: baseline;
`;

export const StyledInput = styled.input`
	padding: 8px;
	border-radius: 15px;
	border: none;
`;

const Wrapper = styled.div`
	position: relative;
	left: 50px;
	display: flex;
	gap: 10px;
`;

export default Search;
