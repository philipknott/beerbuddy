//import DB from '../classes/DB';
import { BeerStyle } from '../types';
import React, {useState} from 'react';
import DB from '../classes/DB';

const db = DB.instance;

export function AddBeerForm() {
	const [input, setInput] = useState({
		beerName: '',
		style: '',
		brewery: '',
		ibu: 0,
		abv: 0,
		imgURL: ''
	})

	function fillForm(event: { target: { name: any; value: any; }; }) {
		const {name, value} = event.target;

		setInput(prevInput => {
			return{
				...prevInput,
				[name]: value
			}
		})
	}

	function clickButton(event: { preventDefault: () => void; }){
		event.preventDefault();
		console.log(input);
		const beerInfo = {
			beerName: input.beerName,
			style: input.style,
			brewery: input.brewery,
			ibu: input.ibu,
			abv: input.abv,
			imgURL: input.imgURL
		}

		db.addBeer(beerInfo);
		db.printAllBeers();
	}

	return(
		<div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<div className="field">
					<label className="label">Name of Beer</label>
					<input onChange={fillForm} name="beerName" className="input"></input>
				</div>
			</div>
			<div className="field">
				<label className="label">Style</label>
				<div className="select">
					<select onChange={fillForm} name="style">
						<option></option>
						{Object.values(BeerStyle).map((style) => (
							<option key={style}>{style}</option>
						))}
					</select>
				</div>
			</div>
			<div className="field">
				<label className="label">Name of Brewery</label>
				<input onChange={fillForm} name="brewery" className="input"></input>
			</div>
			<div className="columns">
				<div className="column">
					<div className="field">
						<label className="label">IBU</label>
						<input onChange={fillForm} name="ibu" className="input" type="number" />
					</div>
				</div>
				<div className="column">
					<div className="field">
						<label className="label">ABV</label>
						<input onChange={fillForm} name="abv" className="input" type="number" />
					</div>
				</div>
			</div>
			<div className="field">
				<label className="label">Image URL</label>
				<input onChange={fillForm} name="imgURL" className="input" type="text" />
			</div>
			<div className="field">
				<button onClick={clickButton} className="button is-large is-info is-pulled-right">
					Add Beer
				</button>
			</div>
		</div>
	)
}
