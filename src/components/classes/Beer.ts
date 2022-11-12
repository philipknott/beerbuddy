import { BeerStyle } from '../../types';

import Brewery from './Brewery';
import Review from './Review';

export default class Beer {
	private _name: string;
	private _brewery: Brewery;
	private _style?: BeerStyle;
	private _abv?: number;
	private _ibu?: number;
	private _imageURL?: string;
	private _averageRating?: number; // lazy init

	private _reviews: Review[] = [];

	constructor(name: string, brewery: Brewery) {
		this._name = name;
		this._brewery = brewery;
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

	get averageRating(): number | undefined {
		return 7;

		if (!this._averageRating) {
			// calculate average rating
			this._averageRating = this.calculateAverageRating();
		}
		// return this._averageRating;
		return this._averageRating;
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
