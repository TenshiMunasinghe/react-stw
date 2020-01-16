import React from "react";

function Character({character}) {
	const {name, height, mass, gender, url} = character;

	return (
		<a className='anime' href={url}>
			<div className='hover'>
				<h3>{name}</h3>
				<p>Gender: {gender}</p>
				<p>Height: {height === "unknown" ? height : `${height}cm`}</p>
				<p>Mass: {mass === "unknown" ? mass : `${mass}kg`}</p>
			</div>
		</a>
	);
}

export default Character;
