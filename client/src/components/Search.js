import { useContext, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const {
		search,
		setSearch,
		allSats,
		searchResults,
		setSearchResults,
		refresh,
		setRefresh,
	} = useContext(SatsContext);
	const handleChange = (e) => {
		e.preventDefault();
		console.log(document.getElementById("header-search").value);
		setSearch(document.getElementById("header-search").value);
	};
	let navigate = useNavigate();
	console.log(searchResults);
	const [focus, setFocus] = useState(false);

	return (
		<Wrapper>
			<form>
				<label htmlFor="header-search">
					<span>Search Satellites</span>
				</label>
				<StyledInput
					onChange={handleChange}
					placeholder="Search for sats!"
					type="text"
					id="header-search"
					name="s"
					// focus={focus}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
				<button
					type="submit"
					onClick={(ev) => {
						// setSearchResults(filterPosts(allSats, search))
						ev.preventDefault();
						setRefresh(!refresh);
						navigate("/results", { replace: true });
					}}
				>
					Search
				</button>
			</form>
			{focus && allSats && <SearchResults />}
		</Wrapper>
	);
};

const StyledInput = styled.input``;

const Wrapper = styled.div`
	position: relative;
	left: 50px;
`;

export default Search;
