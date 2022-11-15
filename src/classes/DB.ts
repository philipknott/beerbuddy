import Beer from './Beer';
import Brewery from './Brewery';

/* Singleton */
export default class DB {
	private static _instance?: DB; // lazy initialization
	private _allBreweries: Brewery[];
	private _allBeers: Beer[];

	private constructor() {
		// Initialize breweries
		this._allBreweries = [
			new Brewery('Alpha'),
			new Brewery('Beta'),
			new Brewery('Charlie'),
		];

		// Initialize beers
		this._allBeers = [
			new Beer('Delta', this.getBreweryByName('Alpha')),
			new Beer('Epsilon', this.getBreweryByName('Beta')),
			new Beer('Gamma', this.getBreweryByName('Charlie')),
		];
	}

	static get instance(): DB {
		if (!this._instance) {
			this._instance = new DB();
		}
		return this._instance;
	}

	get allBreweries(): Brewery[] {
		return this._allBreweries;
	}

	get allBeers(): Beer[] {
		return this._allBeers;
	}

	private fetchBreweries() {}

	getBreweryByName(name: string): Brewery {
		name = name.toLowerCase();
		const brewery = this._allBreweries.find((brewery) => {
			const breweryName = brewery.name.toLowerCase();
			return name == breweryName;
		});
		if (!brewery) throw Error(`Brewery '${name}' not found.`);
		return brewery;
	}

	getBeerById(id: string | null): Beer | null {
		return this._allBeers.find((beer) => beer.id == id) ?? null;
	}

	/**
	 * Returns a list of beers that match with the given search parameter. Used when searching for beers.
	 * @param searchTerm Search parameter
	 * @returns List of beers that include the search term (appears in beer name or brewery name)
	 */
	getBeerResults(searchTerm: string): Beer[] {
		searchTerm = searchTerm.toLowerCase();
		return this._allBeers.filter((beer) => {
			const beerName = beer.name.toLowerCase();
			const breweryName = beer.brewery.name.toLowerCase();
			return beerName.includes(searchTerm) || breweryName.includes(searchTerm);
		});
	}
}
