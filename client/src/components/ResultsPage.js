import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

	console.log("SATS: ", sats);
	return (
		<div>
			{results &&
				results.map((el) => {
					return (
						<div>
							<Link to={"/details"} onClick={() => setSats(el)}>
								{console.log("EL: ", el)}
								<div>{el.properties.name}</div>
							</Link>
						</div>
					);
				})}
		</div>
	);
};

export default ResultsPage;
