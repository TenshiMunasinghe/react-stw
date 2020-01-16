import React, {Component} from "react";
import Character from "./Character";

class App extends Component {
	state = {
		isLoading: false,
		characters: []
	};

	componentDidMount = async () => {
		try {
			this.setState({isLoading: true});
			let response = await this.getCharacters();
			let characters = [].concat(...response);
			console.log(characters);

			this.setState({characters, isLoading: false});
		} catch (e) {
			throw new Error("failed to fetch data");
		}
	};

	async getCharacters() {
		let characters = [];
		let response = await fetch(`https://swapi.co/api/people/`);
		let json = await response.json();
		await characters.push(json.results);
		let next = json.next;

		while (next) {
			response = await fetch(next);
			json = await response.json();
			await characters.push(json.results);
			next = json.next;
		}
		return characters;
	}

	render() {
		let {isLoading, characters} = this.state;
		let content;
		if (isLoading) {
			content = <h1>Loading...</h1>;
		} else {
			content = (
				<>
					<h1>star wars characters</h1>
					<ul>
						{characters.map((character, index) => {
							return <Character key={index} character={character} />;
						})}
					</ul>
				</>
			);
		}

		return <div className='flex'>{content}</div>;
	}
}

export default App;
