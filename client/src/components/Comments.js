//fetch comments from db, get comments in server
//findAll, query sat = sat.id
//or, findAll and filter based on sat id

import { useContext, useEffect, useState } from "react";
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
						<>
							<div>{el.user}</div>
							<div>{el.message}</div>
						</>
					);
				})}
		</>
	);
};

export default Comments;
