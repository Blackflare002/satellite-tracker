import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "./UserInfoContext";
import styled, { keyframes } from "styled-components";
import { FaSatellite } from "react-icons/fa";

export const SignIn = () => {
	const [user, setUser] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

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
					// setError(true);
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
							<input
								placeholder="Write your username!"
								id="username"
								onChange={(ev) => handleChange(ev.target.value)}
							/>
						</UserBox>
						<StyledButton type="submit">Submit</StyledButton>
					</InnerBox>
				</form>
			</OuterBox>
		</TopLevel>
	);
};

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
`;

const StyledFaSatellite = styled(FaSatellite)`
	font-size: 50px;
	animation: ${rotation} 4s linear normal infinite;
`;

const StyledButton = styled.button`
	margin-top: 30px;
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
