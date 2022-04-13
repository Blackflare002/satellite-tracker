import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SatsContext from "./SatsContext";
import { DateTime } from "luxon";
import { CommentsBox } from "./Details";

const Comments = () => {
	const { sats } = useContext(SatsContext);
	const [comments, setComments] = useState(null);
	useEffect(() => {
		fetch(`/comments/${sats.id}`)
			.then((res) => res.json())
			.then((info) => setComments(info.data));
	}, []);

	return (
		<CommentsBox>
			{comments &&
				comments.map((el) => {
					let date = el.date;
					let newFormat = { ...DateTime.DATETIME_MED };
					// console.log(DateTime.fromISO(date));
					let date2 = DateTime.fromISO(date);
					// console.log(date2.toLocaleString(newFormat));
					let properDate = date2.toLocaleString(newFormat);
					return (
						<div key={Math.floor(Math.random() * 800813555)}>
							<CommentContainer>
								<UserContainer>
									<div>{el.user}</div>
								</UserContainer>
								<MessageContainer>
									<div>{el.message}</div>
								</MessageContainer>
								<DateContainer>
									{/* {console.log("DATE: ", date)} */}
									{/* {console.log("EL.DATE: ", el.date)} */}
									<div>{properDate}</div>
								</DateContainer>
							</CommentContainer>
						</div>
					);
				})}
		</CommentsBox>
	);
};

const DateContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	/* position: relative; */
	/* top: 20px; */
	padding-top: 10px;
	color: var(--trulyDarkGrey);
	font-size: small;
`;

const MessageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 15px;
	padding-bottom: 15px;
`;

const UserContainer = styled.div`
	border: solid 2px orange;
	width: fit-content;
	padding: 5px;
	border-radius: 20px;
`;

const CommentContainer = styled.div`
	min-height: fit-content;
	max-height: 100px;
	width: 400px;
	background-color: grey;
	border-radius: 10px;
	padding: 10px;
`;

export default Comments;
