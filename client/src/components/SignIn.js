import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "./UserInfoContext";
import styled, { keyframes } from "styled-components";
import { FaSatellite } from "react-icons/fa";
import { StyledInput } from "./Search";

export const SignIn = () => {
	const [user, setUser] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState(false);

	const { userInfo, setUserInfo } = useContext(UserInfoContext);

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
					setUserInfo(user);
					navigate("/", { replace: true });
				} else {
					console.log("error");
					setError(true);
				}
			});
	};

	if (loggedIn) {
		navigate("/", { replace: true });
	}

	return (
		<TopLevel>
			<SatelliteDiv>
				<StyledFaSatellite />
			</SatelliteDiv>
			<OuterBox>
				<form onSubmit={handleSubmit}>
					<InnerBox>
						<UserBox>
							<label htmlFor="username">Username: </label>
							<StyledInput
								placeholder="Write your username!"
								id="username"
								onChange={(ev) => handleChange(ev.target.value)}
							/>
						</UserBox>
						<StyledButtonSP type="submit">Submit</StyledButtonSP>
						{error && (
							<ErrorMessage>
								That usename does not exist, please try again.
							</ErrorMessage>
						)}
					</InnerBox>
				</form>
			</OuterBox>
		</TopLevel>
	);
};

export const TrueStyledButton = styled.button`
	background-color: var(--trulyDarkGrey);
	color: white;
	font-weight: bold;
	border: solid 2px orange;
	border-radius: 20px;
	padding: 10px;
	:hover {
		background-color: navy;
	}
`;

const StyledButtonSP = styled(TrueStyledButton)`
	margin-top: 20px;
`;

const ErrorMessage = styled.div`
	padding-top: 20px;
	color: red;
`;

const TopLevel = styled.div`
	/* overflow: hidden; */
`;

const rotation = keyframes`
from {
	transform: rotate(0deg)
}
to {
	transform: rotate(360deg)
}
`;
const translate = keyframes`
from {
	transform: translate(5px);
}
to {
	transform: translate(96vw);
}
`;

const SatelliteDiv = styled.p`
	animation: ${translate} 12s linear alternate infinite;
	width: fit-content;
	position: relative;
	top: 50px;
	padding: 0;
	margin: 0;
`;

const StyledFaSatellite = styled(FaSatellite)`
	font-size: 50px;
	animation: ${rotation} 4s linear normal infinite;
`;

const UserBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const OuterBox = styled.div`
	border: solid 2px var(--offwhite);
	width: fit-content;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	top: 150px;
`;

const InnerBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 40px;
`;
