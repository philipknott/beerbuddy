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

	async getAllBreweries(): Promise<string[]> {
		if (!this._allBeers) {
			await this.populateAllBeers();
		}

		const breweries = this._allBeers!.map((beer) => beer.brewery);
		const uniqueBreweries = Array.from(new Set(breweries));
		return uniqueBreweries;
	}

	private async populateAllBeers() {
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
		if (!this._allBeers) {
			await this.populateAllBeers();
		}

		// Add to client cache
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
		axios
			.post('http://localhost:3001/create-beer', beerParams)
			.catch((err) => console.error(err));
	}

	async removeBeer(beer: Beer) {
		if (!this._allBeers) {
			await this.populateAllBeers();
		}

		// Remove from client cache
		this._allBeers!.splice(
			this._allBeers!.findIndex((e) => e == beer),
			1
		);

		console.log('updated beers: ');
		console.log(this._allBeers);

		// Remove from backend
		const { name, brewery } = beer;
		this.deleteBeer(name, brewery);
	}

	/**
	 * Asynchronously removes beer from backend, based on name and brewery
	 * @param name
	 * @param brewery
	 */
	private async deleteBeer(name: string, brewery: string) {
		axios
			.post('http://localhost:3001/delete-beer', {
				name,
				brewery,
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

	async getBeer(name: string, brewery: string) {
		if (!this._allBeers) {
			this.populateAllBeers();
		}
		return this._allBeers?.find(
			(beer) => beer.name === name && beer.brewery === brewery
		);
	}
}
