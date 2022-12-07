import Beer from '../Beer';
import BeerBuilder from '../Builder/BeerBuilder';
import { BeerParams } from '../../types';

export default class backendAdapter{
    public stripObj(beer: Beer): BeerParams{
        return {
			beername: beer.name,
			breweryname: beer.brewery,
			beerstyle: beer.style,
			ibu: beer.ibu,
			abv: beer.abv,
			img: beer.imageURL,
		};
    }
}