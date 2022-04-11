import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SatsContext from "./SatsContext";

const ResultsPage = () => {
	const { search, allSats, refresh, sats, setSats } =
		useContext(SatsContext);
	const [results, setResults] = useState(null);

	useEffect(() => {
		setResults(filterPosts(allSats, search));
	}, [refresh]);

	const filterPosts = (search, query) => {
		let searchResults = search.filter((el) => {
			const elName = el.properties.name.toLowerCase();
			if (elName.includes(query)) {
				return el;
			}
		});
		return searchResults;
	};

	// console.log("SATS: ", sats);
	return (
		<Margins>
			<Wrapper>
				{results &&
					results.map((el) => {
						return (
							<div>
								<StyledLink
									to={"/details"}
									onClick={() => setSats(el)}
								>
									{/* {console.log("EL: ", el)} */}
									<div>{el.properties.name}</div>
								</StyledLink>
							</div>
						);
					})}
			</Wrapper>
		</Margins>
	);
};

const Margins = styled.div`
	display: flex;
	flex-direction: column;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	margin-top: 25px;
	margin-bottom: 25px;
	/* border: 2px solid red; */
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: var(--offwhite);
`;

export default ResultsPage;
