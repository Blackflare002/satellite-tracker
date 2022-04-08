import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";

const SearchResults = () => {
	const [searchResults, setSearchResults] = useState(null);
	const { search, setSearch } = useContext(SatsContext);
	useEffect(() => {
		fetch(`https://api.spectator.earth/satellite/`)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				let results = filterPosts(data.features, search);
				setSearchResults(results);
				console.log(data.features);
				console.log(search);
				// setSearchResults(filterPosts(searchResults, search));
			});
	}, [search]);
	const filterPosts = (search, query) => {
		if (!query) {
			return search;
		}
		return search.filter((el) => {
			const elName = el.properties.name.toLowerCase();
			if (elName.includes(query)) {
				return el;
			}
		});
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
				) : (
					<div>Loading...</div>
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	max-height: 50%;
	display: flex;
	flex-wrap: wrap;
`;

export default SearchResults;
