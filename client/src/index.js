import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SatsContextProvider } from "./components/SatsContext";
import { UserInfoProvider } from "./components/UserInfoContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
	<SatsContextProvider>
		<UserInfoProvider>
			<App />
		</UserInfoProvider>
	</SatsContextProvider>
);
