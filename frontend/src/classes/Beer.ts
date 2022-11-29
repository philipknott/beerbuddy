import { v4 as uuidv4 } from 'uuid';
import { BeerCharacteristic } from '../types';
import Review from './Review';

export default class Beer {
	private _id: string = uuidv4();
	private _name: string;
	private _breweryID: string;

	// Optional parameters
	private _style?: string;
	private _abv?: number;
	private _ibu?: number;
	private _imageURL?: string;
	private _averageRating?: number;
	private _reviews: Review[] = [];
	private _averageCharacteristics: BeerCharacteristic[] = []; // this will eventually use decorator

	constructor(name: string, breweryID: string) {
		this._name = name;
		this._breweryID = breweryID;
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get breweryID(): string {
		return this._breweryID;
	}

	set style(style: string | undefined) {
		this._style = style;
	}

	get style(): string | undefined {
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
