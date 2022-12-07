import axios from 'axios';
import { BeerParams } from '../types';
import Beer from './Beer';
import BeerBuilder from './Builder/BeerBuilder';

/* Singleton */
export default class DB {
	private static _instance: DB = new DB(); // Eager
	private _allBeers?: Beer[]; // Lazy

	private constructor() {
		this.populateAllBeers();
	}

	static get instance(): DB {
		return this._instance;
	}

	async getAllBeers(): Promise<Beer[]> {
		if (!this._allBeers) {
			await this.populateAllBeers();
		}
		return this._allBeers!;
	}

	async populateAllBeers() {
		try {
			const resp = await axios.get('http://localhost:3001/allBeer');
			const builder = new BeerBuilder();

			this._allBeers = resp.data.map((params: BeerParams) => {
				const { beername, breweryname, beerstyle, abv, ibu, img } = params;
				return builder
					.reset(beername, breweryname)
					.setStyle(beerstyle)
					.setABV(abv)
					.setIBU(ibu)
					.setImageURL(img)
					.getResult();
			});
		} catch (err) {
			console.error(err);
			this._allBeers = [];
		}
	}

	/**
	 * Adds new beer to local cache and backend, separately.
	 * @param beer Beer to add
	 */
	async addBeer(beer: Beer) {
		// Add to cache
		if (!this._allBeers) {
			await this.populateAllBeers();
		}
		this._allBeers!.push(beer);

		// Add to backend
		const beerParams = this.convertToBeerParams(beer);
		this.putOneBeer(beerParams);
	}

	/**
	 * Asynchronously adds beer to backend
	 * @param beerParams Beer parameters
	 */
	private async putOneBeer(beerParams: BeerParams) {
		console.log('putonebeer called');
		console.log(beerParams);
		axios
			.post('http://localhost:3001/create-beer', beerParams)
			.then((res) => {
				console.log('res:');
				console.log(res);
				return res;
			})
			.catch((err) => console.error(err));
	}

	private convertToBeerParams(beer: Beer): BeerParams {
		return {
			beername: beer.name,
			breweryname: beer.brewery,
			beerstyle: beer.style,
			ibu: beer.ibu,
			abv: beer.abv,
			img: beer.imageURL,
		};
	}

	async getBeerById(id: string): Promise<Beer | undefined> {
		if (!this._allBeers) {
			await this.populateAllBeers();
		}
		return this._allBeers!.find((beer) => beer.id == id);
	}

	async getBeerResults(searchTerm: string): Promise<Beer[]> {
		searchTerm = searchTerm.toLowerCase();

		if (!this._allBeers) {
			this.populateAllBeers();
		}

		return this._allBeers!.filter((beer) => {
			const name = beer.name.toLowerCase();
			const brewery = beer.brewery.toLowerCase();
			return name.includes(searchTerm) || brewery.includes(searchTerm);
		});
	}
}
