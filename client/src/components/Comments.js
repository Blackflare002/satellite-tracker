//fetch comments from db, get comments in server
//findAll, query sat = sat.id
//or, findAll and filter based on sat id

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";

const Comments = () => {
	const { sats } = useContext(SatsContext);
	const [comments, setComments] = useState(null);
	useEffect(() => {
		fetch(`/comments/${sats.id}`)
			.then((res) => res.json())
			.then((info) => setComments(info.data));
	}, []);

	return (
		<>
			{comments &&
				comments.map((el) => {
					return (
						<div key={Math.floor(Math.random() * 800813555)}>
							<CommentContainer>
								<UserContainer>
									<div>{el.user}</div>
								</UserContainer>
								<MessageContainer>
									<div>{el.message}</div>
								</MessageContainer>
							</CommentContainer>
						</div>
					);
				})}
		</>
	);
};

const MessageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const UserContainer = styled.div`
	border: solid 2px orange;
	width: fit-content;
	padding: 5px;
	border-radius: 20px;
`;

const CommentContainer = styled.div`
	height: 80px;
	width: 400px;
	background-color: grey;
	border-radius: 10px;
	padding: 10px;
`;

export default Comments;
