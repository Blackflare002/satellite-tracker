import {
	createContext,
	useState,
	useContext,
	useEffect,
} from "react";

const SatsContext = createContext(null);

export const SatsContextProvider = ({ children }) => {
	const [sats, setSats] = useState(null);
	let theNumber = Math.round(Math.random() * 49);
	// let id = sats[theNumber].id;
	// console.log(id);
	const [search, setSearch] = useState(null);
	const [allSats, setAllSats] = useState(null);
	const [searchResults, setSearchResults] = useState(null);
	const [refresh, setRefresh] = useState(false);
	const [defaultValue, setDefaultValue] = useState(false);
	const [focus, setFocus] = useState(false);
	const [update, setUpdate] = useState(false);
	const [newComment, setNewComment] = useState(false);

	useEffect(() => {
		fetch("https://api.spectator.earth/satellite/")
			.then((res) => res.json())
			.then((data) => {
				setSats(data.features[theNumber]);
				// setSats(data.features.filter((el) => el.id === 16)[0]);
				setAllSats(data.features);
				//
				// console.log(sats.id);
				// console.log(sats);
				// let id = sats.id.toString();
				//
				// console.log(data);
				// console.log(data.features);
				// console.log(data.features[theNumber]);
				// console.log(data.properties.name);
				// console.log(data.properties.norad_id);
				// console.log(
				// 	data.geometry.coordinates[0],
				// 	data.geometry.coordinates[1]
				// );
			});
	}, [defaultValue]);
	// console.log(sats ? sats.id : null);
	//
	return (
		<SatsContext.Provider
			value={{
				sats,
				setSats,
				theNumber,
				search,
				setSearch,
				allSats,
				setAllSats,
				searchResults,
				setSearchResults,
				refresh,
				setRefresh,
				defaultValue,
				setDefaultValue,
				focus,
				setFocus,
				update,
				setUpdate,
				newComment,
				setNewComment,
			}}
		>
			{children}
		</SatsContext.Provider>
	);
};

export default SatsContext;
