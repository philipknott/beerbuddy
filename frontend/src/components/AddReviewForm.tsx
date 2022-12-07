import React, { useEffect, useState } from 'react';
import Beer from '../classes/Beer';
import BeerBuilder from '../classes/Builder/BeerBuilder';
import DB from '../classes/DB';
import { SelectInput, SubmitButton, TextInput } from '../lib/FormComponents';
import { BEER_STYLES } from '../types';

const NEW_BREWERY_STR = '[New Brewery]';

interface AddReviewFormProps {
	onSubmit: (review:string) => void;
}


export default function AddReviewForm(props: AddReviewFormProps) {

    props.onSubmit("hello");
    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const reviewInfo = {
            beerName: input.beerName,
			rating: input.rating,
			review: input.review
		}
		//db.addReview(reviewInfo);
    }

    return (
        <div>
			<p className="title is-1">Add Beer</p>
			<div className="form">
				<TextInput
					label="Rating(Out of 10)"
					name="Rating"
					onChange={onInputChange}
					isRequired
				/>

				<SelectInput
					label="Style"
					name="style"
					options={['1','2','3','4','5','6','7','8','9','10']}
					onChange={onInputChange}
				/>

				<SelectInput
					label="Brewery"
					options={[...allBreweries, NEW_BREWERY_STR]}
					name="brewery"
					onChange={onInputChange}
					isRequired
				/>

				<SubmitButton onClick={onSubmit} disabled={!inputsAreValid}>
					Submit Review
				</SubmitButton>
			</div>
		</div>
    );
}
