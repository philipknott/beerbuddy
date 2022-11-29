import axios from 'axios';
import BeerBuilder from './Builder/BeerBuilder';
import BreweryBuilder from './Builder/BreweryBuilder';
import Beer from './Beer';
import Brewery from './Brewery';

interface SerializedBeer {
	id: string;
	name: string;
	breweryID: string;
	style?: string;
	imageURL?: string;
	abv?: number;
	ibu?: number;
}

interface SerializedBrewery {
	id: string;
	name: string;
	location?: string;
	imageURL?: string;
}

/* Singleton */
export default class DB {
	private static _instance: DB = new DB(); // eager instantiation
	private _allBreweries: Brewery[] = this.fetchAllBreweries();
	private _allBeers: Beer[] = this.fetchAllBeers();

	private constructor() {}

	static get instance(): DB {
		return this._instance;
	}

	get allBreweries(): Brewery[] {
		return this._allBreweries;
	}

	get allBeers(): Beer[] {
		this._allBeers = this.fetchAllBeers();
		return this._allBeers;
	}

	private fetchAllBreweries(): Brewery[] {
		// TODO
		return [];
	}

	private fetchAllBeers(): Beer[] {
		axios.get('http://localhost:3001/allBeer').then(function (response) {
			return response.data;
		});
		return [];
	}

	private putOneBeer(data: SerializedBeer) {
		axios
			.post('http://localhost:3001/create-beer', data)
			.then(function (response) {
				return response;
			});
	}

	private putOneBrewery(data: SerializedBrewery) {
		// TODO
	}

	addBeer(beer: Beer) {
		const serializedBeer: SerializedBeer = {
			id: beer.id,
			name: beer.name,
			breweryID: beer.id,
			style: beer.style as string,
			imageURL: beer.imageURL,
			abv: beer.abv,
			ibu: beer.ibu,
		};

		this.putOneBeer(serializedBeer);
	}

	addBrewery(brewery: Brewery) {
		const serializedBrewery: SerializedBrewery = {
			id: brewery.id,
			name: brewery.name,
			location: brewery.location,
			imageURL: brewery.imageURL,
		};

		this.putOneBrewery(serializedBrewery);
	}

	async printAllBeers(): Promise<any> {
		var resp = await this.fetchAllBeers();
		//console.log(resp);
		return resp;
	}

	getBreweryByName(name: string): Brewery {
		name = name.toLowerCase();
		const brewery = this._allBreweries.find((brewery) => {
			const breweryName = brewery.name.toLowerCase();
			return name == breweryName;
		});
		if (!brewery) throw Error(`Brewery '${name}' not found.`);
		return brewery;
	}

	getBreweryByID(id: string): Promise<Brewery> {
		// TODO
		return new Promise<Brewery>((res, rej) => {
			res(new BreweryBuilder().reset('test').getResult());
		});
	}

	getBeerById(id: string | null): Promise<Beer> {
		// TODO
		return new Promise<Beer>((res, rej) => {
			res(new BeerBuilder().reset('testBeer', '').getResult());
		});
	}

	/**
	 * Returns a list of beers that match with the given search parameter. Used when searching for beers.
	 * @param searchTerm Search parameter
	 * @returns List of beers that include the search term in beer name
	 * TODO add brewery search
	 */
	getBeerResults(searchTerm: string): Beer[] {
		searchTerm = searchTerm.toLowerCase();
		return this._allBeers.filter((beer) => {
			const beerName = beer.name.toLowerCase();
			return beerName.includes(searchTerm);
		});
	}
}
