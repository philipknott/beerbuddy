import Beer from '../Beer';
import Brewery from '../Brewery';
import IBuilder from './Builder';

interface IBreweryBuilder extends IBuilder {
	reset(name: string): BreweryBuilder;
	setLocation(location: string): BreweryBuilder;
	setImageURL(url: string): BreweryBuilder;
	setBeers(beers: Beer[]): BreweryBuilder;
	getResult(): Brewery;
}

export default class BreweryBuilder implements IBreweryBuilder {
	private _brewery?: Brewery;

	constructor() {}

	reset(name: string): BreweryBuilder {
		this._brewery = new Brewery(name);
		return this;
	}

	setLocation(location: string): BreweryBuilder {
		this._brewery!.location = location;
		return this;
	}

	setImageURL(url: string): BreweryBuilder {
		this._brewery!.imageURL = url;
		return this;
	}

	setBeers(beers: Beer[]): BreweryBuilder {
		this._brewery!.beers = beers;
		return this;
	}

	getResult(): Brewery {
		if (!this._brewery) {
			throw Error('BreweryBuilder not reset with brewery name');
		}
		return this._brewery;
	}
}
