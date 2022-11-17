import testData from '../public/testdata';
import Beer from './Beer';
import Brewery from './Brewery';

/* Singleton */
export default class DB {
	private static _instance?: DB; // lazy initialization
	private _allBreweries: Brewery[] = this.fetchAllBreweries();
	private _allBeers: Beer[] = this.fetchAllBeers();

	private constructor() {}

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

	private fetchAllBreweries(): Brewery[] {
		return testData.breweries;
	}

	private fetchAllBeers(): Beer[] {
		return testData.beers;
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

	getBreweryById(id: string | null): Brewery | undefined {
		return this._allBreweries.find((brewery) => brewery.id == id);
	}

	getBeerById(id: string | null): Beer | undefined {
		return this._allBeers.find((beer) => beer.id == id);
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
			const breweryName = beer.brewery?.name.toLowerCase();
			return beerName.includes(searchTerm) || breweryName?.includes(searchTerm);
		});
	}
}
