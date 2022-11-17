//import DB from '../classes/DB';
import { BeerStyle } from '../types';
import React, {useState} from 'react';
import axios from "axios";

/*export interface AddBeerFormProps {
	onSubmit: () => void;
}

export const AddBeerForm = (props: AddBeerFormProps) => {
	const { onSubmit }: AddBeerFormProps = props;
	const db = DB.instance;

	return (
		<div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<div className="field">
					<label className="label">Name</label>
					<input className="input"></input>
				</div>
				<div className="field">
					<label className="label">Style</label>
					<div className="select">
						<select>
							<option></option>
							{Object.values(BeerStyle).map((style) => (
								<option key={style}>{style}</option>
							))}
						</select>
					</div>
				</div>
				<div className="field">
					<label className="label">Brewery</label>
					<div className="select">
						<select style={{ width: '100%' }}>
							<option></option>
							{db.allBreweries.map((brewery) => (
								<option key={brewery.name}>{brewery.name}</option>
							))}
						</select>
					</div>
				</div>
				<div className="columns">
					<div className="column">
						<div className="field">
							<label className="label">ABV</label>
							<input className="input" type="number" />
						</div>
					</div>
					<div className="column">
						<div className="field">
							<label className="label">ABV</label>
							<input className="input" type="number" />
						</div>
					</div>
				</div>
				<div className="field">
					<label className="label">Image URL</label>
					<input className="input" type="text" />
				</div>
				<div className="field">
					<button className="button is-large is-info is-pulled-right">
						Add Beer
					</button>
				</div>
			</div>
		</div>
	);
};*/

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

		axios.post('http://localhost:3001/create-beer', beerInfo)
	}

	return(
		<div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<div className="field">
					<label className="label">Name</label>
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
				<button onClick={clickButton} className="button is-large is-info is-pulled-right">
					Add Beer
				</button>
			</div>
		</div>
	)
}
