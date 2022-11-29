import Brewery from '../Brewery';
import IBuilder from './Builder';

interface IBreweryBuilder extends IBuilder {
	reset(name: string): BreweryBuilder;
	setLocation(location: string): BreweryBuilder;
	setImageURL(url: string): BreweryBuilder;
	getResult(): Brewery;
}

export default class BreweryBuilder implements IBreweryBuilder {
	private _brewery?: Brewery;

	constructor() {}

	reset(name: string): BreweryBuilder {
		this._brewery = new Brewery(name);
		return this;
	}

	setLocation(location: string | undefined): BreweryBuilder {
		if (location) {
			this._brewery!.location = location;
		}
		return this;
	}

	setImageURL(url: string | undefined): BreweryBuilder {
		if (url) {
			this._brewery!.imageURL = url;
		}
		return this;
	}

	getResult(): Brewery {
		if (!this._brewery) {
			throw Error('BreweryBuilder not reset with brewery name');
		}
		return this._brewery;
	}
}
