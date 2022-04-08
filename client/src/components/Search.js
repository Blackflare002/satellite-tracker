import { useContext } from "react";
import SatsContext from "./SatsContext";

const Search = () => {
	const { search, setSearch } = useContext(SatsContext);
	const handleChange = (e) => {
		e.preventDefault();
		console.log(document.getElementById("header-search").value);
		setSearch(document.getElementById("header-search").value);
	};
	return (
		<div>
			<form>
				<label htmlFor="header-search">
					<span>Search Satellites</span>
				</label>
				<input
					onChange={handleChange}
					placeholder="Search for sats!"
					type="text"
					id="header-search"
					name="s"
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default Search;
