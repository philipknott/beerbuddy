import Beer from '../Beer';
import BeerBuilder from '../Builder/BeerBuilder';
import { BeerCharacteristic, BeerParams } from '../../types';

export default class backendAdapter{
    public request(response: Beer): BeerParams{
        return {
			beername: response.name,
			breweryname: response.brewery,
			beerstyle: response.style,
			ibu: response.ibu,
			abv: response.abv,
			img: response.imageURL,
            rating: response.rating
		};
    }
}