import React, { useEffect, useState } from 'react';
import Beer from '../classes/Beer';
import BeerBuilder from '../classes/Builder/BeerBuilder';
import DB from '../classes/DB';
import { SelectInput, SubmitButton, TextInput } from '../lib/FormComponents';
import { BEER_STYLES } from '../types';

const NEW_BREWERY_STR = '[New Brewery]';

interface AddBeerFormProps {
	onSubmit: (newBeer: Beer) => void;
}

interface NewBeerInputParams {
	name: string;
	brewery: string;
	newBrewery: string;
	style?: string;
	ibu?: number;
	abv?: number;
	rating?: number;
	imgURL?: string;
}

export default function AddBeerForm(props: AddBeerFormProps) {
	const [input, setInput] = useState<NewBeerInputParams>({
		name: '',
		brewery: '',
		newBrewery: '',
	});

	const [allBreweries, setAllBreweries] = useState<string[]>([]);
	useEffect(() => {
		DB.instance.getAllBreweries().then((result) => setAllBreweries(result));
	}, []);

	const [addingNewBrewery, setAddingNewBrewery] = useState<boolean>(false);
	const [inputsAreValid, setInputsAreValid] = useState<boolean>(false);

	useEffect(() => {
		setInputsAreValid(checkInputsAreValid);
	});

	const onInputChange = (
		event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		let { name, value } = event.target;

		// check if brewery select option is set to '[New Brewery]'
		if (name == 'brewery') {
			setAddingNewBrewery(value == NEW_BREWERY_STR);
		}

		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const checkInputsAreValid = (): boolean => {
		if (input.name == '') {
			return false;
		} else if (!addingNewBrewery && input.brewery == '') {
			return false;
		} else if (addingNewBrewery && input.newBrewery == '') {
			return false;
		}
		return true;
	};

	const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		// Create new beer from input
		const newBeer = new BeerBuilder()
			.reset(input.name, addingNewBrewery ? input.newBrewery : input.brewery)
			.setStyle(input.style)
			.setABV(input.abv)
			.setIBU(input.ibu)
			.setRating(input.rating)
			.setImageURL(input.imgURL)
			.getResult();

		props.onSubmit(newBeer);
	};

	return (
		<div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<TextInput
					label="Name of Beer"
					name="name"
					onChange={onInputChange}
					isRequired
				/>

				<SelectInput
					label="Style"
					name="style"
					options={BEER_STYLES}
					onChange={onInputChange}
				/>

				<SelectInput
					label="Brewery"
					options={[...allBreweries, NEW_BREWERY_STR]}
					name="brewery"
					onChange={onInputChange}
					isRequired
				/>

				{addingNewBrewery && (
					<div className="notification is-light">
						<TextInput
							label="New Brewery Name"
							onChange={onInputChange}
							name="newBrewery"
							isRequired
						/>
					</div>
				)}

				<div className="columns">
					<div className="column">
						<TextInput
							type="number"
							label="IBU"
							name="ibu"
							onChange={onInputChange}
						/>
					</div>
					<div className="column">
						<TextInput
							type="number"
							label="ABV"
							name="abv"
							onChange={onInputChange}
						/>
					</div>
				</div>

				<div className="columns">
					<div className="column">
						<TextInput
							type="number"
							label="Rating"
							name="rating"
							onChange={onInputChange}
						/>
					</div>
					<div className="column">
						<TextInput
							label="Image URL"
							name="imgURL"
							onChange={onInputChange}
						/>
					</div>
				</div>

				<SubmitButton onClick={onSubmit} disabled={!inputsAreValid}>
					Add Beer
				</SubmitButton>
			</div>
		</div>
	);
}
