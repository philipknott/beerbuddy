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

}
