import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Home from "./components/Home";
import SatsContext from "./components/SatsContext";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import Search from "./components/Search";
// import SearchResults from "./components/SearchResults";
import ResultsPage from "./components/ResultsPage";
import { SignIn } from "./components/SignIn";
import Comments from "./components/Comments";

function App() {
	// allSats, searchResults,
	const { sats, search } = useContext(SatsContext);
	return (
		<>
			<BrowserRouter>
				<GlobalStyles />
				<Main>
					<Header />
					<SearchBox>
						<Search />
					</SearchBox>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/sign-in" element={<SignIn />} />
						<Route
							exact
							path="/details"
							element={
								sats && (
									<>
										<Details />
										<Comments />
									</>
								)
							}
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

const SearchBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 15px;
	position: relative;
	right: 75px;
`;

const Main = styled.div`
	background-color: #2c3233;
	color: var(--offwhite);
	font-family: sans-serif;
	min-height: 100vh;
	height: 100%;
	/* overflow: clip; */
`;

export default App;
