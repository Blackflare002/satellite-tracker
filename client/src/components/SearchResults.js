import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";

const SearchResults = () => {
	// const [searchResults, setSearchResults] = useState(null);
	const {
		search,
		setSearch,
		allSats,
		setAllSats,
		searchResults,
		setSearchResults,
	} = useContext(SatsContext);
	useEffect(() => {
		// fetch(`https://api.spectator.earth/satellite/`)
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// console.log(data);
		let results = filterPosts(allSats, search);
		setSearchResults(results);
		// console.log(data.features);
		console.log(search);
		// }
		// );
	}, [search]);
	const filterPosts = (search, query) => {
		// if (!query) {
		// 	return <div>Please enter a search term.</div>;
		// }
		let searchResults = search.filter((el) => {
			const elName = el.properties.name.toLowerCase();
			if (query === "") {
				return null;
			}
			if (elName.includes(query)) {
				return el;
			}
		});
		if (searchResults.length > 10) {
			return searchResults.slice(0, 9);
		}
		return searchResults;
	};
	return (
		<>
			<Wrapper>
				{searchResults ? (
					<ul>
						{searchResults.map((el) => {
							return (
								<li key={Math.floor(Math.random() * 99999)}>
									{el.properties.name}
								</li>
							);
						})}
					</ul>
				) : search === "" ? (
					<div></div>
				) : (
					<div>Loading...</div>
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	position: absolute;
	/* max-height: 10%; */
	display: flex;
	/* flex-wrap: wrap; */
	background-color: red;
    z-index: 2;
`;

export default SearchResults;
