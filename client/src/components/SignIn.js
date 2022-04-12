import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
	const [user, setUser] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	const handleChange = (value) => {
		setUser(value);
		console.log("VALUE: ", value);
	};

	let navigate = useNavigate();

	const handleSubmit = (ev) => {
		ev.preventDefault();
		fetch("/sign-in", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ user }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("SIGNIN DATA: ", data);
				if (data.status === 201) {
					setUser(data.name);
					console.log("user: ", user);
					setLoggedIn(true);
					sessionStorage.setItem("user", JSON.stringify(user));
					navigate("/", { replace: true });
				} else {
					console.log("error");
					// setError(true);
				}
			});
	};

	if (loggedIn) {
		navigate("/", { replace: true });
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username: </label>
				<input
					placeholder="Write your username!"
					id="username"
					onChange={(ev) => handleChange(ev.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};
