import testData from '../public/testdata';
import Beer from './Beer';
import axios from "axios";
import BeerBuilder from './Builder/BeerBuilder';

/* Singleton */
export default class DB {
	private static _instance?: DB; // lazy initialization
	private _allBeers: Beer[] = this.fetchAllBeers();

	private constructor() {}

	static get instance(): DB {
		if (!this._instance) {
			this._instance = new DB();
		}
		return this._instance;
	}

	get allBeers(): Beer[] {
		console.log("allbeers",this._allBeers)
		return this._allBeers;
	}

	private fetchAllBeers(): Beer[] {
		axios
  			.get("http://localhost:3001/allBeer")
  			.then(function (response) {
    			console.log(response.data);
				var tempBeers:Beer[] = [];
				const beerBuilder = new BeerBuilder();
				for (let i = 0; i < response.data.length; i++) {
					const beer1 = beerBuilder
						.reset(response.data[i].beername, response.data[i].breweryname)
						.setStyle(response.data[i].beerstyle)
						.setABV(response.data[i].abv)
						.setIBU(response.data[i].ibu)
						.setImageURL(response.data[i].img)
						.getResult();
					tempBeers.push(beer1);
				}
				return tempBeers;
  			});
		return [];
	}

	private putOneBeer(beerInfo: any) {
		axios
		    .post('http://localhost:3001/create-beer', beerInfo)
  			.then(function (response) {
				return response;
  			});
	}

	addBeer(beerInfo:any){
		this.putOneBeer(beerInfo);
	}

	async printAllBeers(): Promise<any>{
		var resp = await this.fetchAllBeers();
		//console.log(resp);
		return resp;
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
			//const breweryName = beer.brewery?.name.toLowerCase();
			//return beerName.includes(searchTerm) || breweryName?.includes(searchTerm);
		});
	}
}