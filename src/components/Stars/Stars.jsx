import React from 'react';
import { AiFillStar as FillStar, AiOutlineStar as EmptyStar } from 'react-icons/ai';
import './Stars.scss'

const Stars = ({ value }) => {
 	
    const fill = value
    const empty = 5 - value

	return (
		<ul className="stars">
			{[...Array(fill)].map((item, i) => (
				<li key={i}>
					<FillStar className="fill-star" />
				</li>
			))}
			{[...Array(empty)].map((item, i) => (
				<li key={i}>
					<EmptyStar className="empty-star" />
				</li>
			))}
		</ul>
	);
};

export default Stars;
