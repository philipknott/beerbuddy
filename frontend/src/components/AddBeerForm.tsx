import React, { useEffect, useState } from 'react';
import { BeerStyle, NewBeerParams, NewBreweryParams } from '../types';
import DB from '../classes/DB';
import { SelectInput, SubmitButton, TextInput } from '../lib/FormComponents';

const NEW_BREWERY_STR = '[New Brewery]';

interface AddBeerFormProps {
	onSubmit: (
		newBeerParams: NewBeerParams,
		newBreweryParams?: NewBreweryParams
	) => void;
}

export default function AddBeerForm(props: AddBeerFormProps) {
	const db = DB.instance;

	const [beerInput, setBeerInput] = useState<NewBeerParams>({
		name: '',
		style: '',
		breweryID: '',
		ibu: 0,
		abv: 0,
		imgURL: '',
	});

	const [breweryInput, setBreweryInput] = useState<NewBreweryParams>({
		name: '',
		location: '',
		imgURL: '',
	});

	const [addingNewBrewery, setAddingNewBrewery] = useState<boolean>(false);
	const [inputsAreValid, setInputsAreValid] = useState<boolean>(false);

	useEffect(() => {
		setInputsAreValid(checkinputsAreValid);
	});

	function onBeerInputChange(
		event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) {
		const { name, value } = event.target;
		setBeerInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	}

	function onBreweryInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setBreweryInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	}

	function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		props.onSubmit(beerInput, addingNewBrewery ? breweryInput : undefined);
	}

	// async function onSubmit(event: React.MouseEvent<HTMLElement>) {
	// 	event.preventDefault();
	// 	const beerInfo = {
	// 		beerName: beerInput.beerName,
	// 		style: beerInput.style,
	// 		brewery: beerInput.brewery,
	// 		ibu: beerInput.ibu,
	// 		abv: beerInput.abv,
	// 		imgURL: beerInput.imgURL,
	// 	};

	// 	db.addBeer(beerInfo);
	// 	db.printAllBeers();
	// }

	function checkinputsAreValid(): boolean {
		if (beerInput.name == '') {
			return false;
		} else if (beerInput.breweryID == '') {
			return false;
		} else if (addingNewBrewery && breweryInput.name == '') {
			return false;
		}
		return true;
	}

	return (
		<div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<TextInput
					label="Name of Beer"
					name="name"
					onChange={onBeerInputChange}
					isRequired
				/>

				<SelectInput
					label="Style"
					name="style"
					options={Object.values(BeerStyle).map((value) => ({
						value,
						label: value,
					}))}
					onChange={onBeerInputChange}
				/>

				<SelectInput
					label="Brewery"
					options={[{ label: NEW_BREWERY_STR, value: undefined }]}
					name="breweryID"
					onChange={(e) => {
						setAddingNewBrewery(e.target.value == NEW_BREWERY_STR);
						onBeerInputChange(e);
					}}
					isRequired
				/>

				{addingNewBrewery && (
					<div className="notification is-light">
						<div className="columns">
							<div className="column">
								<TextInput
									label="Brewery Name"
									name="name"
									onChange={onBreweryInputChange}
									isRequired
								/>
							</div>
							<div className="column">
								<TextInput
									label="Brewery Location"
									name="location"
									onChange={onBreweryInputChange}
								/>
							</div>
						</div>
						<TextInput
							label="Brewery Image URL"
							name="imgURL"
							onChange={onBreweryInputChange}
						/>
					</div>
				)}

				<div className="columns">
					<div className="column">
						<TextInput
							type="number"
							label="IBU"
							name="ibu"
							onChange={onBeerInputChange}
						/>
					</div>
					<div className="column">
						<TextInput
							type="number"
							label="ABV"
							name="abv"
							onChange={onBeerInputChange}
						/>
					</div>
				</div>

				<TextInput
					label="Image URL"
					onChange={onBeerInputChange}
					name="imgURL"
				/>

				<SubmitButton onClick={onSubmit} disabled={!inputsAreValid}>
					Add Beer
				</SubmitButton>
			</div>
		</div>
	);
}
