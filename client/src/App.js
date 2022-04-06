import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Home from "./components/Home";
import SatsContext from "./components/SatsContext";

function App() {
	const { sats } = useContext(SatsContext);
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route
						exact
						path="/details"
						element={sats && <Details />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
