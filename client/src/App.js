import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/details" element={<Details />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
