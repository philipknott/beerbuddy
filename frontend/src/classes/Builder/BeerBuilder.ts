import { BeerStyle } from '../../types';
import Beer from '../Beer';
import Brewery from '../Brewery';
import IBuilder from './Builder';

interface IBeerBuilder extends IBuilder {
	reset(name: string): BeerBuilder;
	setBrewery(brewery: Brewery): BeerBuilder;
	setStyle(style: BeerStyle): BeerBuilder;
	setABV(abv: number): BeerBuilder;
	setIBU(ibu: number): BeerBuilder;
	setImageURL(url: string): BeerBuilder;
	getResult(): Beer;
}

export default class BeerBuilder implements IBeerBuilder {
	private _beer?: Beer;

	constructor() {}

	reset(name: string): BeerBuilder {
		this._beer = new Beer(name);
		return this;
	}

	setBrewery(brewery: Brewery): BeerBuilder {
		this._beer!.brewery = brewery;
		return this;
	}

	setStyle(style: BeerStyle): BeerBuilder {
		this._beer!.style = style;
		return this;
	}

	setABV(abv: number): BeerBuilder {
		this._beer!.abv = abv;
		return this;
	}

	setIBU(ibu: number): BeerBuilder {
		this._beer!.ibu = ibu;
		return this;
	}

	setImageURL(url: string): BeerBuilder {
		this._beer!.imageURL = url;
		return this;
	}

	getResult(): Beer {
		if (!this._beer) {
			throw Error('BeerBuilder not reset with beer name');
		}
		return this._beer;
	}
}
