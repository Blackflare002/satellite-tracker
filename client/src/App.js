import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Home from "./components/Home";
import SatsContext from "./components/SatsContext";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import ResultsPage from "./components/ResultsPage";

function App() {
	const { sats, allSats, searchResults, search } = useContext(SatsContext);
	return (
		<>
			<BrowserRouter>
				<GlobalStyles />
				<Main>
					<Header />
					<Search />
					{/* {allSats && <SearchResults />} */}
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route
							exact
							path="/details"
							element={sats && <Details />}
						/>
						<Route
							exact
							path="/results"
							element={search && <ResultsPage />}
						/>
					</Routes>
				</Main>
			</BrowserRouter>
		</>
	);
}

const Main = styled.div`
	background-color: #2c3233;
	color: var(--offwhite);
	font-family: sans-serif;
	height: 100vh;
`;

export default App;
