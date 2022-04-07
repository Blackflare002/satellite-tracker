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

	useEffect(() => {
		fetch("https://api.spectator.earth/satellite/")
			.then((res) => res.json())
			.then((data) => {
				// setSats(data.features[theNumber]);
				setSats(data.features.filter((el) => el.id === 16)[0]);
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
	}, []);
	// console.log(sats ? sats.id : null);
	//
	return (
		<SatsContext.Provider value={{ sats, setSats, theNumber }}>
			{children}
		</SatsContext.Provider>
	);
};

export default SatsContext;
