import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";
import { Link, useNavigate } from "react-router-dom";

const SearchResults = () => {
	const {
		search,
		setSearch,
		allSats,
		setAllSats,
		searchResults,
		setSearchResults,
		setSats,
		focus,
		setFocus,
		update,
		setUpdate,
		newComment,
		setNewComment,
	} = useContext(SatsContext);

	useEffect(() => {
		let results = filterPosts(allSats, search);
		setSearchResults(results);
		// console.log(data.features);
		console.log(search);
	}, [search]);

	const filterPosts = (search, query) => {
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
			{focus && searchResults && searchResults.length > 0 ? (
				<ul>
					<Wrapper>
						<LinkContainer>
							{searchResults.map((el) => {
								// console.log("searchResults.map: ", el);
								return (
									<div key={Math.floor(Math.random() * 99999)}>
										<StyledLink
											to="/details"
											onClick={() => {
												setSats(el);
												setFocus(false);
												setUpdate(!update);
												setNewComment(!newComment);
											}}
										>
											<div>{el.properties.name}</div>
										</StyledLink>
									</div>
								);
							})}
						</LinkContainer>
					</Wrapper>
				</ul>
			) : search === "" || search === [] ? (
				<StyledNull />
			) : (
				<Wrapper>
					<div>No results</div>
				</Wrapper>
			)}
		</>
	);
};

const StyledNull = styled.div`
	display: none;
	background-color: var(--spaceGrey);
`;

const LinkContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--paleBlueGrey);
	:hover {
		color: var(--offwhite);
	}
	/* padding: 15px; */
`;

const Wrapper = styled.div`
	position: absolute;
	display: flex;
	background-color: var(--trulyDarkGrey);
	/* color: var(--paleBlueGrey); */
	padding: 15px;
	z-index: 2;
	left: 125px;
	top: 25px;
`;

export default SearchResults;
