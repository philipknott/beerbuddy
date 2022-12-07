import Beer from '../Beer';
import IBuilder from './Builder';

export default class BeerBuilder implements IBuilder {
	private _beer?: Beer;

	constructor() {}

	reset(name: string, breweryID: string): BeerBuilder {
		this._beer = new Beer(name, breweryID);
		return this;
	}

	setStyle(style: string | undefined): BeerBuilder {
		if (style) {
			this._beer!.style = style;
		}
		return this;
	}

	setABV(abv: number | undefined): BeerBuilder {
		if (abv) {
			this._beer!.abv = abv;
		}
		return this;
	}

	setIBU(ibu: number | undefined): BeerBuilder {
		if (ibu) {
			this._beer!.ibu = ibu;
		}
		return this;
	}

	setImageURL(url: string | undefined): BeerBuilder {
		if (url) {
			this._beer!.imageURL = url;
		}
		return this;
	}

	setRating(rating: number | undefined): BeerBuilder {
		if (rating) {
			this._beer!.rating = rating;
		}
		return this;
	}

	getResult(): Beer {
		if (!this._beer) {
			throw Error('BeerBuilder not reset with beer name');
		}
		return this._beer;
	}
}
