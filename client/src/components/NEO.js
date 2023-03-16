import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

let date = DateTime.now().toFormat("yyyy-LL-dd");
// console.log(date);
// let date2 = DateTime.now().minus({ days: 1 }).toFormat("yyyy-LL-dd");
// console.log(date2);

const NEO = () => {
	const [NEO1, setNEO1] = useState(null);
	useEffect(() => {
		fetch(
			`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=3OE9ypvcRwhLh6UD6dbgocinJc5VhXzTCeLgTNT2`
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.near_earth_objects[`${date}`]);
				// console.log(data.near_earth_objects[`${date2}`]);
				setNEO1(
					data.near_earth_objects[`${date}`]
				);
			});
	}, []);
	return (
		<>
			<HeaderBox>
				<p>
					Near Earth Objects spotted today,{" "}
					{DateTime.now().toLocaleString(
						DateTime.DATE_FULL
					)}
					...
				</p>
			</HeaderBox>
			<Container>
				{NEO1 &&
					NEO1.map((el) => {
						let neoName = el.name;
						let neoID = el.neo_reference_id;
						let hazard =
							el.is_potentially_hazardous_asteroid;
						let speedKPH =
							el.close_approach_data[0]
								.relative_velocity
								.kilometers_per_hour;
						let missedBy =
							el.close_approach_data[0]
								.miss_distance.kilometers;
						let metersMax =
							el.estimated_diameter.meters
								.estimated_diameter_max;
						let metersMin =
							el.estimated_diameter.meters
								.estimated_diameter_min;
						let feetMax =
							el.estimated_diameter.feet
								.estimated_diameter_max;
						let feetMin =
							el.estimated_diameter.feet
								.estimated_diameter_min;
						//
						// console.log("NAME: ", el.name);
						// console.log("ID: ", el.neo_reference_id);
						// console.log(
						// 	"HAZARD: ",
						// 	el.is_potentially_hazardous_asteroid
						// );
						// console.log(
						// 	"CLOSE: ",
						// 	el.close_approach_data[0].close_approach_date
						// );
						// console.log(
						// 	"SPEED KPH: ",
						// 	el.close_approach_data[0].relative_velocity
						// 		.kilometers_per_hour
						// );
						// console.log(
						// 	"MISSED BY (KM): ",
						// 	el.close_approach_data[0].miss_distance.kilometers
						// );
						// console.log(
						// 	"M, MAX: ",
						// 	el.estimated_diameter.meters.estimated_diameter_max
						// );
						// console.log(
						// 	"M, MIN: ",
						// 	el.estimated_diameter.meters.estimated_diameter_min
						// );
						// console.log(
						// 	"FT, MAX: ",
						// 	el.estimated_diameter.feet.estimated_diameter_max
						// );
						// console.log(
						// 	"FT, MIN: ",
						// 	el.estimated_diameter.feet.estimated_diameter_min
						// );
						//
						return (
							<Wrapper
								key={Math.floor(
									Math.random() * 8008135
								)}
							>
								<InnerWrapper>
									<p>NAME: {neoName}</p>
									<p>
										N.E.O. Reference ID: {neoID}
									</p>
									{hazard ? (
										<Hazardous>
											Potentially Hazardous
											Asteroid:{" "}
											{hazard.toString()}
										</Hazardous>
									) : (
										<p>
											Potentially Hazardous
											Asteroid:{" "}
											{hazard.toString()}
										</p>
									)}
									<p>
										Travelling Speed:{" "}
										{Number(speedKPH).toFixed(2)}{" "}
										kph
									</p>
									<p>
										Missed the Earth by:{" "}
										{Number(missedBy).toFixed(2)}{" "}
										km
									</p>
									<p>
										Estimated Size (meters):{" "}
										{Number(metersMin).toFixed(2)}{" "}
										to{" "}
										{Number(metersMax).toFixed(2)}
									</p>
									<p>
										Estimated Size (feet):{" "}
										{Number(feetMin).toFixed(2)}{" "}
										to{" "}
										{Number(feetMax).toFixed(2)}
									</p>
								</InnerWrapper>
							</Wrapper>
						);
					})}
			</Container>
		</>
	);
};

const Hazardous = styled.p`
	border: solid 3px red;
	padding: 8px;
	margin-top: 2px;
	margin-bottom: 2px;
`;

const HeaderBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 35px;
	margin-bottom: 15px;
`;

const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Wrapper = styled.div`
	border: solid 5px black;
	margin: 15px;
	width: 300px;
	min-height: fit-content;
	max-height: 190px;
	padding: 15px;
`;

export default NEO;
