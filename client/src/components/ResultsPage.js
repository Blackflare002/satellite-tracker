import React, { useContext, useEffect, useState } from "react";
import SatsContext from "./SatsContext";

const ResultsPage = () => {
	const { search, allSats, refresh } = useContext(SatsContext);
	const [results, setResults] = useState(null);
	//get fetch logic
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

	return (
		<div>
			{results &&
				results.map((el) => {
					return <div>{el.properties.name}</div>;
				})}
		</div>
	);
};

export default ResultsPage;
