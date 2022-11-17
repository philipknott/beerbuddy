import { BeerCharacteristic, BeerStyle } from '../types';

import Brewery from './Brewery';
import Review from './Review';
import { v4 as uuidv4 } from 'uuid';

export default class Beer {
	private _id: string = uuidv4();
	private _name: string;

	// Optional parameters
	private _brewery?: Brewery;
	private _style?: BeerStyle;
	private _abv?: number;
	private _ibu?: number;
	private _imageURL?: string;
	private _averageRating?: number;
	private _reviews: Review[] = [];
	private _averageCharacteristics: BeerCharacteristic[] = []; // this will eventually use decorator

	constructor(name: string) {
		this._name = name;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	set brewery(brewery: Brewery | undefined) {
		this._brewery = brewery;
		this._brewery?.addBeer(this);
	}

	get brewery(): Brewery | undefined {
		return this._brewery;
	}

	set style(style: BeerStyle | undefined) {
		this._style = style;
	}

	get style(): BeerStyle | undefined {
		return this._style;
	}

	set abv(abv: number | undefined) {
		this._abv = abv;
	}

	get abv(): number | undefined {
		return this._abv;
	}

	set ibu(ibu: number | undefined) {
		this._ibu = ibu;
	}

	get ibu(): number | undefined {
		return this._ibu;
	}

	set imageURL(imageURL: string | undefined) {
		this._imageURL = imageURL;
	}

	get imageURL(): string | undefined {
		return this._imageURL;
	}

	get averageCharacteristics(): BeerCharacteristic[] {
		return this._averageCharacteristics;
	}

	// TODO: implement reviews to calculate this value
	get averageRating(): number | undefined {
		return 7;

		if (!this._averageRating) {
			// calculate average rating
			this._averageRating = this.calculateAverageRating();
		}
		// return this._averageRating;
		return this._averageRating;
	}

	// TODO: implement decorator to get these characteristics
	gatherAverageCharacteristics(): BeerCharacteristic[] {
		return [
			BeerCharacteristic.SWEET,
			BeerCharacteristic.FRUITY,
			BeerCharacteristic.BUTTERY,
		];
	}

	/**
	 * Returns the average rating of the beer across all ratings.
	 * Should only be called once (lazy instantiation).
	 * @returns Average rating, or undefined if not reviews
	 */
	calculateAverageRating(): number | undefined {
		if (this._reviews.length == 0) {
			return undefined;
		}
		let ratingSum = 0;
		this._reviews.forEach((r) => (ratingSum += r.rating));
		return ratingSum / this._reviews.length;
	}
}
