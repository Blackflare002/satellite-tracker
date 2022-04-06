import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Home from "./components/Home";
import SatsContext from "./components/SatsContext";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";

function App() {
	const { sats } = useContext(SatsContext);
	return (
		<>
			<BrowserRouter>
				<GlobalStyles />
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

const Main = styled.div`
/* background-color: #0000ff; */
`

export default App;
