import { BeerCharacteristic, BeerStyle } from '../types';

import Brewery from './Brewery';
import Review from './Review';
import { v4 as uuidv4 } from 'uuid';

export default class Beer {
	private _id: string;
	private _name: string;
	private _brewery: Brewery;
	private _style?: BeerStyle;
	private _abv?: number;
	private _ibu?: number;
	private _imageURL?: string;
	private _averageRating?: number;
	private _reviews: Review[] = [];
	private _averageCharacteristics: BeerCharacteristic[] = [];

	constructor(name: string, brewery: Brewery) {
		this._id = uuidv4();
		this._name = name;
		this._brewery = brewery;
		this._style = BeerStyle.INDIA_PALE_ALE;

		this._averageRating = this.calculateAverageRating();
		this._averageCharacteristics = this.gatherAverageCharacteristics();

		this._ibu = 5;
		this._abv = 5;
		this._imageURL =
			'https://www.americanolivermore.com/uploads/1/3/2/2/132257054/s141702492982091317_p69_i2_w888.jpeg';
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get brewery(): Brewery {
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

	get averageRating(): number | undefined {
		return 7;

		if (!this._averageRating) {
			// calculate average rating
			this._averageRating = this.calculateAverageRating();
		}
		// return this._averageRating;
		return this._averageRating;
	}

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
